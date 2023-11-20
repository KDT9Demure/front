import React, { useState, useRef } from "react";
import styles from "../css/product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import {faSquareCaretUp} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";



export default function Product() {
    const [visible, setVisible] = useState<boolean | null>(true);

    const openDetail = () => {
        setVisible(false);
    }

    const closeDetail = () => {
        setVisible(true);
    }

    return (
            <>
                <div className={styles.inforcontainer}>
                    <section className={styles.imageWrapper}>
                        <img src="" className={styles.image}/>
                    </section>
                    <section className={styles.inforWrapper}>
                        <div className={styles.inforHeader}>
                            <div className={styles.inforTitle}>침대</div>
                            <div className={styles.inforName}>상품이름</div>
                            <div>
                                <FontAwesomeIcon className={styles.starIcon} icon={faStar}/>
                                <FontAwesomeIcon className={styles.starIcon} icon={faStar}/>
                                <FontAwesomeIcon className={styles.starIcon} icon={faStar}/>
                                <FontAwesomeIcon className={styles.starIcon} icon={faStar}/>
                                <FontAwesomeIcon className={styles.starIcon} icon={faStar}/>
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
                    </section>
                </div>
                <br/>
                <div className={styles.detailContainer}>
                    <section className={styles.detailWrapper}>
                        {visible ? <><div className={styles.detailHeader}>
                            <div className={styles.title}>상품상세정보</div>
                        </div>
                        <div className={styles.detailInfor}>
                        상세한정보들
                        </div>
                        <div className={styles.detailBtn} onClick={openDetail}><FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faSquareCaretDown}/></div>
                        </>
                        : <>
                            <div className={styles.detailHeader}>
                                <div className={styles.title}>상품상세정보</div>
                            </div>
                            <div className={styles.detailInfor2}>
                                상세한정보들
                            </div>
                            <div className={styles.detailBtn2} onClick={closeDetail}><FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faSquareCaretUp} /></div>
                        </>}
                    </section>
                </div>
                <div className={styles.commentContainer}>
                    <section className={styles.commentWrapper}>
                        <div className={styles.commentHeader}>
                                <div className={styles.title}>상품평</div>
                            </div>
                            <div className={styles.commentInfor}>
                                <div>날짜</div>
                                <div>별점</div>
                                <div>댓글내용</div>
                            </div>
                    </section>
                </div>
                <div className={styles.createCommentContainer}>
                    <section className={styles.createCommentWrapper}>
                        <div className={styles.createCommentTitle}>상품평 작성</div>
                        <div className={styles.starIconContainer}>
                            <input type="radio" id="score" className={styles.starIconWrapper}/>
                            <label htmlFor="score"><FontAwesomeIcon className={styles.starIcon} icon={faStar}/></label>
                            <input type="radio" id="score" className={styles.starIconWrapper}/>
                            <label htmlFor="score"><FontAwesomeIcon className={styles.starIcon} icon={faStar}/></label>
                            <input type="radio" id="score" className={styles.starIconWrapper}/>
                            <label htmlFor="score"><FontAwesomeIcon className={styles.starIcon} icon={faStar}/></label>
                            <input type="radio" id="score" className={styles.starIconWrapper}/>
                            <label htmlFor="score"><FontAwesomeIcon className={styles.starIcon} icon={faStar}/></label>
                            <input type="radio" id="score" className={styles.starIconWrapper}/>
                            <label htmlFor="score"><FontAwesomeIcon className={styles.starIcon} icon={faStar}/></label>
                        </div>
                        <div className={styles.createCommentMain}>
                            <textarea placeholder="상품평을 입력해주세요" className={styles.comment}></textarea>
                            <button className={styles.commentCreateBtn}>등록</button>
                        </div>
                    </section>
                </div>
            </>
    )
};