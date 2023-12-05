import styles from "../css/qna.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../hook";
import Loading from "../item/Loading";


function OneQna({ que, anw, anw1 }: { que: string, anw: string, anw1: string }) {
    const [visible, setVisible] = useState<boolean>(true);

    return (
        visible ?
            (<div className={styles.qnaBox}>
                <div>{que}</div>
                <div className={styles.qnaBtn}>
                    <FontAwesomeIcon icon={faCaretDown} onClick={() => setVisible(false)} />
                </div>
            </div >) :

            (<div className={styles.qnaBox2Wrapper}>
                <div className={styles.qnaBox2}>
                    <div>{que}</div>
                    <div className={styles.qnaBtn}><FontAwesomeIcon icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                </div>
                <div className={styles.qnaInforBox}>
                    <div className={styles.qnaInfor}>{anw}</div>
                    <div className={styles.qnaInfor}>{anw1}</div>
                </div>
            </div>)
    )
}

function PatchBox({ comment, patch, setPatch }: { comment: any, patch : boolean, setPatch : any } ) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [secret, setSecret] = useState<boolean>(false);

    
    const Patch = async () => {
        const res = await axios({
            method: "patch",
            url: "http://localhost:8000/question/update",
            data: {
                id: comment?.id,
                title,
                content,
                secret,
            }
        })
        
        if (res.data.result) {
            window.location.reload();
        }
    }

    return (
        <div className={styles.patchBox}>
            <div className={styles.patchTitle}>수정하기</div>
            <textarea className={styles.patchMainName} placeholder="제목" onChange={e => { setTitle(e.target.value) }}>{comment.title}</textarea>
            <textarea className={styles.patchMain} placeholder="문의내용" onChange={e => { setContent(e.target.value) }}>{comment.content}</textarea>
            <div className={styles.patchBtnWrapper}>
                <input className={styles.patchCheck} type="checkbox" onChange={e => { setSecret(e.target.checked) }} />
                <div className={styles.patchSecret}>비밀글</div>
                <button className={styles.patchRegisterBtn} onClick={Patch}>수정</button>
                <button className={styles.patchCancelBtn} onClick={()=>setPatch(false)}>취소</button>
            </div>
        </div>
    )
}

function Inquire({ comment , userData }: { comment: any, userData:any[] | any }) {
    const [visible, setVisible] = useState<boolean>(true);
    const [Answer, setAnswer] = useState<string>("");
    const [openAnswer, setOpenAnswer] = useState<boolean>(false);
    const [patch, setPatch] = useState<boolean>(false);
    const isAdmin = userData.grade === "M";

    const Delete = () => {
        const deleteComment = async () => {
            if (!confirm('댓글을 삭제하시겠습니까?')) {
                return;
            }
            const res = await axios({
                method: "delete",
                url: "http://localhost:8000/question/delete",
                data: {
                    id: comment.id
                }
            })
            if (res.data.result) {
                document.location.reload();
            }
        }
        deleteComment();
    };

    const registerAnswer = async (comment: any) => {

        const res = await axios({
            method: "post",
            url: "http://localhost:8000/question/answer",
            data: {
                question_id: comment.id,
                content: Answer
            }
        })

        if (res.data.result) {
            document.location.reload();
        }
    }

    //자기계정만 비밀글 보기
    const secret = () => {
        if(!comment.secret) {
            setVisible(false);
        } else if(comment.secret) {
            if(comment.user_id === userData.user_id) {
                setVisible(false);
            } else {
                alert("권한이 없습니다.");
            }
        }
        
    }

    return (
        visible ?
            (<div className={styles.inquireBox} onClick={secret}>
                {(comment.answer_status) && <div className={styles.inquireResponse}>답변완료</div>}
                {(comment.answer_status) || <div className={styles.inquireResponse}>답변대기</div>}
                {(comment.secret) || <div className={styles.inquireTitle}>{comment.title}</div>}
                {(comment.secret) && <div className={styles.inquireTitle}>비밀글
                    {(comment.user_id === userData.user_id) && <div className={styles.inquireTitleNickname}>My</div>}
                </div>}
            </div>) :

            (<div className={styles.inquireMainBox}>
                <div className={styles.inquireMainHeader}>
                    <div className={styles.inquireMainTitle}>{comment.title}</div>
                    <div className={styles.inquireMainBtnWrapper}>
                        {(comment.user_id === userData.user_id) && <button className={styles.inquireMainPatch} onClick={() => setPatch(true)}>수정</button>}
                        {(comment.user_id === userData.user_id) && <button className={styles.inquireMainBtnDelete} onClick={Delete}>삭제</button>}
                        <div><FontAwesomeIcon className={styles.inquireMainBtnOff} icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                    </div>
                </div>
                {patch && <PatchBox comment={comment} patch={patch} setPatch={setPatch}/>}

                <div className={styles.inquireMainContent}>{comment.content}</div>
                {(comment.answer_status && openAnswer && !!comment.answer?.content) &&
                    <div className={styles.AnswerBox}>
                        <div className={styles.inquireMainAdiminAnswer}>{comment.answer?.content}</div>
                        <button onClick={() => setOpenAnswer(false)} className={styles.closeAnswerBtn}>닫기</button>
                    </div>}
                {(comment.answer_status && !openAnswer && !!comment.answer.content) &&
                    <button onClick={() => setOpenAnswer(true)} className={styles.openAnswerBtn}>답글보기</button>
                }
                <br />
                {(isAdmin && !comment.answer_status) && <div className={styles.inquireMainAnswerWrapper}>
                    <textarea className={styles.inquireMainAnswer} onChange={e => { setAnswer(e.target.value) }}></textarea>
                    <div className={styles.inquirMainBtnWrapper}>
                        <button className={styles.inquireMainBtn} onClick={() => registerAnswer(comment)}>답글등록</button>
                    </div>
                </div>}
            </div>)
    )
}


