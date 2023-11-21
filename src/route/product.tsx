import React, { useState, useRef } from "react";
import styles from "../css/product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";



export default function Product() {
    const [visible, setVisible] = useState<boolean | null>(true);
    const [score, setScore] = useState(0);

    const openDetail = () => {
        setVisible(false);
    }

    const closeDetail = () => {
        setVisible(true);
    }

    return (
        <>
            <div className={styles.inforcontainer}>
                <div className={styles.inforBox}>
                    <div className={styles.imageWrapper}>
                        <img src="https://www.ikea.com/kr/ko/images/products/besta-tv-bench-with-doors-white-lappviken-white__0719188_pe731908_s5.jpg" className={styles.image} />
                    </div>
                    <div className={styles.inforWrapper}>
                        <div className={styles.inforHeader}>
                            <div className={styles.inforTitle}>침대</div>
                            <div className={styles.inforName}>상품이름</div>
                            <div className={styles.inforRate}>
                                5.0
                            </div>
                        </div>
                        <div className={styles.inforBody}>
                            <div className={styles.inforPrice}>판매가</div>
                            <div className={styles.selectWrapper}>옵션
                                <select className={styles.select}>
                                    <option value='' selected>--- 선택하세요 ---</option>
                                    <option>원목</option>
                                    <option>오크</option>
                                    <option>네이마르</option>
                                </select>
                            </div>
                            <div className={styles.quantity}>수량</div>

                        </div>
                        <div className={styles.amount}>총 금액 : </div>
                        <div className={styles.bottom}>
                            <button className={styles.buyBtn}>구매</button>
                            <button className={styles.pickBtn}>장바구니</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.detailContainer}>
                <div className={styles.detailWrapper}>
                    {visible ? <><div className={styles.detailHeader}>
                        <div className={styles.title}>상품상세정보</div>
                    </div>
                        <div className={styles.detailInfor}>
                            <img className={styles.datailImg} src="https://image.musinsa.com/images/prd_img/2021040517184200000070689.jpg"/>
                        </div>
                        <div className={styles.detailBtn} onClick={openDetail}><FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faSquareCaretDown} /></div>
                    </>
                        : <>
                            <div className={styles.detailHeader}>
                                <div className={styles.title}>상품상세정보</div>
                            </div>
                            <div className={styles.detailInfor2}>
                                <img className={styles.datailImg} src=""/>
                            </div>
                            <div className={styles.detailBtn2} onClick={closeDetail}><FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faSquareCaretUp} /></div>
                        </>}
                </div>
            </div>
            <div className={styles.commentContainer}>
                <div className={styles.commentWrapper}>
                    <div className={styles.commentHeader}>
                        <div className={styles.title}>상품평</div>
                    </div>
                    <div className={styles.commentInfor}>
                        <div>날짜</div>
                        <div>별점</div>
                        <div>댓글내용</div>
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
                        <textarea placeholder="상품평을 입력해주세요" className={styles.comment}></textarea>
                        <button className={styles.commentCreateBtn}>등록</button>
                    </div>
                </div>
            </div>
        </>
    )
};