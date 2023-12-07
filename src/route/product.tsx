import React, { useState, useEffect } from "react";
import styles from "../css/product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hook";
import Loading from "../item/Loading";



function ReviewBox({review} : {review : any}) {
    
    return (
        <div className={styles.commentInfor}>
            <div className={styles.rateStyle}>{review.rate}</div>
            {/* <div>ID:{review.user_id}</div> */}
            <div className={styles.dateStyle}>{review.create_date}</div>
            <div>{review.content}</div>
        </div>
    ) 
}

export default function Product() {
    const [visible, setVisible] = useState<boolean | null>(true);
    const [score, setScore] = useState(0);
    const [review, setReview] = useState<string>("");
    const [data, setData] = useState<any>("");
    const [reviews, setReviews] = useState<any[]>([]);
    const { id } = useParams();
    const [avg, setAvg] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userData = useAppSelector((state) => state.signin);

    useEffect(() => {
        setIsLoading(false);
        const datas = async () => {
            const res = await axios({
                method: "get",
                url: `${import.meta.env.VITE_ADDRESS}/product/${id}`,
            })
            console.log(res.data)
            setData(res.data.goodsInfo);
            setReviews(res.data.goodsInfo.reviews);
            console.log(res.data.avg)
            setAvg(res.data.avg);
            setIsLoading(true);
            if(!res.data.avg){
                setAvg(0);
            }

            
        }
        datas();     
    }, []);

    
    const reviewCheck = async () => {
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/product/review/verify`,
            data: {
                user_id: userData.user_id,
                goods_id:data.id,
            }
        })
    }

    const Buy = async () => {
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/cart`,
            data: {
                user_id: userData.user_id,
                goods_id:data.id,
                goods_count:1
            }
        })
        if(res.data.result) {
            window.location.href ="/cart"
        }
    }


    const Cart = async () => {
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/cart`,
            data: {
                user_id: userData.user_id,
                goods_id:data.id,
                goods_count:1
            }
        })
        console.log(res);
        if(res.data.result) {
            alert("장바구니에 추가했습니다.");
        }
    }
    
    const CreaeteReview = async () => {
        if(!userData.user_id) {
            alert("로그인을 해야 이용가능한 서비스입니다.");
        }
        if(score === 0 || null) {
            alert("0점은 불가합니다.");
            return;
        }
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/product/review`,
            data: {
                user_id: userData.user_id,
                content: review,
                rate: score,
                goods_id:data.id,
            }
        })
        if(res.data.result) {
            document.location.reload();
            setReview("");
        }   
    }

    const noneStyle={
        height:"300px",
    }

    const openStyle={
        height:"auto",
    }

    return (
        <div className={styles.box}>
            <div className={styles.inforcontainer}>
                {isLoading? <></>: <Loading/>}
                <div className={styles.inforBox}>
                    <div className={styles.imageWrapper}>
                        <img src={data.arrange_image} className={styles.image} />
                    </div>
                    <div className={styles.inforWrapper}>
                        <div className={styles.inforHeader}>
                            <div className={styles.inforRate}>{avg}</div>
                            <div className={styles.inforName}>{data.name}</div>
                            <div className={styles.inforTitle}>{data.type_name}</div>
                        </div>
                            {/* <div className={styles.inforBody}>
                            </div> */}
                        <div className={styles.amount}>{data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</div>
                        <div className={styles.bottom}>
                            <button className={styles.buyBtn} onClick={Buy}>구매</button>
                            <button className={styles.pickBtn} onClick={Cart}>장바구니</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.detailContainer}>
                <div className={styles.detailWrapper}>
                    <div className={styles.detailHeader}>
                        <div className={styles.title}>상품상세정보</div>
                    </div>
                    <div className={styles.detailInfor} style={visible?noneStyle:openStyle}>
                        <img className={styles.datailImg} src={'/assets/product.png'} />
                        <img className={styles.datailImg} src={data.image} style={{marginTop:"-5px"}}/>
                        {
                        visible? <div className={styles.detailBtn} onClick={() => setVisible(false)}><div className={styles.detailButton}>자세히보기</div></div>
                        :
                        <div className={styles.detailBtn} onClick={() => setVisible(true)}><div className={styles.detailButton}>닫기</div></div>
                        }
                    </div>
                    
                </div>
            </div>
            <div className={styles.commentContainer}>
                <div className={styles.commentWrapper}>
                    <div className={styles.commentHeader}>
                        <div className={styles.title}>상품평</div>
                    </div>
                    <div className={styles.reviewBox}>
                    {reviews.map((review, index) => {
                        return (
                            <ReviewBox key = {index} review={review} />
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className={styles.createCommentContainer}>
                <div className={styles.createCommentWrapper}>
                    <div className={styles.createCommentTitle}>상품평 작성</div>
                    <div className={styles.starIconContainer}>
                        {[1, 2, 3, 4, 5].map((number, index) => (
                            <div key={index} className={styles.starIconWrapper}>
                                <input type="radio" id="score" className={styles.starIconCover} />
                                <label htmlFor="score" className={styles.starIconLabel}><FontAwesomeIcon className={score < number ? styles.starIcon : styles.starIcon2} icon={faStar} onClick={() => setScore(number)} /></label>
                            </div>
                        ))}
                    </div>


                    <div className={styles.createCommentMain}>
                        <textarea placeholder="상품평을 입력해주세요" className={styles.comment} onChange={e => {setReview(e.target.value)}}></textarea>
                        <button className={styles.commentCreateBtn} onClick={CreaeteReview}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
};