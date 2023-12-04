import React, { useState, useEffect, useRef } from "react"

import axios from "axios";

import styles from "../css/showing.module.css";

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

    return (
        <>
            <div className={styles.bodys}>

                <div className={styles.header}>
                    <h1>기획전이름</h1>
                    <br />
                    <hr />
                </div>

                <div className={styles.contentBox}>

                    {product.map((value, index) => {

                        // 가격에 , 추가
                        const commaPrice = value.goods_id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        // 이미지 호버 시 이미지 체인지
                        const productImgHover = value.imgHover || false;

                        return (
                            <>
                                <div key={value.goods_id.id}
                                    onClick={() => moveProduct(value.goods_id.id)}>
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
        </>
    )
}