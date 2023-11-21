import styles from "../css/qna.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


function OneQna({ que, anw }: { que: string, anw: string }) {
    const [visible, setVisible] = useState<boolean>(true);

    return (
        visible ?
            (<div className={styles.qnaBox}>
                <div>{que}</div>
                <div className={styles.qnaBtn}>
                    <FontAwesomeIcon className={styles.starIcon} icon={faCaretDown} onClick={() => setVisible(false)} />
                </div>
            </div >)
            :
            (<div className={styles.qnaBox2Wrapper}>
                <div className={styles.qnaBox2}>
                    <div>{que}</div>
                    <div className={styles.qnaBtn}><FontAwesomeIcon className={styles.starIcon} icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                </div>
                <div className={styles.qnaInfor}>
                    {anw}
                </div>
            </div>)
    )
}

export default function QnA() {


    return (
        <>
            <div className={styles.qnaContainer}>
                <section className={styles.qnaSection}>
                    <div className={styles.qnaWrapper}>
                        <div className={styles.qnaTitle}>QnA</div>
                        <div className={styles.qnaName}>자주 묻는 질문</div>
                        <OneQna que="배송은 언제 오나요?" anw="배송은 주문 일 기준으로 이틀 뒤 발송시작되며 배송이 시작 된 이후로는 택배사에 문의하셔야 합니다." />
                        <OneQna que="상품을 교환/반품하고 싶어요." anw="알아서 하십쇼." />
                        <OneQna que="교환/반품을 철회하고 싶어요." anw="알아서 하십쇼." />
                        <OneQna que="회원탈퇴는 어떻게 하나요?" anw="불가합니다." />
                        <OneQna que="배송 받은 상품이 파손되었어요." anw="알아서 하십쇼." />
                    </div>
                    <div className={styles.inquireWrapper}>
                        <div className={styles.inquireHeaderTitle}>1:1 문의</div>
                        <input placeholder="검색" className={styles.inquireSearch} />
                        <div className={styles.inquireBox}>
                            <div className={styles.inquireResponse}>답변완료</div>
                            <div className={styles.inquireTitle}>배송 언제 오나요???</div>
                        </div>
                        <div className={styles.inquireBox}>
                            <div className={styles.inquireResponse}>답변유무</div>
                            <div className={styles.inquireTitle}>글 제목</div>
                        </div>
                        <div className={styles.inquireMainBox}>
                            <div className={styles.inquireMainHeader}>
                                <div className={styles.inquireMainTitle}>글 제목</div>
                                <div className={styles.inquireMainBtnWrapper}>
                                    <button className={styles.inquireMainPatch}>수정</button>
                                    <button className={styles.inquireMainBtnDelete}>삭제</button>
                                    <div><FontAwesomeIcon className={styles.inquireMainBtnOff} icon={faCaretUp} /></div>
                                </div>
                            </div>
                            <div className={styles.inquireMainContent}>글 내용</div>
                            <br />
                            <textarea className={styles.inquireMainAnswer}></textarea>
                            <div className={styles.inquirMainBtnWrapper}>
                                <button className={styles.inquireMainBtn}>답글등록</button>
                            </div>
                        </div>
                        <div className={styles.answerBox}>
                            <div className={styles.answerTitle}>문의하기</div>
                            <textarea className={styles.answerMain}></textarea>
                            <div className={styles.answerBtnWrapper}>
                                <input className={styles.answerCheck} type="checkbox" />
                                <div className={styles.answerSecret}>비밀글</div>
                                <button className={styles.answerRegisterBtn}>등록</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}


