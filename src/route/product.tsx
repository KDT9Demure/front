import React, { useState, useEffect } from "react";
import styles from "../css/product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hook";



function ReviewBox({review} : {review : any}) {
    
    return (
        <div className={styles.commentInfor}>
            <div>ID:{review.user_id}</div>
            <div>날짜:{review.create_date}</div>
            <div>댓글내용:{review.content}</div>
            <div>별점:{review.rate}</div>
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

    const userData = useAppSelector((state) => state.signin);

    useEffect(() => {
        const datas = async () => {
            const res = await axios({
                method: "get",
                url: `http://localhost:8000/product/00161644`,
            })
            setData(res.data);
            setReviews(res.data.reviews);
            console.log(1, res.data.reviews)
        }
        datas();     
    }, []);

    
    const reviewLoading = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/product/review/verify",
            data: {
                user_id: 32,
                goods_id:data.id,
            }
        })
    }

    const Buy = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/product/buy",
            data
        })
        if(res.data.result) {
            // window.location.href ="/buy"
        }
    }


    const Cart = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/cart",
            data: {
                user_id: 32,
                goods_id:data.id,
                goods_count:1
            }
        })
        if(res.data.result) {
            window.location.reload();
        }
    }
    
    const CreaeteReview = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/product/review",
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
        <>
            <div className={styles.inforcontainer}>
                <div className={styles.inforBox}>
                    <div className={styles.imageWrapper}>
                        <img src={data.arrange_image} className={styles.image} />
                    </div>
                    <div className={styles.inforWrapper}>
                        <div className={styles.inforHeader}>
                            <div className={styles.inforTitle}>{data.type_name}</div>
                            <div className={styles.inforName}>{data.name}</div>
                            <div className={styles.inforRate}>
                                5.0
                            </div>
                        </div>
                        <div className={styles.inforBody}>
                            {/* <div className={styles.inforPrice}>{data.price} 원</div>
                            <div className={styles.selectWrapper}>옵션
                                <select className={styles.select}>
                                    <option value='' selected>--- 선택하세요 ---</option>
                                    <option>원목</option>
                                    <option>오크</option>
                                    <option>네이마르</option>
                                </select>
                            </div> */}
                        </div>
                        <div className={styles.amount}>금액 : {data.price} 원</div>
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
                        <img className={styles.datailImg} src={data.image}/>
                        {
                        visible? <div className={styles.detailBtn} onClick={() => setVisible(false)}><FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faSquareCaretDown} /></div>
                        :
                        <div className={styles.detailBtn} onClick={() => setVisible(true)}><FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faSquareCaretUp} /></div>
                        }
                    </div>
                    
                </div>
            </div>
            <div className={styles.commentContainer}>
                <div className={styles.commentWrapper}>
                    <div className={styles.commentHeader}>
                        <div className={styles.title}>상품평</div>
                    </div>
                    {reviews.map((review, index) => {
                        return (
                            <ReviewBox key = {index} review={review} />
                        )
                    })}
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
        </>
    )
};