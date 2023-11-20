import React, { useState, useEffect } from "react"

import axios from "axios";

import styles from "../css/list.module.css";


import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'


config.autoAddCss = false



export default function List() {


    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const categoryData = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: "http://localhost:8000/list/10382",
                    data: {
                        page: 1
                    }
                });
                setCategories(res.data);
                console.log(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        categoryData();
    }, []);

    //두번 오는거 해결


    // const products = [
    //     {
    //         id: 1,
    //         name: 'Product 1',
    //         image: 'image-url-1',
    //         sale: false,
    //         price: 2000
    //     },
    //     {
    //         id: 2,
    //         name: 'Product 2',
    //         image: 'image-url-2',
    //         sale: false,
    //         price: 30000,
    //     },
    //     {
    //         id: 3,
    //         name: 'Product 3',
    //         image: 'image-url-3',
    //         sale: false,
    //         price: 59000,
    //     },
    //     {
    //         id: 4,
    //         name: 'Product 4',
    //         image: 'image-url-4',
    //         sale: false,
    //         price: 192000,
    //     },
    //     {
    //         id: 5,
    //         name: 'Product 5',
    //         image: 'image-url-5',
    //         sale: true,
    //         price: 1500000,
    //     },



    // ];



    return (
        <>
            <div className={styles.top}></div>
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.categoryInfo}>
                        <h1>카테고리</h1>
                        <div className={styles.sort}>
                            <span>인기상품순 | </span>
                            <span>낮은 가격순 | </span>
                            <span>높은 가격순</span>
                        </div>
                    </div>
                    <div className={styles.container2}>
                        {categories.map((product, index) => (

                            <div key={index} className={styles.productContainer}>
                                <div className={styles.productImg}>
                                    <img style={{ width: 100 }} src={product[0].image} alt={`상품 이미지 - ${product.name}`} />
                                </div>
                                <div className={styles.productName}>{product.name}</div>
                                <span className={styles.sale}>{product.discount ? `sale` : null}</span>
                                <span className={styles.price}>{product[0].price}원</span>

                            </div>



                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}
