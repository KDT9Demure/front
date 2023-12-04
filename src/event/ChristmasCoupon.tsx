import styles from "../css/christmascoupon.module.css";
import mainImg from "../../public/assets/christmas-8331639.jpg"
import axios from "axios";
import { useAppSelector } from "../hook";

function Snow() {

    return (
        <>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
            <div className={styles.snowflake}></div>
        </>
    )
}

export default function ChristmasCoupon() {
    const userData = useAppSelector((state) => state.signin);



    function CouponLoad() {

        const Coupon = async () => {
            const res = await axios({
                method: "post",
                url: 'http://localhost:8000/event/coupon',
                data: {
                    user_id: userData.user_id,
                    coupon_id: 7
                }
            })
            console.log(res)
            if (res.data.result) {
                alert("쿠폰이 발급되었습니다.");
            }
            else if (!res.data.result) {
                alert(res.data.message);
            }
        }
        Coupon();
    }

    return (
        <div className={styles.couponContainer}>
            <Snow />
            <section className={styles.couponSection}>
                <div className={styles.couponWrapper}>
                    <div className={styles.couponImgBox}>
                        <img src={mainImg} className={styles.couponImg} />
                    </div>
                    <div className={styles.couponTitleBox}>
                        <div className={styles.couponTitle}>크리스마스 이벤트 할인 쿠폰</div>
                    </div>
                    <div className={styles.couponMainBox} onClick={CouponLoad}>
                        <div className={styles.couponMain1}>15%</div>
                        <div className={styles.couponMain2}>2023 크리스마스 할인 쿠폰~23.12.31</div>
                    </div>
                    <a style={{ color: "white", textDecoration: "none" }} href="/event/showing"><div className={styles.couponMoveBox}>
                        <div className={styles.couponMove}>크리스마스 기획전 →</div>
                    </div></a>
                </div>
            </section>
        </div>
    )
}