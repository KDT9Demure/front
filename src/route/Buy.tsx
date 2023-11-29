import axios from "axios";
import { useAppSelector } from "../hook";
import { useEffect, useState } from "react"
import buy from "../css/buy.module.css";


export default function Buy() {

    const [address, setAddress] = useState<any[]>([]);
    const [goods, setGoods] = useState<any[]>([]);
    const [deliveryArr, setdeliveryArr] = useState<any[]>([]);
    const [deliveryDate, setdeliveryDate] = useState<string>("");
    const userData = useAppSelector((state) => state.signin);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cart_ids = params.get("cart");

        const getAddress = async () => {
            const res = await axios({
                method:"POST",
                url:"http://localhost:8000/buy/address/get",
                data:{
                    user_id:userData.user_id,
                }
            })
            setAddress(res.data.data);
        }

        // 카트에 담겨온 아이템들
        const getOrderGoods = async ()=>{
            console.log(cart_ids);
            const res = await axios({
                method:"GET",
                url:"http://localhost:8000/buy/goods/get",
                params:{
                    cart_ids
                }
            })

            console.log(res);
            setGoods(res.data.data);
        }

        getAddress();
        getOrderGoods();
        
        // 오늘 날짜 기준으로 5일 뒤 까지
        let arr = [];
        const today = new Date();
        for(let i = 0; i<5; i++){
            arr.push(formatDate(new Date(today.setDate(today.getDate() + 1))));
        }
        setdeliveryArr(arr);
        
        
    }, [])

    const formatDate = (d: Date): string => {
            const month = d.getMonth()+ 1;
            const date = d.getDate();
            
        return month + "/" + date;
    };
    

    return (
        <>
            <section className={buy.buyBox}>
                <div className={buy.container}>
                    <div className={buy.addressBox}>
                        <div className={buy.title}>배송 정보</div>
                        <div className={buy.infoBox}>
                            <div className={buy.choiceBox}>
                                <div className={buy.addressChoice}></div>
                                <div className={buy.newAddress}></div>
                            </div>
                            <div className={buy.addressItemBox}>
                                {address.map((value, index) => {
                                    return (
                                        <div className={buy.addressItem} key={index}>
                                            <input type="radio" name="address" value={value.id}></input>
                                            <div className={buy.infor}>
                                                <div className={buy.nameBox}>
                                                    <div className={buy.name}>{value.address_name}</div>
                                                    <div className={buy.defaultBox}>
                                                        <div className={buy.default}>기본</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={buy.mdBox}>
                                                <div className={buy.modify}>수정</div>
                                                <div className={buy.delete}>삭제</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={buy.addressMemoBox}>
                            <div className={buy.memoTitle}>배송 메모</div>
                            <div className={buy.memoSelect}>
                                <select>
                                    <option>배송 메모를 선택해주세요</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={buy.cartItemBox}>
                        <div className={buy.cartTitle}>주문 정보</div>
                        <div className={buy.cartListBox}>
                            <div className={buy.listHead}>
                                <div className={buy.listInforHead}>상품 상세 정보</div>
                                <div className={buy.listCountHead}>수량</div>
                                <div className={buy.listPriceHead}>판매가</div>
                                <div className={buy.listCouponHead}>쿠폰</div>
                            </div>
                            {goods.map((value, index)=>{
                                return (
                                <div className={buy.listBody} key={index}>
                                    <div className={buy.listInfor}>
                                        <div className={buy.listImgBox}>
                                            <img src={value.goods_id.arrange_image}/>
                                        </div>
                                        <div className={buy.listData}>
                                            {value.goods_id.name}
                                        </div>
                                    </div>
                                    <div className={buy.listCount}>{value.goods_count}</div>
                                    <div className={buy.listPrice}>20000</div>
                                    <div className={buy.listCouponBox}>
                                        {/* <div className={buy.couponName}>연말쿠폰</div>
                                        <div className={buy.couponDelete}>삭제</div> */}
                                        <div className={buy.couponUse}>사용</div>
                                    </div>
                                </div>
                            )
                            })}
                            
                        </div>
                    </div>
                    <div className={buy.deliveryDateBox}>
                        <div className={buy.devliveryDateTitle}></div>
                        <div className={buy.deliveryDateChoice}>
                            {deliveryArr.map((value, index)=>{
                                return (
                                    <div key={index}>{value}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={buy.cashBox}>
                        <div className={buy.dpayBox}>
                            <div className={buy.dpayListBox}>

                            </div>
                            <div className={buy.dpayAddBox}>

                            </div>
                        </div>
                        <div className={buy.cashMethod}>

                        </div>
                    </div>
                    <div className={buy.cashResultBox}>
                        <div className={buy.cashResult}>
                            <div className={buy.cashResultTitle}></div>
                            <div className={buy.cashResultContent}></div>
                        </div>
                        <div className={buy.cashDiscountResult}>
                            <div className={buy.cashDiscountResultTitle}></div>
                            <div className={buy.cashDiscountResultContent}></div>
                        </div>
                    </div>
                    <div className={buy.goBox}>
                        <div className={buy.go}>결제하기</div>
                    </div>
                </div>
            </section>
        </>
    )
}