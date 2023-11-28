import React, { useState, useEffect, useRef } from "react"

import { useParams } from 'react-router-dom';

import axios from "axios";

import styles from "../css/profile.module.css";

import '@fortawesome/fontawesome-svg-core/styles.css'

const dummy = [
    {
        date: "2023.11.23",
        product: "가구",
        status: "배송완료"

    },
    {
        date: "2023.11.24",
        product: "qwertyuio",
        status: "배송중"

    },
    {
        date: "2023.11.25",
        product: "아이폰 12 Pro dasdw asdasdas das",
        status: "배송실패"

    },

]

const dummy2 = [
    {
        date: "2023.11.23",
        product: "문의1",
        status: "답변대기"

    },
    {
        date: "2023.11.24",
        product: "문의2",
        status: "답변완료"

    },
    {
        date: "2023.11.25",
        product: "문의3",
        status: "답변불가"

    },

]

const dummy3 = [
    {
        date: "2023.11.24",
        product: "2023 크리스마스 50% 할인 쿠폰",
    },
    {
        date: "2023.11.25",
        product: "2023 연말 20% 할인 쿠폰",
    },

]


export default function Profile() {
    return (
        <>
            <div className={styles.bodys}>
                <div className={styles.container}>

                    <div className={styles.infoBox}>
                        <div className={styles.infoTitle} >회원정보</div>
                        <h1>아이디</h1>
                        <h4>이름</h4>
                        <div>포인트 : 100,000,000P</div>
                    </div>

                    <button className={styles.editBtn}>회원정보수정</button>

                    <div className={styles.orderListContainer}>
                        <div className={styles.orderTitle}>최근 주문 내역</div>
                        <div className={styles.orderListBox}>
                            <div className={styles.whiteBox}>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>주문일자</div><div className={styles.box} style={{ fontWeight: "bold" }}>주문내용</div><div className={styles.box} style={{ fontWeight: "bold" }}>배송상태</div>
                                <hr className={styles.orderHr} />
                                {dummy.map((value, index) => {
                                    return (
                                        <>
                                            <div className={styles.box}>{value.date}</div><div className={styles.box}>{value.product}</div><div className={styles.box}>{value.status}</div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={styles.addressContainer}>
                        <div className={styles.addressTitle}>내 주소</div>
                        <div className={styles.addressBox}>
                            <div className={styles.whiteBox2}>
                                <h3 style={{ margin: 10 }}>우리집</h3>
                                <hr className={styles.addressHr} />
                                <div style={{ margin: 10 }}>서울특별시 서대문구 서대문동 서대문아파트 101동 1703호</div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={styles.orderListContainer}>
                        <div className={styles.askTitle}>문의내역</div>
                        <div className={styles.orderListBox}>
                            <div className={styles.whiteBox}>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>날짜</div><div className={styles.box} style={{ fontWeight: "bold" }}>제목</div><div className={styles.box} style={{ fontWeight: "bold" }}>답변상태</div>
                                <hr className={styles.orderHr} />
                                {dummy2.map((value, index) => {
                                    return (
                                        <>
                                            <div className={styles.box}>{value.date}</div><div className={styles.box}>{value.product}</div><div className={styles.box}>{value.status}</div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={styles.couponBox}>
                        <h1 style={{ marginBottom: 10 }}>보유쿠폰</h1>
                        {dummy3.map((value, index) => {
                            return (
                                <div>
                                    <span>{value.product}</span><div>  ~ {value.date} 까지 </div>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div >
        </>
    )
}