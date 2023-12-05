import { useState, useEffect, } from "react"

import axios from "axios";

import styles from "../css/showing.module.css";

import showingImg from "/public/assets/slide4.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false

export default function Showing() {

    const [product, setProduct] = useState<any[]>([])

    useEffect(() => {
        const showingData = async () => {
            const res = await axios({
                method: "get",
                url: `http://localhost:8000/event/list?query=wt001`,
            })
            console.log(res.data)
            setProduct(res.data.category)
        }
        showingData();
    }, [])

    // 상품 페이지로 이동
    const moveProduct = (id: number) => {
        window.location.href = `http://localhost:3000/product/${id}`
    }



    /** 배열 번호 넘기면 이름 반환 */
    const productName = (n: number) => {
        if (product.length > 0) {
            return product[n].goods_id.name
        }
    }
    /** 배열 번호 넘기면 타입 반환 */
    const productType = (n: number) => {
        if (product.length > 0) {
            return product[n].goods_id.type_name
        }
    }
    /** 배열 번호 넘기면 가격에 , 넣어서 반환 */
    const productPrice = (n: number) => {
        if (product.length > 0) {
            const price = product[n].goods_id.price
            const newPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newPrice
        }
    }
    /** 배열 번호 넘기면 해당 상품 링크로 이동 */
    const productID = (n: number) => {
        if (product.length > 0) {
            const Num = product[n].goods_id.id
            window.location.href = `http://localhost:3000/product/${Num}`
        }
    }

    return (
        <>
            <div className={styles.bodys}>
                <div className={styles.header}>

                    <div className={styles.imgBox}>
                        <img src={showingImg} className={styles.mainImg} />

                        {/* 리스 */}
                        <div className={styles.circleDiv} onClick={() => productID(8)} style={{ left: 180, top: 100 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ left: 280, top: 75 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(8)}</div>
                                <div className={styles.PT}> {productType(8)}</div>
                                <div className={styles.PP}> {productPrice(8)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                        {/* 별 */}
                        <div className={styles.circleDiv} onClick={() => productID(4)} style={{ right: 88, top: 55 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ right: 170, top: 20 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(4)} </div>
                                <div className={styles.PT}> {productType(4)}</div>
                                <div className={styles.PP}> {productPrice(4)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                        {/* LED */}
                        <div className={styles.circleDiv} onClick={() => productID(3)} style={{ right: 650, top: 260 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ right: 500, top: 220 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(3)} </div>
                                <div className={styles.PT}> {productType(3)}</div>
                                <div className={styles.PP}> {productPrice(3)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                        {/* 양초 */}
                        <div className={styles.circleDiv} onClick={() => productID(2)} style={{ right: 870, top: 210 }}>
                            <span className={styles.circle}></span>
                        </div>
                        <div className={styles.additionalDiv} style={{ right: 700, top: 170 }}>
                            <div className={styles.DivInInfo} >
                                <div className={styles.PN}> {productName(2)} </div>
                                <div className={styles.PT}> {productType(2)}</div>
                                <div className={styles.PP}> {productPrice(2)}<span style={{ fontSize: 16 }}> 원</span></div>
                            </div>
                            <div className={styles.DivInShape}>
                                <div style={{ fontSize: 22 }}><FontAwesomeIcon icon={faChevronRight} /></div>
                            </div>
                        </div>

                        <div className={styles.gradient} >
                            <div style={{ fontSize: 24, fontWeight: "bold" }}>나만의 가장 완벽한 크리스마스</div>
                            <div style={{ marginTop: 10, marginLeft: 10 }}> 우리 집에서 열리는 화려한 북유럽의 크리스마스 마켓!
                                스칸디나비아 전통문화와 수공예에서 영감을 얻은 새로운 겨울 컬렉션으로 나만의 크리스마스를 준비해 보세요.</div>
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
            </div>
        </>
    )
}