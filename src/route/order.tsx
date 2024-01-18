import { useState, useEffect, } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../css/order.module.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import Loading from "../item/Loading";


export default function Order() {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // const userInfo = useAppSelector((state) => state.signin);

    const [orderList, setOrderList] = useState<any[]>([])

    const { id } = useParams<{ id: string }>();
    console.log('현재 주문 ID:', id);
    useEffect(() => {
        const orderData = async () => {
            try {
                setIsLoading(false)
                const res = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_ADDRESS}/order/${id}`,
                });
                console.log('useEffect running')

                setOrderList(res.data);
                console.log(res.data)
                setIsLoading(true)

            } catch (error) {
                console.log(error);
            }

        };

        orderData();

    }, []);


    const reBuy = (id: number) => {
        window.location.href = `/product/${id}`
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
            {isLoading ? <></> : <Loading />}
            <div className={styles.bodys}>
                <div className={styles.container}>

                    <div className={styles.orderList}>주문내역</div>

                    <div className={styles.containerBox}>

                        {Object.entries(ordersByDate).map(([id, orders]) => {
                            const date = orders[0].create_date.split("T");
                            const newDate = date[0];
                            const amount = orders[0].amount
                            const commaAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            console.log(orders.length)

                            return (
                                <div key={id} className={styles.map}>


                                    <div className={styles.map}>
                                        <hr className={styles.titleHr} />
                                        <div>
                                            <div className={styles.headerInfo}>
                                                <div>
                                                    <div className={styles.id}>{`${newDate}`}
                                                        <span className={styles.date}>주문번호 : {id}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button className={styles.cancelBtn} onClick={() => orderCancel(id)}>주문 취소</button>
                                                </div>
                                            </div>
                                        </div>
                                        {orders.map((order) => (
                                            <div key={order.id} className={styles.map2}>

                                                <div className={styles.imgContainer} >

                                                    <img src={order.goods_id.image} className={styles.img} alt="상품 이미지"></img>
                                                    <button onClick={() => reBuy(order.goods_id.id)} className={styles.reBuy}>재구매</button>
                                                </div>
                                                <div className={styles.space}></div>
                                                <div className={styles.productInfoContainer}>
                                                    <div className={styles.topInfo}>

                                                        <div className={styles.productName}> {order.goods_id.name} </div>
                                                        <div className={styles.productColor} > {order.goods_id.color}</div>

                                                    </div>
                                                    <div className={styles.botInfo}>

                                                        <div className={styles.Pp}>
                                                            <span className={styles.price}>상품가격 </span><span className={styles.paymentPrice}>{Number(order.price) * Number(order.goods_count)} 원</span>
                                                        </div>
                                                        <div className={styles.Pc}>
                                                            <div className={styles.productCount}>수량</div><div className={styles.productCountText}>{order.goods_count} 개</div>
                                                        </div>
                                                        <div className={styles.priceAndDelivery}>

                                                            <div className={styles.Pd}>
                                                                <span className={styles.delivery}>배송지</span><span className={styles.deliveryText}>{order.address} </span>
                                                            </div>
                                                            <div className={styles.Ps}>
                                                                <span className={styles.deliveryStatus}>배송상태</span>
                                                                {order.delivery_status === "배송전" ?
                                                                    <span className={styles.deliveryStatusText}>{order.delivery_status}</span>
                                                                    :
                                                                    <span className={styles.deliveryStatusText2}>{order.delivery_status}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
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