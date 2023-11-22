import React, { useState, useEffect, useRef, } from "react"
import { useLocation, useParams } from "react-router-dom";


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

    const [Page, setPage] = useState<number>(1)
    const [sort, setSort] = useState<String>("best")


    const { number } = useParams();


    const onScroll = () => {
        setScrollPosition(window.scrollY);
    }

    const page = categories.length / 20 + 1

    useEffect(() => {
        const categoryData = async () => {
            try {

                const res = await axios({
                    method: "post",
                    url: `http://localhost:8000/list/${number}?sort=${sort}`,
                    data: {
                        page: 1,
                        sort: sort
                    }
                });
                console.log('useEffect running')
                setCategories([])
                setCategories(res.data);


            } catch (error) {
                console.log(error);
            }

        };

        categoryData();

    }, [number, sort]);



    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);


    // 스크롤 위치, body height 감시
    // console.log("현재 스크롤 위치 ", scrollPosition)
    // console.log("divHeight", divHeight)

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // divRef.current가 null이 아닌 경우를 넣어줘야 함( 안주면 오류 )
        if (divRef.current) {
            const bodyHeight = divRef.current.clientHeight;
            // console.log("높이:", bodyHeight);
            setDivHeight(bodyHeight - 700)
        }
    }, [scrollPosition]);


    // 현재 스크롤 위치 scrollPosition이 height - 700 정도 되면 setScrollEnd(true)
    useEffect(() => {
        // scrollPosition이 divHeight보다 큰 경우에만 axios 요청
        if (scrollPosition > divHeight && divHeight !== null) {
            setScrollEnd(true)
        }
    }, [scrollPosition]);

    // setScrollEnd(true) 면 다음페이지 20개 불러오고 다시 setScrollEnd(false) 
    useEffect(() => {
        if (scrollEnd === true) {
            setPage(page + 1)
            axios({
                method: "post",
                url: `http://localhost:8000/list/${number}?sort=${sort}`,
                data: {
                    sort: sort,
                    page: Page
                }
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

    // 정렬

    const best = async () => {

        setSort("best")
        const res = await axios({
            method: "post",
            url: `http://localhost:8000/list/${number}?sort=${sort}`,
            data: {
                sort: sort,
                page: 0
            }

        })
        console.log('sort running');
        setCategories(res.data);
    }
    const high = async () => {

        setSort("high")
        const res = await axios({
            method: "post",
            url: `http://localhost:8000/list/${number}?sort=${sort}`,
            data: {
                sort: sort,
                page: 0
            }
        })
        console.log('sort running');
        setCategories(res.data);
        console.log(res.data)
    }
    const low = async () => {

        setSort("low")
        const res = await axios({
            method: "post",
            url: `http://localhost:8000/list/${number}?sort=${sort}`,
            data: {
                sort: "low",
                page: 0
            }
        })
        console.log('sort running');
        setCategories(res.data);
    }


    let title: string;
    switch (number) {
        case "10555":
            title = '욕실용품';
            break;
        case "10382":
            title = '책장';
            break;
        default:
            title = '카테고리';
    }


    return (
        <>
            <div className={styles.top}></div>
            <div ref={divRef} className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.categoryInfo}>

                        <h1>{title}</h1>

                        <div className={styles.sort}>
                            <span onClick={best} >인기상품순 | </span>
                            <span onClick={low}>낮은 가격순 | </span>
                            <span onClick={high}>높은 가격순</span>
                        </div>
                    </div>
                    <div className={styles.container2}>
                        {categories.map((product, index) => {

                            // 가격에 , 추가
                            const commaPrice = product.goods_id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            const productImgHover = product.imgHover || false;



                            return (
                                <div key={index}
                                    className={styles.productContainer}
                                >

                                    <div className={styles.productImg}>
                                        <img loading="lazy"

                                            onMouseOver={() => {
                                                setCategories((prevCategories) =>
                                                    prevCategories.map((prevProduct, idx) =>
                                                        idx === index ? { ...prevProduct, imgHover: true } : prevProduct
                                                    )
                                                );
                                            }}

                                            onMouseOut={() => {
                                                setCategories((prevCategories) =>
                                                    prevCategories.map((prevProduct, idx) =>
                                                        idx === index ? { ...prevProduct, imgHover: false } : prevProduct
                                                    )
                                                );
                                            }}

                                            src={productImgHover ? product.goods_id.arrange_image || product.goods_id.image : product.goods_id.image}
                                            style={{ width: 300, height: 300, borderRadius: 8 }}
                                            alt={`${product.goods_id.name}`} />
                                    </div>

                                    <div className={styles.productTextHeader}>
                                        <span className={styles.category}>{product.goods_id.type_name}</span>
                                    </div>

                                    <div className={styles.productTextTop}>
                                        <span className={styles.productName}>{product.goods_id.name}</span>

                                    </div>

                                    <div className={styles.productTextBot}>
                                        <span className={styles.sale}>{product.goods_id.discount ? `sale` : " "}</span>
                                        <span className={styles.price}>{commaPrice}원</span>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div >
        </>
    )
}
