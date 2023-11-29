import { useState } from "react";
import styles from "../css/notion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function Day() {
    const date = new Date().toISOString().substr(0, 10);
    return (
        <div>{date}</div>
    )
}

function Notices({ que, anw }: { que: string, anw: string }) {
    
    const [visible, setVisible] = useState<boolean>(true);

    return (
        visible ?
            (<div className={styles.notionBox}>
                <div>{que}</div>
                <div className={styles.notionBtn}>
                    <FontAwesomeIcon icon={faCaretDown} onClick={() => setVisible(false)} />
                </div>
            </div >) :

            (<div className={styles.notionBox2Wrapper}>
                <div className={styles.notionBox2}>
                    <div>{que}</div>
                    <div className={styles.notionBtn}><FontAwesomeIcon icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                </div>
                <div className={styles.notionInforWrapper}>
                    <div className={styles.notionDaterWrapper}>
                        <Day/>
                    </div>
                    <div className={styles.notionInfor}>{anw}</div>
                </div>
            </div>)
    )
}


export default function Notion() {

    return (
        <>
            <div className={styles.notionContainer}>
                <section className={styles.notionSection}>
                    <div className={styles.notionWrapper}>
                        <div className={styles.notionTitle}>공지사항</div>
                        <Notices que="배송은 언제 오나요?"
                            anw="배송은 주문 일 기준으로 하루 뒤 발송시작되며 배송이 시작 된 이후로는 택배사에 문의하셔야 합니다." />
                        <Notices que="상품을 교환/반품하고 싶어요."
                            anw="[교환/반품 신청 기간]
                            교환/취소/반품/교환/환불은 배송 완료 후 7일 이내에 가능합니다.
                            고객님이 받으신 상품의 내용이 표시 광고 및 계약 내용과 다른 경우 상품을 수령하신 날로부터 3개월 이내,
                            그 사실을 안 날(알 수 있었던 날)부터30일 이내에 신청이 가능합니다." />
                        <Notices que="교환/반품을 철회하고 싶어요." 
                            anw="반품 요청 후 반송 물품을 발송 하기전 상태인 '반품 요청중' 상태라면
                            구매 내역 페이지나 반품 정보 페이지에서 반품 철회가 가능합니다." />
                        <Notices que="회원탈퇴는 어떻게 하나요?" anw="불가합니다." />
                        <Notices que="배송 받은 상품이 파손되었어요." anw="알아서 하십쇼." />
                    </div>
                </section>
            </div>
        </>
    )
}