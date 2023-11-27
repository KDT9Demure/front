import React, { useState, useEffect, useRef, } from "react"
import { Link, useParams } from "react-router-dom";


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

    const [Page, setPage] = useState<number>(2)
    const [sort, setSort] = useState<String>("best")
    const [selectedSort, setSelectedSort] = useState<String>("best")

    const [isListEnd, setIsListEnd] = useState<boolean>(false)

    const { number } = useParams();


    const onScroll = () => {
        setScrollPosition(window.scrollY);
    }

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
    const bodyHeight = divRef?.current?.clientHeight;

    useEffect(() => {
        // divRef.current가 null이 아닌 경우를 넣어줘야 함( 안주면 오류 )
        if (divRef.current) {
            // console.log("높이:", bodyHeight);
            setDivHeight(bodyHeight ? bodyHeight - 700 : 0)
        }
    }, [bodyHeight, categories]);

    // 현재 스크롤 위치 scrollPosition이 height - 700 정도 되면 setScrollEnd(true)
    useEffect(() => {
        // scrollPosition이 divHeight보다 큰 경우에만 axios 요청
        if (divHeight - 500 < scrollPosition && scrollPosition < divHeight + 55 && divHeight !== null && divHeight > 0) {
            setScrollEnd(true)
        }
    }, [scrollPosition]);

    // setScrollEnd(true) 면 다음페이지 20개 불러오고 다시 setScrollEnd(false) 
    useEffect(() => {
        if (scrollEnd === true) {
            setPage(Page + 1)
            console.log("현재 페이지", Page)
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
                    setScrollPosition(divHeight - 1000)
                    setDivHeight(scrollPosition + 3000)
                    console.log("Axios 요청");
                    console.log(categories)
                    setScrollEnd(false)

                    if (res.data.length < 20) {
                        setIsListEnd(true)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {

        }
    }, [scrollEnd, sort])

    const moreList = () => {
        setPage(Page + 1)
        console.log("현재 페이지", Page)
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

                if (res.data.length < 20) {
                    setIsListEnd(true)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // 정렬
    const best = async () => {
        setSelectedSort("best")
        setSort("best")
        setCategories([])
        setPage(2)
        setIsListEnd(false)
        const res = await axios({
            method: "post",
            url: `http://localhost:8000/list/${number}?sort=${sort}`,
            data: {
                sort: sort,
                page: 1
            }

        })
        console.log('sort running');
        setCategories(res.data);
    }

    const high = async () => {
        setSelectedSort("high")
        setSort("high")
        setCategories([])
        setPage(2)
        setIsListEnd(false)
        const res = await axios({
            method: "post",
            url: `http://localhost:8000/list/${number}?sort=${sort}`,
            data: {
                sort: sort,
                page: 1
            }
        })
        console.log('sort running');
        setCategories(res.data);
        console.log(res.data)
    }

    const low = async () => {
        setSelectedSort("low")
        setSort("low")
        setCategories([])
        setPage(2)
        setIsListEnd(false)
        const res = await axios({
            method: "post",
            url: `http://localhost:8000/list/${number}?sort=${sort}`,
            data: {
                sort: "low",
                page: 1
            }
        })
        console.log('sort running');
        setCategories(res.data);
    }

    // const best = () => { setSelectedSort("best"), setSort("best") }
    // const high = () => { setSelectedSort("high"), setSort("high") }
    // const low = () => { setSelectedSort("low"), setSort("low") }

    // 상품 페이지로 이동
    const moveProduct = (id: number) => {
        window.location.href = `http://localhost:3000/product/${id}`
    }

    let title: string;
    switch (number) {
        case "10555":
            title = 'Bathroom products';
            break;
        case "700417":
            title = "Kitchen"
            break;
        case "bm003":
            title = "Beds & mattresses";
            break;
        case "fu002":
            title = 'Chairs';
            break;
        case "fu004":
            title = 'Tables & desks';
            break;
        case "li002":
            title = 'Lighting';
            break;
        case "18767":
            title = 'Baby & Children';
            break;
        case "tl002":
            title = 'Decoration';
            break;
        case "fu003":
            title = 'Living room';
            break;
        case "st002":
            title = 'Cabinets';
            break;
        default:
            title = '카테고리';
    }

    return (
        <>
            <div className={styles.top}></div>
            <div ref={divRef} className={styles.bodys}>
                <div className={styles.container1}>
                    <div className={styles.categoryInfo}>

                        <h1 className={styles.title}>{title}</h1>

                        <div className={styles.sort}>
                            <span className={selectedSort === 'best' ? styles.selectedSort : ''} onClick={best}>인기상품순   </span>
                            <span>|</span>
                            <span className={selectedSort === 'low' ? styles.selectedSort : ''} onClick={low}>   낮은 가격순   </span>
                            <span>|</span>
                            <span className={selectedSort === 'high' ? styles.selectedSort : ''} onClick={high}>   높은 가격순</span>
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
                                    onClick={() => moveProduct(product.goods_id.id)}
                                >

                                    <div className={styles.productImg}>
                                        <img loading="lazy"
                                            id="img"

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
                                    <hr className={styles.listHr} />

                                </div>

                            )
                        })}

                    </div>
                </div>
                {isListEnd &&
                    <div className={styles.listEndDiv}>
                        <div className={styles.listEndText}>ㅤEndㅤ</div>
                    </div>
                }
                {!isListEnd &&
                    <div className={styles.listMoreDiv}>
                        <div onClick={moreList} className={styles.listMoreText}>ㅤMore 🔽ㅤ</div>
                    </div>
                }
            </div >
        </>
    )
}
