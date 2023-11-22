import homeStyles from '../css/home.module.css';; 
import { useState, useEffect, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type SlideImage = string[];

export default function Home() {
    const [slideImg, setSlideImg] = useState<SlideImage>([]);
    const [slideCount, setSlideCount] = useState<number>(0);

    useEffect(() => {
        const slide1 = 'assets/slide1.jpg';
        const slide2 = 'assets/slide2.jpg';
        const slide3 = 'assets/slide3.jpg';
        const slide4 = 'assets/slide4.jpg';
        const slide5 = 'assets/slide5.jpg';
        const slide6 = 'assets/slide6.jpg';

        setSlideImg([slide1, slide2, slide3, slide4, slide5, slide6, slide5, slide4, slide3, slide2, slide1]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setSlideCount((prevCount) => (prevCount + 1) % slideImg.length);
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

    return (
        <div className={homeStyles.main}>
            <section className={homeStyles.mainSwiper}>
                <div className={homeStyles.slide} style={slideStyle}>
                    <div className={homeStyles.slideBox}>
                        {slideImg.map((value, index) => (
                            <img className={homeStyles.slideBoxImg} key={index} src={value} alt={`slide${index}`} />
                        ))}
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
                </div>
            </section>
            <section className={homeStyles.mainBrand}>

            </section>
            <section className={homeStyles.mainMouse}>

            </section>
        </div>  
    )
}
