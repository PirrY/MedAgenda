import React from 'react';
import imagen1 from '../../img/imgMedicos.jpg';
import imagen2 from '../../img/Slider2.png';

const Carousel = () => {
    return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={imagen1} className="d-block w-100" alt="Primera Imagen" />
            </div>
            <div className="carousel-item">
                <img src={imagen2} className="d-block w-100" alt="Segunda Imagen" />
            </div>
            <div className="carousel-item">
                <img src={imagen1} className="d-block w-100" alt="Tercera Imagen" />
            </div>
        </div>
    </div>
    );
};

export default Carousel;
