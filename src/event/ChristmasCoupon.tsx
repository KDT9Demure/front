import styles from "../css/christmascoupon.module.css";
import mainImg from "../../public/assets/christmas-8331639.jpg"

export default function ChristmasCoupon() {

    

    return (
        <div className={styles.couponContainer}>
            <section className={styles.couponSection}>
                <div className={styles.couponWrapper}>
                    <div className={styles.couponImgBox}>
                        <img src={mainImg} className={styles.couponImg}/>
                    </div>
                    <div className={styles.couponTitleBox}>
                        <div className={styles.couponTitle}>크리스마스 이벤트 할인 쿠폰</div>
                    </div>
                    <div className={styles.couponMainBox}>
                        <div className={styles.couponMain1}>30%</div>
                        <div className={styles.couponMain2}>2023 크리스마스 할인 쿠폰~23.12.31</div>
                    </div>
                    <div className={styles.couponMoveBox}>
                        <div className={styles.couponMove}>크리스마스 기획전 →</div>
                    </div>
                </div>
            </section>
        </div>
    )
}