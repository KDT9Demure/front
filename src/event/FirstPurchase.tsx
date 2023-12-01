import fistStyle from "../css/firstpurchase.module.css";
import firstImg from "../../public/assets/eventFirst.jpg";
import axios from "axios";
import { useAppSelector } from "../hook";

export default function FirstPurchase(){
    const userData = useAppSelector((state) => state.signin);

    const FirstCoupon = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/event/coupon",
            data: {
                user_id: userData.user_id,
                coupon_id: 8
            }
        })
        if (res.data.result) {
            alert("첫 회원가입 쿠폰이 발급되었습니다.")
        }
        else if (!res.data.result) {
            alert(res.data.message);
        }
    }

    return(
        <div className={fistStyle.firstContainer}>
            <section className={fistStyle.firstSection}>
                <div className={fistStyle.firstImgBox}>
                    <img className={fistStyle.firstImg} src={firstImg} />
                </div>
                <h1>디뮤어 첫구매 회원이라면, 드리는 특별한 혜택</h1>
                <div>구매이력이 없는 회원님들께 10%할인 혜택을 드립니다!</div>
                <div className={fistStyle.couponContainer}>
                    <div className={fistStyle.couponTitleBox}>
                        <div className={fistStyle.couponTitle}>첫 구매 할인 쿠폰</div>
                    </div>
                    <div className={fistStyle.couponColumn}>
                        <div className={fistStyle.couponMainBox} onClick={FirstCoupon}>
                            <div className={fistStyle.couponDetail1}>10%</div>
                            <div className={fistStyle.couponDetail2}>발급 후 ~7일</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}