export default function QnA() {
    const [comments, setComments] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [secret, setSecret] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userData = useAppSelector((state) => state.signin);

    useEffect(() => {
        const datas = async () => {
            const res = await axios({
                method: "get",
                url: 'http://localhost:8000/question/load',
            })
            setComments(res.data);
        }
        datas();
        setIsLoading(false);
        
    }, []);

    const register = async () => {

        const res = await axios({
            method: "post",
            url: "http://localhost:8000/question/write",
            data: {
                title,
                content,
                secret,
                user_id: userData.user_id
            }
        })
        if (res.data.result) {
            document.location.reload();
        }
    };



    return (
        isLoading ?
            (<div className={styles.qnaContainer}>
                <Loading/>
                <section className={styles.qnaSection}>
                    <div className={styles.qnaWrapper}>
                        <div className={styles.qnaTitle}>QnA</div>
                        <div className={styles.qnaName}>자주 묻는 질문</div>
                        <OneQna que="배송은 언제 오나요?"
                            anw="[배송일정]"
                            anw1="마이페이지에서 배송관련 정보를 볼 수 있습니다.
                            배송은 주문 일 기준으로 하루 뒤 발송시작되며 배송이 시작 된 이후로는 택배사에 문의하셔야 합니다." />
                        <OneQna que="상품을 교환/반품하고 싶어요."
                            anw="[교환/반품 신청 기간]"
                            anw1="교환/취소/반품/교환/환불은 배송 완료 후 7일 이내에 가능합니다.
                            고객님이 받으신 상품의 내용이 표시 광고 및 계약 내용과 다른 경우 상품을 수령하신 날로부터 3개월 이내,
                            그 사실을 안 날(알 수 있었던 날)부터30일 이내에 신청이 가능합니다."/>
                        <OneQna que="교환/반품을 철회하고 싶어요."
                            anw="[교환/반품 철회]"
                            anw1="반품 요청 후 반송 물품을 발송 하기전 상태인 '반품 요청중' 상태라면
                            구매 내역 페이지나 반품 정보 페이지에서 반품 철회가 가능합니다."/>
                        <OneQna que="회원탈퇴는 어떻게 하나요?"
                            anw="회원탈퇴는 로그인한 상태에서 회원님께서 직접 진행해야 합니다."
                            anw1="회원탈퇴는 마이페이지에서 가능하며 탈퇴한 뒤에는 아이디 및 데이터를 복구할 수 없으니 신중히 진행하세요." />
                        <OneQna que="배송 받은 상품이 파손/누락 되었어요."
                            anw="[상품 파손/누락]"
                            anw1="상품이 파손 및 누락되었다면 교환을 통해 상품을 다시 받거나 반품하고 환불을 받으실 수 있습니다." />
                    </div>
                    <div className={styles.inquireWrapper}>
                        <div className={styles.inquireHeaderTitle}>1:1 문의</div>
                        {/* <input placeholder="검색" className={styles.inquireSearch} /> */}
                        {comments.map((comment, index) => {
                            return (
                                <Inquire key={index} comment={comment} userData={userData}/>
                            )
                        })}
                        <div className={styles.answerBox}>
                            <div className={styles.answerTitle}>문의하기</div>
                            <textarea className={styles.answerMainName} placeholder="제목" onChange={e => { setTitle(e.target.value) }}></textarea>
                            <textarea className={styles.answerMain} placeholder="문의내용" onChange={e => { setContent(e.target.value) }}></textarea>
                            <div className={styles.answerBtnWrapper}>
                                <input className={styles.answerCheck} type="checkbox" onChange={e => { setSecret(e.target.checked) }} />
                                <div className={styles.answerSecret}>비밀글</div>
                                <button className={styles.answerRegisterBtn} onClick={register}>등록</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>) :

        (<div className={styles.qnaContainer}>
            <section className={styles.qnaSection}>
                <div className={styles.qnaWrapper}>
                    <div className={styles.qnaTitle}>QnA</div>
                    <div className={styles.qnaName}>자주 묻는 질문</div>
                    <OneQna que="배송은 언제 오나요?"
                        anw="[배송일정]"
                        anw1="마이페이지에서 배송관련 정보를 볼 수 있습니다.
                        배송은 주문 일 기준으로 하루 뒤 발송시작되며 배송이 시작 된 이후로는 택배사에 문의하셔야 합니다." />
                    <OneQna que="상품을 교환/반품하고 싶어요."
                        anw="[교환/반품 신청 기간]"
                        anw1="교환/취소/반품/교환/환불은 배송 완료 후 7일 이내에 가능합니다.
                        고객님이 받으신 상품의 내용이 표시 광고 및 계약 내용과 다른 경우 상품을 수령하신 날로부터 3개월 이내,
                        그 사실을 안 날(알 수 있었던 날)부터30일 이내에 신청이 가능합니다."/>
                    <OneQna que="교환/반품을 철회하고 싶어요."
                        anw="[교환/반품 철회]"
                        anw1="반품 요청 후 반송 물품을 발송 하기전 상태인 '반품 요청중' 상태라면
                        구매 내역 페이지나 반품 정보 페이지에서 반품 철회가 가능합니다."/>
                    <OneQna que="회원탈퇴는 어떻게 하나요?"
                        anw="회원탈퇴는 로그인한 상태에서 회원님께서 직접 진행해야 합니다."
                        anw1="회원탈퇴는 마이페이지에서 가능하며 탈퇴한 뒤에는 아이디 및 데이터를 복구할 수 없으니 신중히 진행하세요." />
                    <OneQna que="배송 받은 상품이 파손/누락 되었어요."
                        anw="[상품 파손/누락]"
                        anw1="상품이 파손 및 누락되었다면 교환을 통해 상품을 다시 받거나 반품하고 환불을 받으실 수 있습니다." />
                </div>
                <div className={styles.inquireWrapper}>
                    <div className={styles.inquireHeaderTitle}>1:1 문의</div>
                    {comments.map((comment, index) => {
                        return (
                            <Inquire key={index} comment={comment} userData={userData}/>
                        )
                    })}
                    <div className={styles.answerBox}>
                        <div className={styles.answerTitle}>문의하기</div>
                        <textarea className={styles.answerMainName} placeholder="제목" onChange={e => { setTitle(e.target.value) }}></textarea>
                        <textarea className={styles.answerMain} placeholder="문의내용" onChange={e => { setContent(e.target.value) }}></textarea>
                        <div className={styles.answerBtnWrapper}>
                            <input className={styles.answerCheck} type="checkbox" onChange={e => { setSecret(e.target.checked) }} />
                            <div className={styles.answerSecret}>비밀글</div>
                            <button className={styles.answerRegisterBtn} onClick={register}>등록</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>)
    )

}