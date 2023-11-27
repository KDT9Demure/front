import { useState } from "react";
import styles from "../css/notion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function Notions({ que, anw }: { que: string, anw: string }) {
    
    const [visible, setVisible] = useState<boolean>(true);
    const date = new Date().toISOString().substr(0, 10);

    return (
        visible ?
            (<div className={styles.notionBox}>
                <div>{que}</div>
                <div className={styles.notionBtn}>
                    <FontAwesomeIcon icon={faCaretDown} onClick={() => setVisible(false)} />
                </div>
            </div >)
            :
            (<div className={styles.notionBox2Wrapper}>
                <div className={styles.notionBox2}>
                    <div>{que}</div>
                    <div className={styles.notionBtn}><FontAwesomeIcon icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                </div>
                <div className={styles.notionInforWrapper}>
                    <div className={styles.notionDaterWrapper}>
                        <div>{date}</div>
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
                        <Notions que="배송은 언제 오나요?" anw="배송은 주문 일 기준으로 이틀 뒤 발송시작되며 배송이 시작 된 이후로는 택배사에 문의하셔야 합니다." />
                        <Notions que="상품을 교환/반품하고 싶어요." anw="알아서 하십쇼." />
                        <Notions que="교환/반품을 철회하고 싶어요." anw="알아서 하십쇼." />
                        <Notions que="회원탈퇴는 어떻게 하나요?" anw="불가합니다." />
                        <Notions que="배송 받은 상품이 파손되었어요." anw="알아서 하십쇼." />
                    </div>
                </section>
            </div>
        </>
    )
}