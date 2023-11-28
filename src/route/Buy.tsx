import axios from "axios";
import { useAppSelector } from "../hook";
import { useEffect, useState } from "react"
import buy from "../css/buy.module.css";


export default function Buy() {

    const [address, setAddress] = useState<any[]>([]);
    const userData = useAppSelector((state) => state.signin);

    const arr: object[] = [
        {
            user_id: 32,
            detail: "홍천소낙들길",
            address: "충청남도 서산시 해미면",
            zip_code: "32582",
            address_name: "집",
            id: 2
        },
        {
            user_id: 32,
            detail: "홍천소낙들길",
            address: "충청남도 서산시 해미면",
            zip_code: "32582",
            address_name: "집2",
            id: 3
        }
    ]


    useEffect(() => {
        const getAddress = async () => {
            const res = await axios({
                method:"POST",
                url:"http://localhost:8000/buy/address/get",
                data:{
                    user_id:userData.user_id,
                }
            })
            console.log(userData.user_id);
            setAddress(res);
            console.log(res);
        }

        getAddress();
        
    }, [])

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
                                {arr.map((value, index) => {
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
                            <div className={buy.listBody}>
                                <div className={buy.listInfor}>
                                    <div className={buy.listImgBox}>
                                        <img />
                                    </div>
                                    <div className={buy.listData}>
                                        상품이름
                                    </div>
                                </div>
                                <div className={buy.listCount}>1</div>
                                <div className={buy.listPrice}>20000</div>
                                <div className={buy.listCouponBox}>
                                    <div className={buy.couponName}>연말쿠폰</div>
                                    <div className={buy.couponDelete}>삭제</div>
                                    <div className={buy.couponUse}>사용</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={buy.deliveryDateBox}>
                        <div className={buy.devliveryDateTitle}></div>
                        <div className={buy.deliveryDateChoice}>
                            <div>11/28</div>
                            <div>11/29</div>
                            <div>11/30</div>
                            <div>12/01</div>
                            <div>12/02</div>
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