import React, { useState, useEffect } from "react"

import axios from "axios";

import styles from "../css/order.module.css";

import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Order() {

    const [orderList, setOrderList] = useState<any[]>([])
    const [id, setId] = useState<Number | null>(null)

    // const orderList = [
    //     {
    //         id: 1,
    //         name: 'Product 1',
    //         image: 'image-url-1',
    //         sale: false,
    //         price: 2000,
    //         color: "브라운",
    //         date: "2023.11.15",
    //         orderNumber: 111111
    //     },
    //     {
    //         id: 2,
    //         name: 'Product 2',
    //         image: 'image-url-2',
    //         sale: false,
    //         price: 30000,
    //         color: "레드",
    //         date: "2023.11.15",
    //         orderNumber: 111111
    //     },
    //     {
    //         id: 3,
    //         name: 'Product 3',
    //         image: 'image-url-3',
    //         sale: false,
    //         price: 59000,
    //         color: "브라운",
    //         date: "2023.11.14",
    //         orderNumber: 222222
    //     },
    //     {
    //         id: 4,
    //         name: 'Product 4',
    //         image: 'image-url-4',
    //         sale: false,
    //         price: 192000,
    //         color: "블랙",
    //         date: "2023.11.13",
    //         orderNumber: 333333
    //     },
    //     {
    //         id: 5,
    //         name: 'Product 5',
    //         image: 'image-url-5',
    //         sale: true,
    //         price: 1500000,
    //         color: "화이트",
    //         date: "2023.11.13",
    //         orderNumber: 444444
    //     },
    // ]

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

    return (
        <>
            <div className={styles.top}></div>
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.orderList}>
                        <h1>주문내역</h1>
                    </div>
                    {orderList.map((order, index) => {

                        const date = order.create_date
                        const newDate = date.split("T")
                        console.log(newDate[0])
                        const newTime = newDate[1].split(".")

                        return (
                            <div className={styles.mainContainer}>
                                <div key={order.id} className={styles.orderContainer}>

                                    <div className={styles.orderNumber}>
                                        <span >{newDate[0]}</span> <span>{newTime[0]}</span>
                                        <span>  주문번호 {order.id}</span>

                                    </div>

                                    <div className={styles.imgContainer} >
                                        <img src="" className={styles.img} alt="상품 이미지"></img>
                                        <div><button onClick={() => reBuy(order.goods_id)} className={styles.reBuy}>재구매</button></div>
                                    </div>

                                    <div className={styles.infoContainer}>
                                        <div>
                                            <span className={styles.productName}> 제품명 {order.delivery_memo} </span>
                                            <span className={styles.productColor} > 색상 {order.payment_type}</span>
                                        </div>
                                        <h2>{order.price}원</h2>
                                        <span className={styles.productCount}>수량</span><span> {order.goods_count}</span><br />
                                        <span className={styles.delivery}>배송지</span><span> {order.address}</span>
                                        <div>
                                            <span className={styles.price}>결제금액 </span><span className={styles.paymentPrice}> {Number(order.price) * Number(order.goods_count)}</span><br />

                                            <span className={styles.deliveryStatus}>배송상태 {order.delivery_status}</span>

                                        </div>
                                        <div className={styles.cancle}>
                                            <button>주문 취소(위치고민중)</button>
                                        </div>
                                    </div>
                                    <hr className={styles.hr} />
                                </div >
                            </div>
                        )

                    })}
                </div>
            </div >
        </>
    )
}