import { useEffect, useState } from "react";
import styles from "../css/cart.module.css";
import axios from "axios";
import { useAppSelector } from "../hook";
import {Link} from "react-router-dom";


function AllPrice({data} : {data : any}) {


    return (
        <div className={styles.priceWrapper}>
            <div>총 주문금액 : {data.goods_id.price} 원</div>
        </div>
    )
}

export default function Cart() {
    const userData = useAppSelector((state) => state.signin);
    const [datas, setDatas] = useState<any[]>([]);

    //배송날짜 오늘 + 1일
    const formatDate = (d: Date): string => {
        const month = d.getMonth() + 1;
        const day = d.getDate() + 1;
    
        return `${month}월 ${day}일`;
    };
    const today = formatDate(new Date());


    useEffect(() => {
        const datas = async () => {
            const res = await axios({
                method: "post",
                url:'http://localhost:8000/cart/user',
                data: {
                    user_id:userData.user_id
                }
            })
            setDatas(res.data.cart)
            console.log(1,res.data)
            console.log(11,res.data.cart)
            console.log(2, res.data.cart[i].id)
            
        }
        datas()
    }, [])

    const Delete = () => {
        if (!confirm('제품을 삭제하시겠습니까?')) {
            return;
        }
        
        const ProductDelete = async () => {
            const res = await axios({
                method: "delete",
                url:'http://localhost:8000/cart/delete',
                data: {
                    user_id:cartId.id
                }
            })
            if (res.data.result) {
                document.location.reload();
            }
        }
        ProductDelete();
    }


    return (
            <div className={styles.container}>
                <section className={styles.cartWrapper}>
                    <div className={styles.cartMain}>
                        {datas.map((data, index) => {
                            return(
                                <div key={index} className={styles.main}>
                                    <div className={styles.cartImg}>
                                        <input type="checkbox" />
                                        <img className={styles.img} src={data.goods_id.arrange_image}/>
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
                        
                        <button className={styles.cartDeleteBtn} onClick={Delete}>선택상품 삭제</button>
                    </div>
                    {/* <AllPrice data={data}/> */}
                    <Link className={styles.orderBtn} to="/buy?cart=">주문하기</Link>
                </section>
            </div>
        )
}