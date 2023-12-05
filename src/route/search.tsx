import React, { useState, useEffect, useRef } from "react"

import axios from "axios";

import styles from "../css/search.module.css";

import '@fortawesome/fontawesome-svg-core/styles.css'
import Loading from "../item/Loading";

export default function Search() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [search, setSearch] = useState<any[]>([]);
    // const [searchName, setSearchName] = useState<String | null>("");

    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [divHeight, setDivHeight] = useState<number>(0);

    const [scrollEnd, setScrollEnd] = useState<boolean>(false)

    const [Page, setPage] = useState<number>(2)

    const [isListEnd, setIsListEnd] = useState<boolean>(false)

    const [sort, setSort] = useState<String>("best")
    const [selectedSort, setSelectedSort] = useState<String>("best")

    const [colors, setColors] = useState<String>("")
    const [selectedColor, setSelectedColor] = useState<string>("")

    const params = new URLSearchParams(location.search);
    const searchName = params.get("q");


    useEffect(() => {

        const searchData = async () => {
            try {

                const res = await axios({
                    method: "post",
                    url: `http://localhost:8000/search?q=${searchName}&sort=${sort}&color=${colors}`,
                    data: {
                        page: 1,
                        sort: sort,
                        searchName

                    }
                });
                console.log('useEffect running')
                setSearch([])
                setSearch(res.data);
                console.log(res.data)
                setDivHeight(bodyHeight ? - 700 : 0)

                console.log("현재 스크롤 위치 ", scrollPosition)
                console.log("divHeight", divHeight)
                setIsLoading(true)
            } catch (error) {
                console.log(error);
            }

        };

        searchData();

    }, [sort, colors]);


    //무한스크롤

    const onScroll = () => {
        setScrollPosition(window.scrollY);
    }
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
            setDivHeight(bodyHeight ? bodyHeight - 500 : 0)
        }
    }, [bodyHeight, search]);

    // 현재 스크롤 위치 scrollPosition이 height - 700 정도 되면 setScrollEnd(true)
    useEffect(() => {
        // scrollPosition이 divHeight보다 큰 경우에만 axios 요청
        if (divHeight - 500 < scrollPosition && scrollPosition < divHeight + 55 && divHeight !== null && divHeight > 0) {
            console.log("현재 스크롤 위치 ", scrollPosition)
            console.log("divHeight", divHeight)

            console.log("scrollend true")
            setScrollEnd(true)
        }
    }, [scrollPosition]);

    // setScrollEnd(true) 면 다음페이지 20개 불러오고 다시 setScrollEnd(false) 
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (scrollEnd === true) {
                    setPage(Page + 1);
                    console.log("현재 페이지", Page);

                    const response = await axios.post(`http://localhost:8000/search?q=${searchName}&sort=${sort}&color=${colors}`, {
                        sort: sort,
                        page: Page,
                        searchName: "의자"
                    });

                    setSearch((prevSearch) => [...prevSearch, ...response.data]);
                    setScrollPosition(divHeight - 1000)
                    setDivHeight(scrollPosition + 3000)
                    console.log("Axios 요청");
                    console.log(search);
                    console.log("scrollend false");
                    setScrollEnd(false);

                    console.log("현재 스크롤 위치 ", scrollPosition);
                    console.log("divHeight", divHeight);

                    if (response.data.length < 20) {
                        setIsListEnd(true);
                    }
                } else {
                    setScrollEnd(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [scrollEnd]);

    // 정렬
    const best = () => { setSelectedSort("best"), setSort("best") }
    const high = () => { setSelectedSort("high"), setSort("high") }
    const low = () => { setSelectedSort("low"), setSort("low") }

    // 색정렬
    const noColor = () => { setSelectedColor(""), setColors("") }
    const red = () => { setSelectedColor("red"), setColors("레드") }
    const green = () => { setSelectedColor("green"), setColors("그린") }
    const blue = () => { setSelectedColor("blue"), setColors("블루") }
    const black = () => { setSelectedColor("black"), setColors("블랙") }
    const gray = () => { setSelectedColor("gray"), setColors("그레이") }
    const white = () => { setSelectedColor("white"), setColors("화이트") }
    const brown = () => { setSelectedColor("brown"), setColors("브라운") }

    //리스트 더 가져오기
    const moreList = () => {
        setPage(Page + 1)
        console.log("현재 페이지", Page)
        axios({
            method: "post",
            url: `http://localhost:8000/search?q=${searchName}&sort=${sort}&color=${colors}`,
            data: {
                sort: sort,
                page: Page,
                searchName
            }
        })
            .then((res) => {
                setSearch((prevSearch) => [...prevSearch, ...res.data]);
                console.log("Axios 요청");
                console.log(search)
                console.log("scrollend false")
                setScrollEnd(false)

                console.log("현재 스크롤 위치 ", scrollPosition)
                console.log("divHeight", divHeight)

                if (res.data.length < 20) {

                    setIsListEnd(true)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // 상품 페이지로 이동
    const moveProduct = (id: number) => {
        window.location.href = `http://localhost:3000/product/${id}`
    }

    if (isLoading) {
        return (
            <>
                <div className={styles.top}></div>
                <div ref={divRef} className={styles.bodys}>
                    <div className={styles.container1}>


                        <div className={styles.searchAndResult}>
                            <h1>"{searchName}" 에 대한 검색결과</h1>
                            {/* <span className={styles.result}>result 몇개 </span> */}
                        </div>

                        <hr className={styles.titleHr} />

                        <div style={{ marginLeft: 20 }}>
                            <div className={styles.colorContainer}>
                                <span className={styles.colorText}>색상</span>

                                <div className={selectedColor === "red" ? styles.selectedColorRed : styles.colorBoxRed} onClick={red} ></div>
                                <div className={selectedColor === "green" ? styles.selectedColorGreen : styles.colorBoxGreen} onClick={green} ></div>
                                <div className={selectedColor === "blue" ? styles.selectedColorBlue : styles.colorBoxBlue} onClick={blue}></div>
                                <div className={selectedColor === "black" ? styles.selectedColorBlack : styles.colorBoxBlack} onClick={black} ></div>
                                <div className={selectedColor === "gray" ? styles.selectedColorGray : styles.colorBoxGray} onClick={gray}></div>
                                <div className={selectedColor === "white" ? styles.selectedColorWhite : styles.colorBoxWhite} onClick={white}></div>
                                <div className={selectedColor === "brown" ? styles.selectedColorBrown : styles.colorBoxBrown} onClick={brown} style={{ width: 35, height: 35, backgroundColor: "brown" }}></div>
                                <div className={styles.resetColor} onClick={noColor}>↻</div>


                            </div>


                            <div className={styles.sort}>
                                <span className={selectedSort === 'best' ? styles.selectedSort : ''} onClick={best}>인기상품순   </span>
                                <span>|</span>
                                <span className={selectedSort === 'low' ? styles.selectedSort : ''} onClick={low}>   낮은 가격순   </span>
                                <span>|</span>
                                <span className={selectedSort === 'high' ? styles.selectedSort : ''} onClick={high}>   높은 가격순</span>
                            </div>

                        </div>
                    </div>
                    <div className={styles.container2}>
                        {search.map((product, index) => {
                            // 가격에 , 추가
                            const commaPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            const productImgHover = product.imgHover || false;

                            return (
                                <div key={index} className={styles.productContainer} onClick={() => moveProduct(product.id)}>

                                    <div className={`${styles.productImg} ${productImgHover ? styles.productImgHover : ''}`}>
                                        <img loading="lazy"
                                            id="img"

                                            onMouseOver={() => {
                                                setSearch((prevSearch) =>
                                                    prevSearch.map((prevProduct, idx) =>
                                                        idx === index ? { ...prevProduct, imgHover: true } : prevProduct
                                                    )
                                                );
                                            }}

                                            onMouseOut={() => {
                                                setSearch((prevSearch) =>
                                                    prevSearch.map((prevProduct, idx) =>
                                                        idx === index ? { ...prevProduct, imgHover: false } : prevProduct
                                                    )
                                                );
                                            }}

                                            src={productImgHover ? product.arrange_image || product.image : product.image}
                                            style={{ width: 280, height: 280, borderRadius: 8 }}
                                            alt={`${product.name}`} />
                                    </div>

                                    <div className={styles.productTextHeader}>
                                        <span className={styles.category}>{product.type_name}</span>
                                    </div>

                                    <div className={styles.productTextTop}>
                                        <span className={styles.productName}>{product.name}</span>

                                    </div>

                                    <div className={styles.productTextBot}>
                                        <span className={styles.sale}>{product.discount ? `sale` : " "}</span>
                                        <span className={styles.price}>{commaPrice}원</span>
                                    </div>
                                    <hr className={styles.hr} />

                                </div>
                            )

                        })}

                    </div>
                    {isListEnd &&
                        <div className={styles.listEndDiv}>
                            <div className={styles.listEndText}>ㅤEndㅤ</div>
                        </div>
                    }
                    {!isListEnd &&
                        <div className={styles.listMoreDiv}>
                            <div onClick={moreList} className={styles.listMoreText}>ㅤMore ▼ㅤ</div>
                        </div>
                    }
                </div>


            </>
        )
    } else {
        return (
            <>
                <div className={styles.top}></div>
                <div ref={divRef} className={styles.bodys}>
                    <div className={styles.container1}>


                        <div className={styles.searchAndResult}>
                            <h1>"{searchName}" 에 대한 검색결과</h1>
                            {/* <span className={styles.result}>result 몇개 </span> */}
                        </div>

                        <hr className={styles.titleHr} />

                        <div style={{ marginLeft: 20 }}>
                            <div className={styles.colorContainer}>
                                <span className={styles.colorText}>색상</span>

                                <div className={selectedColor === "red" ? styles.selectedColorRed : styles.colorBoxRed} onClick={red} ></div>
                                <div className={selectedColor === "green" ? styles.selectedColorGreen : styles.colorBoxGreen} onClick={green} ></div>
                                <div className={selectedColor === "blue" ? styles.selectedColorBlue : styles.colorBoxBlue} onClick={blue}></div>
                                <div className={selectedColor === "black" ? styles.selectedColorBlack : styles.colorBoxBlack} onClick={black} ></div>
                                <div className={selectedColor === "gray" ? styles.selectedColorGray : styles.colorBoxGray} onClick={gray}></div>
                                <div className={selectedColor === "white" ? styles.selectedColorWhite : styles.colorBoxWhite} onClick={white}></div>
                                <div className={selectedColor === "brown" ? styles.selectedColorBrown : styles.colorBoxBrown} onClick={brown} style={{ width: 35, height: 35, backgroundColor: "brown" }}></div>
                                <div className={styles.resetColor} onClick={noColor}>↻</div>


                            </div>


                            <div className={styles.sort}>
                                <span className={selectedSort === 'best' ? styles.selectedSort : ''} onClick={best}>인기상품순   </span>
                                <span>|</span>
                                <span className={selectedSort === 'low' ? styles.selectedSort : ''} onClick={low}>   낮은 가격순   </span>
                                <span>|</span>
                                <span className={selectedSort === 'high' ? styles.selectedSort : ''} onClick={high}>   높은 가격순</span>
                            </div>

                        </div>
                    </div>
                </div>
                <Loading />
            </>
        )
    }

}