import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hook";
import { useState } from "react"
import buy from "../css/buy.module.css";
import Modal from "react-modal"; // 추가
import { Link } from "react-router-dom";
import { setDiscountPrice } from "../reducer/buy";

export default function CartItem(props:any){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [couponName, setCouponName] = useState<string>("");
    const [couponDiscount, setCouponDiscount] = useState<number>(0);
    const [couponUse, setCouponUse] = useState<boolean>(false);
    const [couponId, setCouponId] = useState<number>(0);
    const [coupon, setCoupon] = useState<any[]>([]);

    const userData = useAppSelector((state) => state.signin);
    const buyData = useAppSelector((state) => state.buy);
    const dispatch = useAppDispatch();

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex:3,
        },
        content: {
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "25px",
            overflow: "hidden",
        },
    };

    const handleUseCoupon = async (id:number, discount:number)=>{
        const res = await axios({
            method:"PATCH",
            url:"http://localhost:8000/event/coupon/use",
            data:{
                id
            }
        })

        if(res.data.result){
            setCouponDiscount(discount);
            setCouponUse(true);
            setCouponId(id);
            dispatch(setDiscountPrice(buyData.discountPrice + (props.value.goods_id.price * props.value.goods_count) * discount / 100));
            setIsOpen(!isOpen);
            setCouponName(coupon[0].coupon_id.coupon_name);
        }
        
        console.log(res);
    }

    const handleCancelCoupon = async()=>{
        const res = await axios({
            method:"PATCH",
            url:"http://localhost:8000/event/coupon/cancel",
            data:{
                id:couponId
            }
        })

        if(res.data.result){
            dispatch(setDiscountPrice(buyData.discountPrice - (props.value.goods_id.price * props.value.goods_count) * couponDiscount / 100));
            setCouponDiscount(0);
            setCouponUse(false);
            setCouponId(0);
        }
    }

    const getCoupon = async ()=>{
        const res = await axios({
            method:"POST",
            url:"http://localhost:8000/buy/coupon/get",
            data:{
                user_id:userData.user_id,
            }
        })

        console.log(res.data)

        if(res.data.result){
            setCoupon(res.data.coupon);
            setIsOpen(true)
        }
    }

    return(
        <div className={buy.listBody}>
            <Link to={'/product/'+props.value.goods_id.id} className={buy.listInfor}>
                <div className={buy.listImgBox}>
                    <img src={props.value.goods_id.arrange_image}/>
                </div>
                <div className={buy.listData}>
                    {props.value.goods_id.name}
                </div>
            </Link>
            <div className={buy.listCount}>{props.value.goods_count}</div>
            <div className={buy.listPrice}>{props.value.goods_id.price * props.value.goods_count}</div>
            <div className={buy.listCouponPrice}>{props.value.goods_id.price * props.value.goods_count - (props.value.goods_id.price * props.value.goods_count) * couponDiscount / 100}</div>
            <div className={buy.listCouponBox}>
                
                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                    <div className={buy.couponList}>쿠폰함</div>
                    <div className={buy.couponItemBox}>
                        {coupon.map((value:any, index:number)=>{
                            return (
                                <div key={index} className={buy.couponItem}>
                                    <div className={buy.couponDiscountGet}>{value.coupon_id.discount}%</div>
                                    <div className={buy.couponNameGet}>{value.coupon_id.coupon_name}</div>
                                    <div onClick={()=>handleUseCoupon(value.id, value.coupon_id.discount)} className={buy.couponSetButton}>적용</div>
                                </div>
                            )
                        })}
                    </div>
                </Modal>
                {couponUse ?
                    <>
                        <div className={buy.couponName}>{couponName}</div>
                        <div className={buy.couponDelete} onClick={()=>handleCancelCoupon()}>삭제</div>    
                    </>
                    :
                    <div className={buy.couponUse} onClick={()=>getCoupon()}>사용</div>
                }
                
            </div>
        </div>
    )
}