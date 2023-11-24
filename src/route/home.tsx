import homeStyles from '../css/home.module.css';; 
import { useState, useEffect, CSSProperties } from 'react';

type SlideImage = string[];

export default function Home() {
    const initialSlides = [
        'assets/slide1.jpg',
        'assets/slide2.jpg',
        'assets/slide3.jpg',
        'assets/slide4.jpg',
        'assets/slide5.jpg',
        'assets/slide6.jpg',
    ];

    const [slideImg, setSlideImg] = useState<SlideImage>(initialSlides);
    const [slideCount, setSlideCount] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlideIndex = slideImg.length % initialSlides.length;
            const nextSlide = initialSlides[nextSlideIndex];
            setSlideImg((prevImges) => [...prevImges,nextSlide]);

            setSlideCount((prevSlideCount) => (prevSlideCount + 1) % slideImg.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [slideCount, slideImg]);

    const slideStyle: CSSProperties = {
        transform: `translate(-${slideCount * 100}%, 0px)`
    };

    const initialFurniture = [
        'assets/furniture1.jpg',
        'assets/furniture2.jpg',
        'assets/furniture3.jpg',
        'assets/furniture4.jpg',
        'assets/furniture5.jpg',
        'assets/furniture6.jpg',
        'assets/furniture7.jpg',
        'assets/furniture8.jpg',
    ];
      
    const [furImg, setFurImg] = useState<SlideImage>(initialFurniture);
    const [furCount, setFurCount] = useState<number>(0);
      
    useEffect(() => {
        const intervalFur = setInterval(() => {
          const nextImageIndex = furImg.length % initialFurniture.length;
          const nextImage = initialFurniture[nextImageIndex];
          setFurImg((prevSlides) => [...prevSlides, nextImage]);
      
          setFurCount((prevCount) => (prevCount + 1) % furImg.length);
        }, 2000);
      
        return () => clearInterval(intervalFur);
    }, [furCount, furImg]);
      

    const furStyle: CSSProperties = {
        transform: `translateX(-${furCount * (100 / initialFurniture.length)}%)`
    };

    type EventImage = {
        path: string;
        title: string;
        description: string;
      }[];

      const images : EventImage = [
        { path: 'assets/event1.jpg', title: 'Event 1', description: 'Description 1' },
        { path: 'assets/event2.jpg', title: 'Event 2', description: 'Description 2' },
        { path: 'assets/event3.jpg', title: 'Event 3', description: 'Description 3' },
        { path: 'assets/event4.jpg', title: 'Event 4', description: 'Description 4' },
      ];
      
      const [image, setImage] = useState<string | null>(null);

      const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
      
      const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImagePath = images[randomIndex].path;
        console.log('Random Image Path:', randomImagePath);
        return randomImagePath;
      };

      useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setImage(getRandomImage());
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
          
        const handleMouseLeave = () => {
          setImage(null);
        };
          
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
          
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, []);
    
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
            <section className={homeStyles.mainEvent}>
                <div className={homeStyles.innerText}>
                    <h4>
                        <span className={homeStyles.bigText}>Create</span>
                        <br/>
                        <span className={homeStyles.smallText}>your own special space</span>
                    </h4>
                </div>
                <div className={homeStyles.mouseEvent}>
                    {image && (
                        <img
                        className={`${homeStyles.randomImage} ${homeStyles.randomImageHidden}`}
                        src={image}
                        alt="Random Image"
                        style={{
                            left: mousePosition.x,
                            top: mousePosition.y,
                        }}
                        />
                    )}
                </div>
            </section>
        </div>  
    )
}