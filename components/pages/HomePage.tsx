import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Timer from '../Timer';
import FeaturesSection from '../FeaturesSection';
import { product, ProductSection } from './ProductSection';
import SurpriseSection from './SurpriseSection';
import FAQSection from './FaqSection';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const HeroSection: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'EUR',
          value: product.price,
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: 1
          }]
        }
      });

    navigate('/cart');
  };

  const videoSrc = [
    `${process.env.CDN_BASE_URL}/videos/pinaddict-hero.mp4`,
  ];

  const playerRef = React.useRef<HTMLVideoElement>(null);

  const preloadVideos = () => {
    videoSrc.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  React.useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    preloadVideos();
    let currentVideoIndex = 0;
    const handleEnded = () => {
      currentVideoIndex = (currentVideoIndex + 1) % videoSrc.length;
      player.src = videoSrc[currentVideoIndex];
      player.play();
    };

    player.addEventListener('ended', handleEnded);
    
    return () => {
      player.removeEventListener('ended', handleEnded);
    };
  }, [videoSrc]);

  return (
    <div className="relative h-screen bg-[#43d3b0]/40 bg-center flex items-center justify-center px-4 md:px-4">
      <div className="show md:hidden absolute inset-0 bg-black opacity-30 z-20"></div>
      <div className=" text-center grid gap-4 md:grid-cols-2">
        <div className="__left content-center px-4 relative z-30 w-full">
          <div className="__timer mb-6 flex justify-center">
            <Timer />
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider drop-shadow-lg text-[#f06aa7]">L'Attesa non è Mai Stata Così Pop</h1>
          <p className="mt-4 text-l md:text-xl font-light max-w-2xl mx-auto drop-shadow-md text-white md:text-teal-600 mb-2">
            Regala un'esplosione di cultura pop ai tuoi cari.
            <br />L'unico Calendario dell'avvento artigianale contenente una spilla a sorpresa ogni giorno fino a Natale! <br /><br /><br /> 24 spille esclusive dalle tue serie TV, film, cartoni animati e fumetti preferiti.
          </p>
          <button onClick={handleAddToCart} className="w-full max-w-sm md:w-auto bg-pink-500 text-white font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider hover:bg-[#f06aa7] transform hover:scale-105 transition-all duration-300 shadow-lg my-4">
            Acquista Subito
          </button>
        </div>
        <div className="__right absolute md:static top-0 right-0 w-full h-full md:h-auto md:w-auto flex items-center justify-center md_px-4 bg-black/30">
          <video
            className="w-full h-full md:h-auto max-h-screen object-cover"
            src={`${process.env.CDN_BASE_URL}/videos/pinaddict-hero.mp4`}
            autoPlay
            loop
            muted
            playsInline
            ref={playerRef}
          />
        </div>
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ProductSection />
      <SurpriseSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;