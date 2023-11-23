import homeStyles from '../css/home.module.css';; 
import { useState, useEffect, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type SlideImage = string[];

const createCyclicArray = (arr: any[], times: number) => {
    return Array.from({ length: times }, () => [...arr]).flat();
};

export default function Home() {
    const initialSlides = [
        'assets/slide1.jpg',
        'assets/slide2.jpg',
        'assets/slide3.jpg',
        'assets/slide4.jpg',
        'assets/slide5.jpg',
        'assets/slide6.jpg',
    ];

    const [slideImg, setSlideImg] = useState<SlideImage>(createCyclicArray(initialSlides, 10));
    const [slideCount, setSlideCount] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideCount((prevCount) => (prevCount + 1) % slideImg.length);
            setSlideImg((prevSlides) => {
                return prevSlides;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [slideCount, slideImg]);

    const handlePrev = () => {
        setSlideCount((prevCount) => (prevCount - 1 + slideImg.length) % slideImg.length);
    };

    const handleNext = () => {
        setSlideCount((nextCount) => (nextCount + 1) % slideImg.length);
    };

    const slideStyle: CSSProperties = {
        transform: `translate(-${slideCount * 100}%, 0px)`,
    };

    const initialFurniture = [
        'assets/furniture1.jpg',
        'assets/furniture2.jpg',
        'assets/furniture3.jpg',
        'assets/furniture4.jpg',
        'assets/furniture5.jpg',
        'assets/furniture6.jpg',
    ]

    const [furImg, setFurImg] = useState<SlideImage>(createCyclicArray(initialFurniture, 10));
    const [furCount, setFurCount] = useState<number>(0);

    useEffect(() => {
        const intervalFur = setInterval(() => {
            setFurCount((prevCount) => (prevCount + 1) % furImg.length);
            setFurImg((prevSlides) => {
                const newSlides = [...prevSlides];
                return newSlides;
            });
        }, 2000);
    
        return () => clearInterval(intervalFur);
    }, [furCount, furImg]);

    const furStyle: CSSProperties = {
        transform: `translate(-${furCount * 100}%, 0px)`,
    };

    return (
        <div className={homeStyles.main}>
            <section className={homeStyles.mainSwiper}>
                <div className={homeStyles.slide} style={slideStyle}>
                    <div className={homeStyles.slideBox}>
                        {slideImg.map((value, index) => (
                            <img className={homeStyles.slideBoxImg} key={index} src={value} alt={`slide${index}`} />
                        ))}
                    </div>
                </div>    
                <div className={homeStyles.slideBtnBox}>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className={homeStyles.slideLeftBtn}
                        onClick={handlePrev}
                    />
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={homeStyles.slideRightBtn}
                        onClick={handleNext}
                    />
                </div>
            </section>
            <section className={homeStyles.mainBrand}>
                <div className={homeStyles.brandStory}>
                    <div className={homeStyles.brandText}>
                        <h5>demurely, modest, meek</h5>
                        <h3>Demure</h3>
                        <p>"우리는 Demure(고요한) 이름처럼, 고요하면서도 아름다운 공간을 만들기 위해 노력합니다.<br/>디뮤어에서 당신만의 고유한 공간을 만들어보세요"</p> 
                    </div>
                    <div className={homeStyles.brandSlide} style={furStyle}>
                        <div className={homeStyles.brandSlideBox}>
                            {furImg.map((value, index) => (
                                <img className={homeStyles.brandSlideImg} key={index} src={value} alt={`furniture${index}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className={homeStyles.mainMouse}>

            </section>
        </div>  
    )
}