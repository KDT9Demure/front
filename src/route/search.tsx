import React, { useState, useEffect } from "react"

import axios from "axios";

import styles from "../css/search.module.css";

import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'

const search = [
    {
        id: 1,
        name: 'Product 1',
        image: 'image-url-1',
        sale: false,
        price: 2000
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'image-url-2',
        sale: false,
        price: 30000,
    },
    {
        id: 3,
        name: 'Product 3',
        image: 'image-url-3',
        sale: false,
        price: 59000,
    },
    {
        id: 4,
        name: 'Product 4',
        image: 'image-url-4',
        sale: false,
        price: 192000,
    },
    {
        id: 5,
        name: 'Product 5',
        image: 'image-url-5',
        sale: true,
        price: 1500000,
    },
]
export default function Search() {


    return (
        <>
            <div className={styles.top}></div>
            <div className={styles.bodys}>
                <div className={styles.container}>

                    <div className={styles.categoryInfo}>
                        <div className={styles.searchAndResult}>
                            <h1>"검색어" 에 대한 검색결과</h1>
                            <span className={styles.result}>result 몇개 </span>
                        </div>

                        <hr className={styles.hr} />

                        <div>
                            <div className={styles.colorContainer}>
                                색상

                                <div style={{ width: 50, height: 50, backgroundColor: "red" }}></div>
                                <div style={{ width: 50, height: 50, backgroundColor: "blue" }}></div>
                                <div style={{ width: 50, height: 50, backgroundColor: "green    " }}></div>


                            </div>


                            <div className={styles.sort}>
                                <span>인기상품순 | </span>
                                <span>낮은 가격순 | </span>
                                <span>높은 가격순</span>

                            </div>
                        </div>
                    </div>
                    <div className={styles.container2}>
                        {search.map((product, index) => (

                            <div key={index} className={styles.productContainer}>
                                <div className={styles.productImg}>
                                    <img style={{ width: 200 }} src={product.image} alt={`상품 이미지 - ${product.name}`} />
                                </div>
                                <div className={styles.productName}>{product.name}</div>
                                <span className={styles.sale}>{product.sale ? `sale` : null}</span>
                                <span className={styles.price}>{product.price}원</span>

                            </div>



                        ))}

                    </div>







                </div>
            </div>

        </>
    )
}