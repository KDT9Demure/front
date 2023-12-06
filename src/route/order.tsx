import React, { useState, useEffect, } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../css/order.module.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useAppSelector } from "../hook";

export default function Order() {

    // const userInfo = useAppSelector((state) => state.signin);

    const [orderList, setOrderList] = useState<any[]>([])

    const { id } = useParams<{ id: string }>();
    console.log('현재 주문 ID:', id);
    useEffect(() => {
        const orderData = async () => {
            try {

                const res = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_ADDRESS}/order/${id}`,
                });
                console.log('useEffect running')

                setOrderList(res.data);
                console.log(res.data)


            } catch (error) {
                console.log(error);
            }

        };

        orderData();

    }, []);


    const reBuy = (id: number) => {
        window.location.href = `http://localhost:3000/product/${id}`
    }

    const orderCancel = async (id: string) => {
        if (confirm(`${id}번 주문을 취소하시겠습니까?`)) {
            const res = await axios({
                method: "delete",
                url: `${import.meta.env.VITE_ADDRESS}/order/cancel`,
                data: {
                    id
                }
            })
            console.log(res.data)
            alert("주문이 취소되었습니다")
            window.location.href = "/profile"
        }
    }

    // 날짜별로 그룹화
    const ordersByDate: { [key: string]: typeof orderList } = {};


    orderList.forEach((order) => {
        if (!ordersByDate[order.id]) {
            ordersByDate[order.id] = [];
        }
        ordersByDate[order.id].push(order);
    });

    return (
        <>

            <div className={styles.top}></div>
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.orderList}>
                        <h1>주문내역</h1>
                    </div>
                    <div className={styles.containerBox}>

                        {Object.entries(ordersByDate).map(([id, orders]) => {
                            const date = orders[0].create_date.split("T");
                            const newDate = date[0];
                            const amount = orders[0].amount

                            // 가격에 , 추가
                            // const commaPrice = orders[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            // const PaymentPrice = orders[0].price * orders[0].goods_count;
                            // const commaPayment = PaymentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            const commaAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            console.log(orders.length)

                            return (
                                <div key={id} className={styles.map}>
                                    <hr className={styles.titleHr} />
                                    <div className={styles.header}>
                                        <div>
                                            <span className={styles.date}>{`${newDate}`}</span>
                                            <span className={styles.id}>주문번호 : {id}</span>
                                        </div>
                                        <button className={styles.cancleBtn} onClick={() => orderCancel(id)}>주문 취소</button>

                                    </div>
                                    <div>
                                        {orders.map((order) => (
                                            <div key={order.id}>
                                                <div className={styles.mainContainer}>
                                                    <div className={styles.orderContainer}>
                                                        <div className={styles.imgContainer} >
                                                            <img src={order.goods_id.image} className={styles.img} alt="상품 이미지"></img>
                                                        </div>
                                                        <button onClick={() => reBuy(order.goods_id.id)} className={styles.reBuy}>재구매</button>

                                                        <div className={styles.infoContainer}>
                                                            <div>
                                                                <span className={styles.productName}> {order.goods_id.name} </span>
                                                                <span className={styles.productColor} > {order.goods_id.color}</span>
                                                                <div className={styles.productPrice}>{order.price} 원</div>
                                                            </div>
                                                            <span className={styles.productCount}>수량ㅤㅤ ㅤ{order.goods_count}</span>
                                                            <span className={styles.delivery}>배송지ㅤㅤ{order.address}</span>
                                                            <div className={styles.priceAndDelivery}>
                                                                <span className={styles.price}>상품가격ㅤ</span><span className={styles.paymentPrice}>{Number(order.price) * Number(order.goods_count)} 원</span>
                                                                <span className={styles.deliveryStatus}>배송상태ㅤ{order.delivery_status} </span>
                                                            </div>
                                                        </div>

                                                    </div >
                                                </div>
                                                <br />
                                            </div>
                                        ))}
                                        <div className={styles.total}>
                                            <div className={styles.totalHr}>
                                                총 결제 금액 : {commaAmount} 원
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}