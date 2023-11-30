import React, { useState, useEffect, useRef } from "react"
import axios from "axios";
import styles from "../css/profile.module.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useAppSelector } from "../hook";

export default function Profile() {
    const userInfo = useAppSelector((state) => state.signin);

    const [userData, setUserData] = useState<any>({})
    const [orderData, setOrderData] = useState<any[]>([])
    const [addressData, setAddressData] = useState<any[]>([])
    const [askData, setAskData] = useState<any[]>([])
    const [couponData, setCouponData] = useState<any[]>([])

    const [commaPoint, setCommaPoint] = useState<string>("")

    // 회원정보
    useEffect(() => {
        const userData = async () => {
            const res = await axios({
                method: "post",
                url: `http://localhost:8000/profile/user`,
                data: {
                    user_id: userInfo.user_id
                }
            })
            setUserData(res.data)
            console.log("회원정보", res.data)
            setCommaPoint(res.data.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
        userData();
    }, [])

    // 주문정보
    useEffect(() => {
        const orderData = async () => {
            const res = await axios({
                method: "post",
                url: `http://localhost:8000/profile/order`,
                data: {
                    user_id: userInfo.user_id
                }
            })
            setOrderData(res.data)
            console.log("주문정보", res.data)
        }
        orderData();
    }, [])

    // 주소정보
    useEffect(() => {
        const addressData = async () => {
            const res = await axios({
                method: "post",
                url: `http://localhost:8000/profile/address`,
                data: {
                    user_id: userInfo.user_id
                }
            })
            setAddressData(res.data)
            console.log("주소정보", res.data)
        }
        addressData();
    }, [])

    // 문의내역
    useEffect(() => {
        const askData = async () => {
            const res = await axios({
                method: "post",
                url: `http://localhost:8000/profile/question`,
                data: {
                    user_id: userInfo.user_id
                }
            })
            setAskData(res.data)
            console.log("문의내역", res.data)
        }
        askData();
    }, [])

    // 쿠폰정보
    useEffect(() => {
        const couponData = async () => {
            const res = await axios({
                method: "post",
                url: `http://localhost:8000/profile/coupon`,
                data: {
                    user_id: userInfo.user_id
                }
            })
            setCouponData(res.data)
            console.log("쿠폰정보", res.data)
        }
        couponData();
    }, [])

    const moveOrder = (id: any) => {
        window.location.href = `http://localhost:3000/order/${id}`
    }
    return (
        <>
            <div className={styles.bodys}>
                <div className={styles.container}>

                    <div className={styles.infoBox}>
                        <div className={styles.infoTitle} >회원정보</div>
                        <h1>{userData.userid}</h1>
                        <h4>{userData.user_name}</h4>
                        <div>보유 포인트  {commaPoint} P</div>
                    </div>
                    <div className={styles.btnFlex}>
                        <a href="profile/user"><button className={styles.editBtn}>회원정보수정</button></a>
                    </div>
                    <div className={styles.orderListContainer}>
                        <div className={styles.orderTitle}>최근 주문 내역</div>
                        <div className={styles.orderListBox}>
                            <div className={styles.whiteBox}>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>주문일자</div>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>주문내용</div>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>배송상태</div>
                                <hr className={styles.orderHr} />
                                {orderData.map((value) => {

                                    const date = value.create_date.split("T");
                                    const newDate = date[0];

                                    return (
                                        <>
                                            <div className={styles.box}>{newDate}</div>
                                            <div className={styles.box} ><span onClick={() => moveOrder(value.id)} className={styles.orderText}>{value.goods_id.name}</span></div>
                                            <div className={styles.box}>{value.delivery_status}</div>
                                        </>
                                    )
                                })}
                                {orderData.length === 0 && <div>주문내역이 없습니다.</div>}
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={styles.addressContainer}>
                        <div className={styles.addressTitle}>내 주소</div>
                        <div className={styles.addressBox}>
                            <div className={styles.whiteBox2}>
                                {addressData.map((value) => {
                                    return (
                                        <>
                                            <h3 style={{ margin: 10 }}>{value.address_name}</h3>
                                            <hr className={styles.addressHr} />
                                            <div style={{ margin: 10 }}>{value.address} - {value.detail}</div>
                                            {addressData.length > 1 && <hr className={styles.addressHr2} />}
                                        </>
                                    )
                                })}

                                {addressData.length === 0 && <div>설정한 내 주소가 없습니다.</div>}
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={styles.orderListContainer}>
                        <div className={styles.askTitle}>문의내역</div>
                        <div className={styles.orderListBox}>
                            <div className={styles.whiteBox}>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>날짜</div>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>제목</div>
                                <div className={styles.box} style={{ fontWeight: "bold" }}>답변상태</div>
                                <hr className={styles.orderHr} />
                                {askData.map((value) => {
                                    const date = value.create_date.split("T");
                                    const newDate = date[0];
                                    return (
                                        <>
                                            <div className={styles.box}>{newDate}</div>
                                            <div className={styles.box}>{value.title}</div>
                                            {value.answer_status ? <div className={styles.box}>답변완료</div> : <div className={styles.box}>답변대기</div>}
                                        </>
                                    )
                                })}
                                {askData.length === 0 && <div>문의한 내용이 없습니다.</div>}
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={styles.couponContainer}>
                        <h2 style={{ marginBottom: 10, fontWeight: "normal" }}>보유쿠폰</h2>
                        <div className={styles.couponFlex}>
                            {couponData.map((value) => {

                                const date = value.coupon_id.use_date.split("T");
                                const newDate = date[0];

                                return (
                                    <div className={styles.couponBox}>
                                        <div className={styles.coupon1}></div>
                                        <div className={styles.couponName}>{value.coupon_id.coupon_name}</div>
                                        <div className={styles.couponDis}>{value.coupon_id.discount}%</div>
                                        <span className={styles.dis}>할인 쿠폰</span>
                                        <hr className={styles.couponHr} />
                                        <div className={styles.couponDate}>유효기간 {newDate}</div>

                                    </div>
                                )
                            })}
                        </div>
                        {couponData.length === 0 && <div>보유한 쿠폰이 없습니다.</div>}
                    </div>
                </div>
            </div >
        </>
    )
}