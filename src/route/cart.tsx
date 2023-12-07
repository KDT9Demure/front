import { useEffect, useState } from "react";
import styles from "../css/cart.module.css";
import axios from "axios";
import { useAppSelector } from "../hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Loading from "../item/Loading";

function Counter({ data, setDatas }: { data: any, setDatas: any }) {
    const [number, setNumber] = useState<number>(data.goods_count);

    //수량 +
    const handleIncrement = () => {
        setNumber(number + 1);

        const countPatch = async () => {

            const res = await axios({
                method: "patch",
                url: `${import.meta.env.VITE_ADDRESS}/cart/update`,
                data: {
                    id: data.id,
                    objectCount: number + 1
                }
            })
            //갯수 추가에 따른 금액 증가
            setDatas((prevs: any) => {
                const newDatas = [...prevs];
                const dataIndex = newDatas.findIndex((prevData) => prevData.id === data.id);
                newDatas[dataIndex].goods_count += 1;
                return newDatas;
            })
        }
        countPatch();
    }

    //수량 -
    const handleDecrement = () => {
        if (number < 2) return;
        setNumber(number - 1);

        const countPatch = async () => {
            const res = await axios({
                method: "patch",
                url: `${import.meta.env.VITE_ADDRESS}/cart/update`,
                data: {
                    id: data.id,
                    objectCount: number - 1
                }
            })
            //갯수 추가에 따른 금액 감소
            setDatas((prevs: any) => {
                const newDatas = [...prevs];
                const dataIndex = newDatas.findIndex((prevData) => prevData.id === data.id);
                newDatas[dataIndex].goods_count -= 1;
                return newDatas;
            })
        }
        countPatch();
    }




    return (
        <div className={styles.amountWrapper}>
            <div className={styles.amountTitle}>수량</div>
            <button onClick={handleDecrement} className={styles.amountBtn}><FontAwesomeIcon icon={faMinus} className={styles.amountIcon} /></button>
            <div className={styles.amountPrice}>  {number}  </div>
            <button onClick={handleIncrement} className={styles.amountBtn}><FontAwesomeIcon icon={faPlus} className={styles.amountIcon} /></button>
        </div>
    )
}


export default function Cart() {
    const userData = useAppSelector((state) => state.signin);
    const [datas, setDatas] = useState<any[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //배송날짜 오늘 + 1일
    const formatDate = (d: Date): string => {
        const month = d.getMonth() + 1;
        const day = d.getDate() + 1;

        return `${month}월 ${day}일`;
    };
    const today = formatDate(new Date());

    useEffect(() => {
        setIsLoading(false);
        const datas = async () => {
            const res = await axios({
                method: "post",
                url: `${import.meta.env.VITE_ADDRESS}/cart/user`,
                data: {
                    user_id: userData.user_id
                }
            })
            setDatas(res.data.cart);
            setIsLoading(true);
            console.log("setdatas", res.data.cart)
        }
        datas();
    }, [])

    const Delete = () => {
        if (checkedIds.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }
        if (!confirm('제품을 삭제하시겠습니까?')) {
            return;
        }

        const ProductDelete = async () => {
            const res = await axios({
                method: "delete",
                url: `${import.meta.env.VITE_ADDRESS}/cart/delete`,
                data: {
                    id: checkedIds,
                }
            })
            if (res.data.result) {
                document.location.reload();
            }
        }
        ProductDelete();
    }

    const buyProduct = () => {
        if (checkedIds.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }
        document.location.href = `/buy?cart=${checkedIds}`
    }

    //check된 id 확인
    console.log('checkedIds', checkedIds)

    //금액 총액
    const resultPrice = datas.filter(data => checkedIds.includes(data.id)).reduce((acc, data) => acc + data.goods_id.price * data.goods_count, 0);
    const price = resultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className={styles.container}>
            <section className={styles.cartWrapper}>
                <div className={styles.cartMain}>
                    {isLoading ? <></> : <Loading />}
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
                                        <div>{data.goods_id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</div>
                                    </div>
                                    <div className={styles.cartInfo}>
                                        <div>배송비 무료</div>
                                        <Counter data={data} setDatas={setDatas} />
                                    </div>
                                </div>
                            </div>)
                    })}
                    <div className={styles.priceWrapper}>
                        <div>총 주문금액 : {price} 원</div>
                    </div>
                    <div className={styles.cartAllCheck}>
                        {!checkedIds.length && <><input type="checkbox" id="allcheck" className={styles.cartAllCheckBtn} />
                            <label htmlFor="allcheck" className={styles.cartAllCheckLabel} onClick={() => {
                                const ids = datas.map((data) => data.id);
                                setCheckedIds(ids);
                            }}>전체선택</label></>}
                        {!!checkedIds.length && <><input type="checkbox" id="allcheck" className={styles.cartAllCheckBtn} />
                            <label htmlFor="allcheck" className={styles.cartAllCheckLabel} onClick={() => {
                                setCheckedIds([]);
                            }}>전체해제</label></>}
                        <div className={styles.cartDeleteBtn} onClick={Delete}>선택상품 삭제</div>
                    </div>
                </div>
                <div className={styles.orderBtn} onClick={buyProduct} >주문하기</div>
            </section>
        </div>
    )
}