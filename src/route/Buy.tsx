import axios from "axios";
import { useAppSelector } from "../hook";
import { useEffect, useState } from "react"
import buy from "../css/buy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; // 추가
import { Link } from "react-router-dom";

function CartItem(props:any){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [couponName, setCouponName] = useState<string>("");
    const [couponDiscount, setCouponDiscount] = useState<number>(0);
    const [couponUse, setCouponUse] = useState<boolean>(false);
    const [couponId, setCouponId] = useState<number>(0);

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const handleUseCoupon = async (id:number, discount:number)=>{
        const res = await axios({
            method:"PATCH",
            url:"http://localhost:8000/event/coupon/use",
            data:{
                id
            }
        })

        if(res.data.result){
            setCouponDiscount(discount);
            setCouponUse(true);
            setCouponId(id);
        }
        
        console.log(res);
    }

    const handleCancelCoupon = async()=>{
        const res = await axios({
            method:"PATCH",
            url:"http://localhost:8000/event/coupon/cancel",
            data:{
                id:couponId
            }
        })

        if(res.data.result){
            setCouponDiscount(0);
            setCouponUse(false);
            setCouponId(0);
        }
    }

    return(
        <div className={buy.listBody}>
            <Link to={'/product/'+props.value.goods_id.id} className={buy.listInfor}>

                    <div className={buy.listImgBox}>
                        <img src={props.value.goods_id.arrange_image}/>
                    </div>
                    <div className={buy.listData}>
                        {props.value.goods_id.name}
                    </div>
            </Link>
            <div className={buy.listCount}>{props.value.goods_count}</div>
            <div className={buy.listPrice}>{props.value.goods_id.price * props.value.goods_count}</div>
            <div className={buy.listCouponPrice}>{props.value.goods_id.price * props.value.goods_count - (props.value.goods_id.price * props.value.goods_count) * couponDiscount / 100}</div>
            <div className={buy.listCouponBox}>
                
                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                    <div className={buy.couponItemBox}>
                        {props.coupon.map((value:any, index:number)=>{
                            return (
                                <div key={index} className={buy.couponItem}>
                                    <div>{value.coupon_id.discount}</div>
                                    <div>{value.coupon_id.coupon_name}</div>
                                    <div onClick={()=>handleUseCoupon(value.id, value.coupon_id.discount)}>적용</div>
                                </div>
                            )
                        })}
                    </div>
                </Modal>
                {couponUse ?
                    <>
                        <div className={buy.couponName}>연말쿠폰</div>
                        <div className={buy.couponDelete} onClick={()=>handleCancelCoupon()}>삭제</div>    
                    </>
                    :
                    <div className={buy.couponUse} onClick={()=>setIsOpen(true)}>사용</div>
                }
                
            </div>
        </div>
    )
}

