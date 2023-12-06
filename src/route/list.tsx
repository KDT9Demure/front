import { useState, useEffect, useRef, } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../css/list.module.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Loading from "../item/Loading";


config.autoAddCss = false


export default function List() {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [categoriesTemp, setCategoriesTemp] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [divHeight, setDivHeight] = useState<number>(0);
    const [scrollEnd, setScrollEnd] = useState<boolean>(false)

    const [Page, setPage] = useState<number>(2)
    const [sort, setSort] = useState<String>("best")

    // const [isListEnd, setIsListEnd] = useState<boolean>(false)

    const { number } = useParams();


    const onScroll = () => {
        setScrollPosition(window.scrollY);
    }

    useEffect(() => {
        const categoryData = async () => {

            try {
                setIsLoading(false)
                const res = await axios({
                    method: "post",
                    url: `${import.meta.env.VITE_ADDRESS}/list/${number}?sort=${sort}`,
                    data: {
                        page: 1,
                        sort: sort
                    }
                });
                // setCategories([])
                setCategories(res.data);
                setIsLoading(true)
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
            setIsLoading(false)
            setPage(Page + 1)
            console.log("현재 페이지", Page)
            axios({
                method: "post",
                url: `${import.meta.env.VITE_ADDRESS}/list/${number}?sort=${sort}`,
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

                    // if (res.data.length < 20) {
                    //     setIsListEnd(true)
                    // }
                    setIsLoading(true)
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {

        }
    }, [scrollEnd, sort])

    // const moreList = () => {
    //     setPage(Page + 1)
    //     console.log("현재 페이지", Page)
    //     axios({
    //         method: "post",
    //         url: `http://localhost:8000/list/${number}?sort=${sort}`,
    //         data: {
    //             sort: sort,
    //             page: Page
    //         }
    //     })
    //         .then((res) => {
    //             setCategories((prevCategories) => [...prevCategories, ...res.data]);
    //             console.log("Axios 요청");
    //             console.log(categories)
    //             setScrollEnd(false)

    //             // if (res.data.length < 20) {
    //             //     setIsListEnd(true)
    //             // }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    // 정렬
    const best = async () => {
        setSort("best")
        setPage(2)
        // setCategories([])
        // setIsListEnd(false)
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/list/${number}?sort=best`,
            data: {
                sort: "best",
                page: 1
            }

        })
        setCategories(res.data);
        console.log('sort running');
        console.log(res.data)
    }

    const high = async () => {
        setSort("high")
        setPage(2)
        // setCategories([])
        // setIsListEnd(false)
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/list/${number}?sort=high`,
            data: {
                sort: "high",
                page: 1
            }
        })
        setCategories(res.data);
        console.log('sort running');
        console.log(res.data)
    }

    const low = async () => {
        setSort("low")
        setPage(2)
        // setCategories([])
        // setIsListEnd(false)
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/list/${number}?sort=low`,
            data: {
                sort: "low",
                page: 1
            }
        })
        setCategories(res.data);
        console.log('sort running');
        console.log(res.data)
    }


    // 상품 페이지로 이동
    const moveProduct = (id: number) => {
        window.location.href = `/product/${id}`
    }

    useEffect(() => {
        console.log("실행")
        setCategoriesTemp(categories);
    }, [categories])

    let title: string;
    switch (number) {
        case "10555":
            title = 'Bathroom Products';
            break;
        case "700417":
            title = "Kitchen"
            break;
        case "bm003":
            title = "Beds & Mattresses";
            break;
        case "fu002":
            title = 'Chairs';
            break;
        case "fu004":
            title = 'Tables & Desks';
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
            title = 'Living Room';
            break;
        case "st002":
            title = 'Cabinets';
            break;
        default:
            title = 'Category';
    }

    return (
        <>
            <div className={styles.top}></div>
            {isLoading ? <></> : <Loading />}
            <div ref={divRef} className={styles.bodys}>
                <div className={styles.container1}>
                    <div className={styles.categoryInfo}>

                        <div className={styles.title}>{title}</div>

                        <div className={styles.sort}>
                            <span className={sort === 'best' ? styles.selectedSort : ''} onClick={best}>인기순</span>
                            <span>|</span>
                            <span className={sort === 'low' ? styles.selectedSort : ''} onClick={low}>낮은 가격순</span>
                            <span>|</span>
                            <span className={sort === 'high' ? styles.selectedSort : ''} onClick={high}>높은 가격순</span>
                        </div>

                    </div>
                    <div className={styles.container2}>
                        {categoriesTemp.map((product, index) => {

                            // 가격에 , 추가
                            const commaPrice = product.goods_id.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            const productImgHover = product.imgHover || false;

                            return (

                                <div key={index}
                                    className={styles.productContainer}
                                    onClick={() => moveProduct(product.goods_id.id)}
                                >

                                    <div className={`${styles.productImg} ${productImgHover ? styles.productImgHover : ''}`}>
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
                                            className={styles.listItemImg}
                                            src={productImgHover ? product.goods_id.arrange_image || product.goods_id.image : product.goods_id.image}
                                            alt={`${product.goods_id.name}`} />
                                    </div>

                                    <div className={styles.productTextHeader}>
                                        <span className={styles.category}>{product.goods_id.type_name}</span>
                                    </div>

                                    <div className={styles.productTextTop}>
                                        <span className={styles.productName}>{product.goods_id.name}</span>

                                    </div>

                                    <div className={styles.productTextBot}>
                                        {product.goods_id.discount ?
                                            <span className={styles.sale}>sale</span>
                                            :
                                            <></>
                                        }
                                        <span className={styles.price}>{commaPrice}원</span>
                                    </div>
                                    {/* <hr className={styles.listHr} /> */}

                                </div>
                            )
                        })}

                    </div>
                </div>
                {/* {isListEnd &&
                        <div className={styles.listEndDiv}>
                            <div className={styles.listEndText}>End</div>
                        </div>
                    }
                    {!isListEnd &&
                        <div className={styles.listMoreDiv}>
                            <div onClick={moreList} className={styles.listMoreText}>More ▼ㅤ</div>
                        </div>
                    } */}
            </div >
        </>
    )
}
