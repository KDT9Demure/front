import { useState, useEffect, } from "react"

import axios from "axios";

import styles from "../css/showing2.module.css";

import showingImg from "/public/assets/table1.png"
import showingImg2 from "/public/assets/chair1.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../hook";
import Loading from "../item/Loading";
config.autoAddCss = false

export default function Showing2() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableArray, setTableArray] = useState<any>([])
    const [chairArray, setChairArray] = useState<any>([])
    const [product, setProduct] = useState<any[]>([])

    useEffect(() => {
        const Data = async () => {
            const Tres = await axios({
                method: "post",
                url: `http://localhost:8000/list/fu004`,
                data: {
                    page: 2
                }
            })
            // console.log(res.data)
            setTableArray(Tres.data.slice(0, 10))

            const Cres = await axios({
                method: "post",
                url: `http://localhost:8000/list/fu002`,
                data: {
                    page: 2
                }
            })
            // console.log(res.data)
            setChairArray(Cres.data.slice(0, 10))
            setIsLoading(true)
        }
        Data();
    }, [])

    // 무한루프 방지 useEffect (배열 합치기)   
    useEffect(() => {
        setProduct([...tableArray, ...chairArray])
    }, [tableArray, chairArray])

    console.log("table", tableArray)
    console.log("chair", chairArray)
    console.log("product", product)

    // 쿠폰 발급 axios
    const userData = useAppSelector((state) => state.signin);

    function CouponLoad() {

        const Coupon = async () => {
            const res = await axios({
                method: "post",
                url: 'http://localhost:8000/event/coupon',
                data: {
                    user_id: userData.user_id,
                    coupon_id: 9
                }
            })
            console.log(res)
            if (res.data.result) {
                alert("쿠폰이 발급되었습니다.");
            }
            else if (!res.data.result) {
                alert(res.data.message);
            }
        }
        Coupon();
    }


    // 상품 페이지로 이동
    const moveProduct = (id: number) => {
        window.location.href = `http://localhost:3000/product/${id}`
    }

    /** 배열 번호 넘기면 이름 반환 */
    const productName = (n: number) => {
        if (product.length > 10) {
            return product[n].goods_id.name
        }
    }
    /** 배열 번호 넘기면 타입 반환 */
    const productType = (n: number) => {
        if (product.length > 10) {
            return product[n].goods_id.type_name
        }
    }
    /** 배열 번호 넘기면 가격에 , 넣어서 반환 */
    const productPrice = (n: number) => {
        if (product.length > 10) {
            const price = product[n].goods_id.price
            const newPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newPrice
        }
    }
    /** 배열 번호 넘기면 해당 상품 링크로 이동 */
    const productID = (n: number) => {
        if (product.length > 10) {
            const Num = product[n].goods_id.id
            window.location.href = `http://localhost:3000/product/${Num}`
        }
    }

    if (isLoading) {

        return (
            <div className={styles.bodys}>
                <div className={styles.header}>

                    <div className={styles.imgBox}>
                        <img src={showingImg} className={styles.mainImg} />
                        <img src={showingImg2} className={styles.mainImg2} />
                        <div className={styles.textBox}>
                            <div style={{ fontSize: 22, fontWeight: "bold" }}>편안함과 스타일의 조화, 신학기 기획전 & 쿠폰</div>
                            <div style={{ marginTop: 10, marginLeft: 20 }}> 편안한 자세와 훌륭한 디자인이 결합된 신학기 기획전을 놓치지 마세요. 효율적이고 편안한 공부 환경을 위한 제품들을 만나보세요.</div>
                            <div className={styles.couponMainBox} onClick={CouponLoad}>
                                <div className={styles.couponMain1}>20%</div>
                                <div className={styles.couponMain2}>2024 신학기 쿠폰 ~24.03.30</div>
                            </div>
                        </div>
                        {/* 테이블 */}
                        <div className={styles.circleDiv} onClick={() => productID(0)} style={{ left: 100, top: 270 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ left: 50, top: 145 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(0)}</div>
                                <div className={styles.PT}> {productType(0)}</div>
                                <div className={styles.PP}> {productPrice(0)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                        {/* 의자 */}
                        <div className={styles.circleDiv} onClick={() => productID(10)} style={{ right: 430, top: 250 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ right: 300, top: 125 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(10)}</div>
                                <div className={styles.PT}> {productType(10)}</div>
                                <div className={styles.PP}> {productPrice(10)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                        {/* 의자 */}
                        <div className={styles.circleDiv} onClick={() => productID(10)} style={{ right: 620, top: 250 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ right: 650, top: 125 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(11)}</div>
                                <div className={styles.PT}> {productType(11)}</div>
                                <div className={styles.PP}> {productPrice(11)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={styles.flexBox}>
                    <div className={styles.contentBox}>

                        {product.map((value, index) => {

                            // 가격에 , 추가
                            const commaPrice = value.goods_id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            // 이미지 호버 시 이미지 체인지
                            const productImgHover = value.imgHover || false;

                            return (
                                <>
                                    <div key={value.goods_id.id}
                                        onClick={() => moveProduct(value.goods_id.id)}

                                    >
                                        <img
                                            src={productImgHover ? value.goods_id.arrange_image || value.goods_id.image : value.goods_id.image}
                                            className={`${styles.productImg} ${productImgHover ? styles.productImgHover : ''}`}
                                            // 이미지 호버 시 이미지 체인지
                                            onMouseOver={() => {
                                                setProduct((prevProduct) =>
                                                    prevProduct.map((prevProduct, idx) =>
                                                        idx === index ? { ...prevProduct, imgHover: true } : prevProduct
                                                    )
                                                );
                                            }}

                                            onMouseOut={() => {
                                                setProduct((prevProduct) =>
                                                    prevProduct.map((prevProduct, idx) =>
                                                        idx === index ? { ...prevProduct, imgHover: false } : prevProduct
                                                    )
                                                );
                                            }}
                                        />
                                        <div className={styles.typeName}>{value.goods_id.type_name}</div>
                                        <div className={styles.name}>{value.goods_id.name}</div>
                                        {value.goods_id.discount ? <div className={styles.price}>sale {commaPrice}원</div> :
                                            <div className={styles.price}>{commaPrice}원</div>
                                        }

                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div >
        )
    } else {
        return (
            <>
                <div className={styles.bodys}>
                    <div className={styles.header}>

                        <div className={styles.imgBox}>
                            <img src={showingImg} className={styles.mainImg} />
                            <img src={showingImg2} className={styles.mainImg2} />
                            <div className={styles.textBox}>
                                <div style={{ fontSize: 22, fontWeight: "bold" }}>편안함과 스타일의 조화, 신학기 기획전 & 쿠폰</div>
                                <div style={{ marginTop: 10, marginLeft: 20 }}> 편안한 자세와 훌륭한 디자인이 결합된 신학기 기획전을 놓치지 마세요. 효율적이고 편안한 공부 환경을 위한 제품들을 만나보세요.</div>
                                <div className={styles.couponMainBox} onClick={CouponLoad}>
                                    <div className={styles.couponMain1}>20%</div>
                                    <div className={styles.couponMain2}>2024 신학기 쿠폰 ~24.03.30</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loading />
            </>
        )
    }
}