export default function Buy() {

    // const addressStatus = useRef<HTMLInputElement>(null);

    const [newAddress, setNewAddress] = useState<boolean>(false);
    const [address, setAddress] = useState<any[]>([]);
    const [goods, setGoods] = useState<any[]>([]);
    const [deliveryArr, setdeliveryArr] = useState<any[]>([]);
    const [dpay, setDpay] = useState<any[]>([]);
    const [deliveryDate, setdeliveryDate] = useState<string>("");
    const [coupon, setCoupon] = useState<any[]>([]);

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
            const res = await axios({
                method:"GET",
                url:"http://localhost:8000/buy/goods/get",
                params:{
                    cart_ids
                }
            })
            setGoods(res.data.data);
        }

        const getDpay = async ()=>{
            const res = await axios({
                method:"GET",
                url:"http://localhost:8000/buy/dpay",
                params:{
                    user:userData.user_id
                }
            })
            setDpay(res.data.dpay);
        }

        const getCoupon = async ()=>{
            const res = await axios({
                method:"POST",
                url:"http://localhost:8000/buy/coupon/get",
                data:{
                    user_id:userData.user_id,
                }
            })

            console.log(res.data)

            if(res.data.result){
                setCoupon(res.data.coupon);
            }
        }

        getAddress();
        getOrderGoods();
        getDpay();
        getCoupon()
        
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

    const handleDeleteAddress = async (id:number)=>{
        const res = await axios({
            method:"DELETE",
            url:"http://localhost:8000/buy/address/delete",
            data:{
                id
            }
        })

        if(res.data.result){
            alert("삭제됐습니다.");
            setAddress(res.data.address);
        }
    }


    // 우편번호 가져오기
    const [zipCode, setZipcode] = useState<string>("");
    const [addressName, setAddressName] = useState<string>("");
    const [roadAddress, setRoadAddress] = useState<string>("");
    const [detailAddress, setDetailAddress] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const completeHandler = (data:any) =>{
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false);
    }

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    const handleAddressName = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setAddressName(e.target.value);
    }

    const handleAddressDetail = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setDetailAddress(e.target.value);
    }


    const handleAddressSave = async () =>{
        if(detailAddress===""){
            alert("상세주소를 입력해주세요!");
        }
        else{
            const res = await axios({
                method:"POST",
                url:"http://localhost:8000/buy/address/add",
                data:{
                    address:roadAddress,
                    detail:detailAddress,
                    zip_code:zipCode,
                    user_id:userData.user_id,
                    address_name:addressName,
                }
            })

            if(res.data.result){
                alert("저장됐습니다!");
                setAddress(res.data.addressList);
                setNewAddress(false);
            }
            else{
                alert("오류가 발생했습니다.")
            }
        } 
    }
    

    return (
        <>
            <section className={buy.buyBox}>
                <div className={buy.container}>
                    <div className={buy.addressBox}>
                        <div className={buy.title}>배송 정보</div>
                        <div className={buy.infoBox}>
                            <div className={buy.choiceBox}>
                                <input type="radio" name="choice" id="address" className={buy.addressInput} defaultChecked onClick={()=>setNewAddress(false)}/>
                                <label className={buy.addressChoice} htmlFor="address">배송지 선택</label>
                                <input type="radio" name="choice" id="new" className={buy.addressInput}/>
                                <label className={buy.newAddress} htmlFor="new" onClick={()=>setNewAddress(true)}>신규 입력</label>
                            </div>
                            {newAddress ?
                                <div>
                                    <div>
                                        <input value={addressName} placeholder="이름" onChange={handleAddressName}/>
                                        <input value={zipCode} readOnly placeholder="우편번호" />
                                        <div onClick={toggle}>우편번호 검색</div>
                                    </div>
                                    <div>
                                        <input value={roadAddress} readOnly placeholder="도로명 주소" />
                                        <input type="text" onChange={handleAddressDetail} value={detailAddress} placeholder="상세주소"/>
                                    </div>
                                    <div onClick={()=>{handleAddressSave()}}>저장</div>
                        
                                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                                        <DaumPostcode onComplete={completeHandler} style={{height:"100%"}} />
                                    </Modal>
                                </div>
                                :
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
                                                    <div className={buy.addressInforBox}>
                                                        <div className={buy.address}>{value.address}</div>
                                                        <div className={buy.addressDetail}>{value.detail}</div>
                                                        <div className={buy.addressZipCode}>({value.zip_code})</div>
                                                    </div>
                                                </div>
                                                <div className={buy.mdBox}>
                                                    {/* <div className={buy.modify}>수정</div> */}
                                                    <div className={buy.delete} onClick={()=>{handleDeleteAddress(value.id)}}>삭제</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
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
                                <div className={buy.listPriceHead}>가격</div>
                                <div className={buy.listCouponPriceHead}>쿠폰적용가</div>
                                <div className={buy.listCouponHead}>쿠폰</div>
                            </div>
                            
                            {goods.map((value, index)=>{
                                return (
                                    <CartItem key={index} value={value} coupon={coupon}></CartItem>
                                )
                            })}
                            
                        </div>
                    </div>
                    <div className={buy.deliveryDateBox}>
                        <div className={buy.devliveryDateTitle}>배송 날짜</div>
                        <div className={buy.deliveryDateChoice}>
                            {deliveryArr.map((value, index)=>{
                                return (
                                    <label key={index} onClick={()=>setdeliveryDate(value)}>{value}</label>
                                )
                            })}
                        </div>
                    </div>
                    <div className={buy.cashBox}>
                        <div className={buy.dpayBox}>
                            <div className={buy.dpayTitle}>D-Pay</div>
                            <div className={buy.dpayListBox}>
                                {dpay.map((value, index)=>{
                                    return (
                                        <div className={buy.dpayItem} key={index}>
                                            <div className={buy.bankName}>{value.bank_name}은행</div>
                                            <div className={buy.icChip}>
                                                <div className={buy.icLineOne}></div>
                                                <div className={buy.icLineTwo}></div>
                                                <div className={buy.icLineThree}></div>
                                            </div>
                                            <div className={buy.cardNumber}>
                                                {value.card_number.split('-').map((num:string, idx:number)=>{
                                                    return(
                                                        <div key={idx} className={buy.cardNumberSplit}>{num}</div>
                                                    )
                                                })}
                                            </div>
                                            <div className={buy.demureLogo}>Demure</div>
                                        </div>
                                    )
                                })}
                                <div className={buy.dpayAddBox}>
                                    <div className={buy.dpayAddItem}>
                                        <FontAwesomeIcon icon={faCirclePlus} className={buy.dpayAddIcon} />
                                        <div className={buy.dpayAddTitle}>결제 수단 추가</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={buy.cashMethod}>
                            <div className={buy.methodBox}>
                                <div className={buy.methodItem}>카드</div>
                                <div className={buy.methodItem}>무통장입금</div>
                                <div className={buy.methodItem}>계좌이체</div>
                                <div className={buy.methodItem}>휴대폰</div>
                                <div className={buy.methodItem}>카카오페이</div>
                                <div className={buy.methodItem}>네이버페이</div>
                            </div>
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