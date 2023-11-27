import { useEffect, useState } from "react";
import styles from "../css/cart.module.css";
import axios from "axios";
import { useAppSelector } from "../hook";
import { Link } from "react-router-dom";


// function AllPrice({ data }: { data: any }) {


//     return (
//         <div className={styles.priceWrapper}>
//             <div>총 주문금액 : {data.goods_id.price} 원</div>
//         </div>
//     )
// }

export default function Cart() {
    const userData = useAppSelector((state) => state.signin);
    const [datas, setDatas] = useState<any[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    //배송날짜 오늘 + 1일
    const formatDate = (d: Date): string => {
        const month = d.getMonth() + 1;
        const day = d.getDate() + 1;

        return `${month}월 ${day}일`;
    };
    const today = formatDate(new Date());

    useEffect(() => {
        if (!userData?.user_id) return;

        const datas = async () => {
            const res = await axios({
                method: "post",
                url: 'http://localhost:8000/cart/user',
                data: {
                    user_id: userData.user_id
                }
            })
            setDatas(res.data.cart)
            // console.log(1, res.data)
            // console.log(11, res.data.cart)
            // console.log(2, res.data.cart[0].id)

        }
        datas()
    }, [userData])

    const Delete = () => {
        if (!confirm('제품을 삭제하시겠습니까?')) {
            return;
        }

        const ProductDelete = async () => {
            const res = await axios({
                method: "delete",
                url: 'http://localhost:8000/cart/delete',
                data: {
                    // user_id: cartId
                    ids: checkedIds,
                }
            })
            if (res.data.result) {
                document.location.reload();
            }
        }
        ProductDelete();
    }


    console.log('datas', datas)
    console.log('checkedIds', checkedIds)

    // let sumPrice = 0;
    // for (const data of datas){
    //     sumPrice += data.goods_id.price
    // }
    const sumPrice = datas.reduce((acc, data) => acc + data.goods_id.price, 0);

    return (
        <div className={styles.container}>
            <section className={styles.cartWrapper}>
                <div className={styles.cartMain}>
                    {datas.map((data, index) => {
                        return (
                            <div key={index} className={styles.main}>
                                <div className={styles.cartImg}>
                                    <input type="checkbox"
                                    checked={checkedIds.some(checkedId => checkedId === data.id)}
                                        onChange={e => {
                                            if (e.currentTarget.checked) {
                                                setCheckedIds(prev => ([...prev, data.id]))
                                            } else {
                                                setCheckedIds(prev => prev.filter((checkedId) => checkedId !== data.id))
                                            }
                                        }}
                                    />
                                    <img className={styles.img} src={data.goods_id.arrange_image} />
                                </div>
                                <div className={styles.cartInfoWrapper}>
                                    <div className={styles.cartTitle}>{data.goods_id.type_name}</div>
                                    <div className={styles.cartInfo}>
                                        <div>({today}) 도착예정</div>
                                        <div>{data.goods_id.price} 원</div>
                                    </div>
                                    <div className={styles.cartInfo}>
                                        <div>배송비 무료</div>
                                    </div>
                                </div>
                            </div>)
                    })}
                    <div className={styles.priceWrapper}>
                        <div>총 주문금액 : {sumPrice} 원</div>
                    </div>
                    <button className={styles.cartDeleteBtn} onClick={Delete}>선택상품 삭제</button>
                </div>

                <Link className={styles.orderBtn} to="/buy?cart=">주문하기</Link>
            </section>
        </div>
    )
}