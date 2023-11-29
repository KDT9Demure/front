import React, { useState, useEffect, CSSProperties } from 'react';
import homeStyles from '../css/home.module.css';

type SlideImage = string[];

const Home: React.FC = () => {
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
            const nextSlideIndex = slideCount + 1 >= initialSlides.length ? 0 : slideCount + 1;
            setSlideImg((prevImages) => [...prevImages, initialSlides[nextSlideIndex]]);
            setSlideCount(nextSlideIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [slideCount]);

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
        'assets/furniture7.jpg',
        'assets/furniture8.jpg',
    ];

    const [furImg, setFurImg] = useState<SlideImage>(initialFurniture);
    const [furCount, setFurCount] = useState<number>(0);

    useEffect(() => {
        const intervalFur = setInterval(() => {
            const nextImageIndex = furCount + 1 >= initialFurniture.length ? 0 : furCount + 1;
            setFurImg((prevImages) => [...prevImages, initialFurniture[nextImageIndex]]);
            setFurCount(nextImageIndex);
        }, 2000);

        return () => clearInterval(intervalFur);
    }, [furCount]);

    const furStyle: CSSProperties = {
        transform: `translateX(-${furCount * (100 / initialFurniture.length)}%)`,
    };

    type EventImage = {
        path: string;
        title: string;
        description: string;
    };

    // 세번째 세션 애니메이션
    const images: EventImage[] = [
        { path: 'assets/event1.jpg', title: 'Event 1', description: 'Description 1' },
        { path: 'assets/event2.jpg', title: 'Event 2', description: 'Description 2' },
        { path: 'assets/event3.jpg', title: 'Event 3', description: 'Description 3' },
        { path: 'assets/event4.jpg', title: 'Event 4', description: 'Description 4' },
    ];

    interface AnimatedImage {
        id: number;
        image: EventImage | null;
        position: { x: number; y: number };
    };

    const [animatedImages, setAnimatedImages] = useState<AnimatedImage[]>([]);
    const [addingImage, setAddingImage] = useState(false);

    const handleMouseMove = (event: MouseEvent) => {
        if (!addingImage) {
            setAddingImage(true);
            setTimeout(() => {
                const newImage: EventImage = getRandomImage();
                const newPosition = { x: event.clientX, y: event.clientY };
                const newAnimatedImage: AnimatedImage = { id: Date.now(), image: newImage, position: newPosition };

                setAnimatedImages((prevImages) => {
                    return [...prevImages, newAnimatedImage];
                });

                setTimeout(() => {
                    // 지정된 시간이 지난 후 추가된 이미지를 제거
                    setAnimatedImages((prevImages) => {
                        return prevImages.filter((img) => img.id !== newAnimatedImage.id);
                    });
                }, 3000);

                setAddingImage(false)
            }, 150);

        }
    };

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        console.log(images[randomIndex]);
        return images[randomIndex];
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
            </section>
            <section className={homeStyles.mainBrand}>
                <div className={homeStyles.brandStory}>
                    <div className={homeStyles.brandText}>
                        <h5>demurely, modest, meek</h5>
                        <h3>Demure</h3>
                        <p>"우리는 Demure(고요한) 이름처럼, 고요하면서도 아름다운 공간을 만들기 위해 노력합니다.<br />디뮤어에서 당신만의 고유한 공간을 만들어보세요"</p>
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
            <section className={homeStyles.mainEvent} onMouseMove={(e:MouseEvent) => handleMouseMove(e)}>
                <div className={homeStyles.innerText}>
                    <h4>
                        <span className={homeStyles.bigText}>Create</span>
                        <br />
                        <span className={homeStyles.smallText}>your own special space</span>
                    </h4>
                </div>
                <div className={homeStyles.mouseEvent}>
                    {animatedImages.map((animatedImage) => (
                        <img
                            key={animatedImage.id}
                            className={homeStyles.randomImage}
                            src={animatedImage.image?.path}
                            alt="Random Image"
                            style={{
                                left: animatedImage.position.x,
                                top: animatedImage.position.y,
                                opacity: 1
                            }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
