import fistStyle from "../css/firstpurchase.module.css";
import firstImg from "../../public/assets/eventFirst.jpg";
import axios from "axios";
import { useAppSelector } from "../hook";

export default function FirstPurchase(){
    const userData = useAppSelector((state) => state.signin);

    const FistCoupon = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/event/coupon",
            data: {
                user_id: userData.user_id,
                coupon_id: 10
            }
        })
        if (res.data.result) {
            alert("첫 회원가입 쿠폰이 발급되었습니다.")
        }
        else if (!res.data.result) {
            alert(res.data.message);
        }
        FistCoupon();
    }

    return(
        <div className={fistStyle.firstContainer}>
            <section className={fistStyle.firstSection}>
                <div className={fistStyle.firstImgBox}>
                    <img className={fistStyle.firstImg} src={firstImg} />
                </div>
                <h1>디뮤어 첫구매 회원이라면, 드리는 특별한 혜택</h1>
                <div>구매이력이 없는 회원님들께 50%할인 혜택을 드립니다!</div>
                <div className={fistStyle.couponContainer}>
                    <div className={fistStyle.couponColumn}>
                        <div className={fistStyle.couponTitleBox}>
                            <div className={fistStyle.couponTitle}>첫 구매 할인 쿠폰</div>
                        </div>
                    </div>
                    <div className={fistStyle.couponColumn}>
                        <div className={fistStyle.couponMainBox} onClick={FistCoupon}>
                            <div className={fistStyle.couponDetail1}>50%</div>
                            <div className={fistStyle.couponDetail2}>발급 후 ~7일</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}