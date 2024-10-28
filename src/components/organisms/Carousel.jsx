import React, { useState, useEffect } from 'react';
import imagen1 from '../../img/Slider1.png';
import imagen2 from '../../img/Slider2.png';
import imagen3 from '../../img/Slider3.png';
import imagen4 from '../../img/Slider4.jpg';
import imagen5 from '../../img/Slider5.jpg';
import imagen6 from '../../img/Slider6.png';
import './Carousel.css';

const Carousel = () => {
    const images = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
        }, 4000); // Cambia cada 4 segundos

        return () => clearInterval(interval);
    }, [currentIndex]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={image} alt={`Imagen ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
