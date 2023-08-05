"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageSlider.module.css';
import Image from 'next/image'

interface Banner {
  name: string;
  photo: string;
}

interface ImageSliderProps {
  banners: Banner[];
}

const ImageSlider: React.FC<ImageSliderProps>  = ({ banners }) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextCard();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentCard]);

  const handlePrevCard = () => {
    setCurrentCard((prevCard) => (prevCard === 0 ? banners.length - 1 : prevCard - 1));
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard === banners.length - 1 ? 0 : prevCard + 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = event.touches[0].clientX;
  
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'none';
      const touchDistance = touchEndRef.current - touchStartRef.current;
      const halfwayTranslate = -(currentCard * 100) + touchDistance / 2;
      sliderRef.current.style.transform = `translateX(${halfwayTranslate}%)`;
    }
  };  

  const handleTouchEnd = () => {
    const touchDistance = touchEndRef.current - touchStartRef.current;
    if (touchDistance < -50) {
      handleNextCard();
    } else if (touchDistance > 50) {
      handlePrevCard();
    }
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.3s ease';
      sliderRef.current.style.transform = `translateX(-${currentCard * 100}%)`;
    }
  }, [currentCard]);

  return (
    <div className={styles['banner-card']} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className={styles['banner-slider']} ref={sliderRef}>
      {banners.map((banner, index) => (
          <div key={index} className={styles['banner-image']}>
           <Image src={banner.photo} alt={banner.name} className={styles['responsive-image']} height='1080' width='1080'/>
          </div>
        ))}
      </div>
      <div className={styles['dot-navigation']}>
      {banners.map((_, index) => (
          <span
            key={index}
            className={`${styles['dot']} ${index === currentCard ? styles['active'] : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
