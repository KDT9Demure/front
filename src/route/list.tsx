import React, { useState, useEffect, useRef } from "react"

import axios from "axios";

import styles from "../css/list.module.css";


import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'


config.autoAddCss = false



export default function List() {


    const [categories, setCategories] = useState<any[]>([]);

    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const [divHeight, setDivHeight] = useState<number>(0);

    const [scrollEnd, setScrollEnd] = useState<boolean>(false)

    const onScroll = () => {
        setScrollPosition(window.scrollY);
    }

    const page = categories.length / 20 + 1

    useEffect(() => {
        const categoryData = async () => {
            try {
                if (categories.length > 1) {
                    setCategories([""])
                } else {

                    const res = await axios({
                        method: "post",
                        url: "http://localhost:8000/list/10382",
                        data: {
                            page: 1
                        }
                    });
                    console.log('useEffect running', res)
                    setCategories(res.data);

                }
            } catch (error) {
                console.log(error);
            }

        };

        categoryData();

    }, []);



    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);


    // 스크롤 위치, body height 감시
    console.log("현재 스크롤 위치 ", scrollPosition)
    console.log("divHeight", divHeight)

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // divRef.current가 null이 아닌 경우를 넣어줘야 함( 안주면 오류 )
        if (divRef.current) {
            const bodyHeight = divRef.current.clientHeight;
            console.log("높이:", bodyHeight);
            setDivHeight(bodyHeight - 800)
            //얘가 바뀔때마다 계속 감시해야함/////////////////
        }
    }, [categories]);


    // 현재 스크롤 위치 scrollPosition이 height - 800 정도 되면 setScrollEnd(true)
    useEffect(() => {
        // scrollPosition이 divHeight보다 큰 경우에만 axios 요청
        if (scrollPosition > divHeight && divHeight !== null) {
            setScrollEnd(true)
        }
    }, [scrollPosition]);

    // setScrollEnd(true) 면 다음페이지 20개 불러오고 다시 setScrollEnd(false) 
    useEffect(() => {
        if (scrollEnd === true) {

            axios({
                method: "post",
                url: "http://localhost:8000/list/10382",
                data: {
                    page
                },
            })
                .then((res) => {

                    setCategories((prevCategories) => [...prevCategories, ...res.data]);
                    console.log("Axios 요청");
                    console.log(categories)
                    setScrollEnd(false)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [scrollEnd])




    return (
        <>
            <div className={styles.top}></div>
            <div ref={divRef} className={styles.bodys}>
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
                        {categories.map((product, index) => {

                            // 가격에 , 추가
                            const commaPrice = product.goods_id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return (
                                <div key={index} className={styles.productContainer}>

                                    <div className={styles.productImg}>
                                        <img style={{ width: 300, height: 300 }} src={product.goods_id.image} alt={`상품 이미지 - ${product.goods_id.name}`} />
                                    </div>

                                    <div className={styles.productTextTop}>
                                        <span className={styles.category}>{product.goods_id.type_name}</span>
                                        <span className={styles.productName}>{product.goods_id.name}</span>

                                    </div>

                                    <div className={styles.productTextBot}>
                                        <span className={styles.sale}>{product.goods_id.discount ? `sale` : " "}</span>
                                        <span className={styles.price}>{commaPrice}원</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
