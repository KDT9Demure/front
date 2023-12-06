import { useState } from "react";
import styles from "../css/notion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";


function Notices({ que, anw, anw1, day }: { que: string, anw: string, anw1: string, day: string}) {
    
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
                    <div>{day}</div>
                    </div>
                    <div className={styles.notionInfor}>{anw}</div>
                    <div className={styles.notionInfor}>{anw1}</div>
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
                        <Notices que="[기획전] 신학기 맞이 기획전"
                            anw="[신학기 맞이 기획전을 진행합니다]"
                            anw1="Demure에서 신학기 맞이 기획전을 진행합니다.
                            신학기를 맞이하여 새로운 마음으로 시작하는 학생들을 위해 Demure에서 가구들을 추천하여 기획전을 진행합니다.
                            학생들의 공부능률을 올려주고, 휴식시 편안함과 아늑함을 느낄 수 있는 가구들을 추천드립니다.
                            자세한 것은 이벤트페이지에서 확인가능합니다."
                            day="2023-12-08" />
                        <Notices que="[EVENT] Demure 크리스마스 이벤트"
                            anw="[Demure 크리스마스 할인 쿠폰 이벤트]"
                            anw1="Demure에서 크리스마스를 맞이하여 크리스마스 기념 할인 쿠폰 이벤트를 진행합니다.
                            기간은 12월31일까지이며 자세한 것은 이벤트페이지에서 확인가능합니다."
                            day="2023-12-07" />
                        <Notices que="[공지] 선물포장 관련"
                            anw="[선물포장은 불가합니다]"
                            anw1="크리스마스와 연말이라 제품을 선물포장 요청하시는 분들이 많습니다.
                            아쉽게도 저희 Demure에서는 선물포장은 따로 해드리지 않음을 알려드립니다.
                            오늘도 저희 Demure를 이용해주셔서 감사합니다."
                            day="2023-12-05" />
                        <Notices que="[공지] 주문취소 후 쿠폰반환 관련"
                            anw="[결제에 사용하신 쿠폰은 반환되지 않습니다]"
                            anw1="이벤트 쿠폰에 관하여 알려드립니다.
                            안타깝게도 고객님께서 결제에 사용하신 쿠폰은 해당 상품을 주문취소 했을 시 돌려드리지 않습니다.
                            신중하게 사용하심을 권고합니다.
                            저희 Demure는 고객님의 편의를 위해 항상 노력하겠습니다.
                            이용해주셔서 감사합니다."
                            day="2023-12-02" />    
                        <Notices que="[기획전] 크리스마스 기획전" 
                            anw="[크리스마스 기획전을 진행합니다]"
                            anw1="Demure에서 크리스마스 기획전을 진행합니다.
                            크리스마스를 맞이하여 관련된 상품을 판매합니다.
                            크리스마스 분위기를 내고 싶으신 고객님들께 추천드리는 제품들을 모아두었습니다.
                            자세한 것은 이벤트페이지에서 확인가능합니다."
                            day="2023-12-01" />
                        <Notices que="[EVENT] 첫 구매 할인 이벤트"
                            anw="[Demure 첫 구매 할인 이벤트]"
                            anw1 ="Demure에서 첫 구매를 할 시 할인쿠폰을 드리는 이벤트를 진행합니다.
                            쿠폰 사용기한은 발급 후 7일 입니다.
                            자세한 것은 이벤트페이지에서 확인가능합니다."
                            day="2023-11-27" />    
                        <Notices que="[공지] 카카오연동 로그인"
                            anw="[카카오연동 로그인]"
                            anw1="Demure에서 카카오계정으로 로그인이 가능해졌습니다.
                            고객님들의 이용에 조금 더 쾌적함을 드릴 수 있는 Demure가 되도록 노력하겠습니다.
                            오늘도 Demure를 이용해 주셔서 감사합니다."
                            day="2023-11-22"/>
                    </div>
                </section>
            </div>
        </>
    )
}