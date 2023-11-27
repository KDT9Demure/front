import React, { useState, useEffect } from "react"

import axios from "axios";

import styles from "../css/order.module.css";

import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Order() {

    const [orderList, setOrderList] = useState<any[]>([])

    useEffect(() => {
        const orderData = async () => {

            try {

                const res = await axios({
                    method: "get",
                    url: `http://localhost:8000/order`,
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
                            return (
                                <div key={id} className={styles.map}>
                                    <hr className={styles.titleHr} />
                                    <div className={styles.header}>
                                        <div>
                                            <span className={styles.date}>{`${newDate}`}</span>
                                            <span className={styles.id}>주문번호 : {id}</span>
                                        </div>
                                        <button className={styles.cancleBtn}>{id}번 주문 취소</button>

                                    </div>
                                    <div>
                                        {orders.map((order) => (
                                            <div key={order.id}>
                                                <div className={styles.mainContainer}>
                                                    <div className={styles.orderContainer}>
                                                        <div className={styles.imgContainer} >
                                                            <img src="" className={styles.img} alt="상품 이미지"></img>
                                                        </div>
                                                        <button onClick={() => reBuy(order.goods_id)} className={styles.reBuy}>재구매</button>

                                                        <div className={styles.infoContainer}>
                                                            <div>
                                                                <span className={styles.productName}> 제품명 {order.delivery_memo} </span>
                                                                <span className={styles.productColor} > 색상 {order.payment_type}</span>
                                                                <h2>{order.price} 원</h2>
                                                            </div>
                                                            <span className={styles.productCount}>수량ㅤㅤ ㅤ{order.goods_count}</span>
                                                            <span className={styles.delivery}>배송지ㅤㅤ{order.address}</span>
                                                            <span className={styles.price}>결제금액ㅤ{Number(order.price) * Number(order.goods_count)}</span>
                                                            <span className={styles.deliveryStatus}>배송상태ㅤ{order.delivery_status} </span>

                                                        </div>

                                                    </div >
                                                </div>
                                            </div>
                                        ))}
                                        <div className={styles.total}>
                                            <div className={styles.totalHr}>
                                                총 결제 금액 : {amount} 원
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