import { useState, useEffect } from "react"
import axios from "axios";
import styles from "../css/profile.module.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useAppSelector } from "../hook";
import Loading from "../item/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouseChimney
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
    const userInfo = useAppSelector((state) => state.signin);
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
                url: `${import.meta.env.VITE_ADDRESS}/profile/user`,
                data: {
                    user_id: userInfo.user_id
                }
            })
            setUserData(res.data)
            console.log("회원정보", res.data)
            setCommaPoint(res.data.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            setIsLoading(true)
        }
        userData();
    }, [])

    // 주문정보
    useEffect(() => {
        const orderData = async () => {
            const res = await axios({
                method: "post",
                url: `${import.meta.env.VITE_ADDRESS}/profile/order`,
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
                url: `${import.meta.env.VITE_ADDRESS}/profile/address`,
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
                url: `${import.meta.env.VITE_ADDRESS}/profile/question`,
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
                url: `${import.meta.env.VITE_ADDRESS}/profile/coupon`,
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
                {isLoading ? <></> : <Loading />}
                <div className={styles.container}>

                    <div className={styles.infoBox}>
                        <div className={styles.infoTitle}>회원정보</div>
                        {/* <div className={styles.inforHello}>{userData.user_name}님 환영합니다.</div> */}
                        <div className={styles.individualBox}>
                            <div className={styles.indivHeaderBox}>
                                <div className={styles.inforUseridHeader}>ID</div>
                                <div className={styles.inforUserNameHeader}>NAME</div>
                                <div className={styles.inforUserPointHeader}>POINT</div>
                            </div>
                            <div className={styles.indivBodyBox}>
                                <div className={styles.inforUserid}>{userData.userid}</div>
                                <div className={styles.inforUserName}>{userData.user_name}</div>
                                <div className={styles.inforUserPoint}>{commaPoint} P</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btnFlex}>
                        <a href="profile/user" className={styles.editBtn}>회원정보수정</a>
                    </div>
                    <div className={styles.orderListContainer}>
                        <div className={styles.orderTitle}>최근 주문 내역</div>
                        <div className={styles.orderListBox}>
                            <div className={styles.whiteBox}>
                                <div className={styles.orderBoxHeader}>
                                    <div className={styles.box}>주문일자</div>
                                    <div className={styles.box}>주문내용</div>
                                    <div className={styles.box}>배송상태</div>
                                </div>
                                
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
                    <div className={styles.addressContainer}>
                        <div className={styles.addressTitle}>내 주소</div>
                        <div className={styles.addressBox}>
                            <div className={styles.whiteBox2}>
                                {addressData.map((value) => {
                                    return (
                                        <div className={styles.addressItem}>
                                            <FontAwesomeIcon icon={faHouseChimney} className={styles.homeIcon}/>
                                            <div className={styles.addressName}>{value.address_name}</div>
                                            <div className={styles.address}>{value.address} {value.detail}</div>
                                        </div>
                                    )
                                })}

                                {addressData.length === 0 && <div>설정한 내 주소가 없습니다.</div>}
                            </div>
                        </div>
                    </div>
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

                    <div className={styles.couponContainer}>
                        <div className={styles.couponTitleBox}>
                            <div className={styles.couponTitle}>보유쿠폰</div>
                            <span className={styles.couponIndex} >{couponData.length}개</span>
                        </div>
                        <div className={styles.couponFlex}>
                            {couponData.map((value) => {

                                const date = value.coupon_id.use_date.split("T");
                                const newDate = date[0];

                                return (
                                    <div className={styles.couponBox}>
                                        <div className={styles.coupon1}></div>
                                        <div className={styles.couponName}>{value.coupon_id.coupon_name}</div>
                                        <div className={styles.couponDis}>{value.coupon_id.discount}%</div>
                                        {/* <span className={styles.dis}>할인 쿠폰</span> */}
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