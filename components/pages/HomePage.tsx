import React from 'react';
import type { Page, Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Timer from '../Timer';
import FeaturesSection from '../FeaturesSection';
import { product, ProductSection } from './ProductSection';
import SurpriseSection from './SurpriseSection';
import Banner from '../Banner';
import FAQSection from './FaqSection';



const HeroSection: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(product);
    navigateTo('cart');
  };

  const videoSrc = [
    // `${process.env.CDN_BASE_URL}/videos/10.mp4`,
    `${process.env.CDN_BASE_URL}/videos/pinaddict-hero.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/06.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/07.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/02.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/04.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/05.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/03.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/01.mp4`,
    // `${process.env.CDN_BASE_URL}/videos/08.mp4`,
  ]

  // play first video then loop through others whe finishing ended
  const playerRef = React.useRef<HTMLVideoElement>(null);

  // preload all the videos fetching them in advance
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

    player.addEventListener('ended', () => {
      handleEnded();
    });
    //
      return () => {
      player.removeEventListener('ended', handleEnded);
    };
  }, [videoSrc]);

  return (
  <div className="relative h-screen bg-[#43d3b0]/40 bg-center flex items-center justify-center">
    <div className="show md:hidden absolute inset-0 bg-black opacity-30 z-20"></div>
    <div className=" text-center grid gap-4 md:grid-cols-2">
      <div className="__left content-center px-4 relative z-30 w-full">
        <div className="__timer mb-6 flex justify-center">
          <Timer></Timer>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider drop-shadow-lg text-[#f06aa7]">L'Attesa non è Mai Stata Così Pop</h1>
        <p className="mt-4 text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md text-white md:text-teal-600 mb-2">
          Regala un'esplosione di cultura pop ai tuoi cari.
          <br />L'unico Calendario dell'avvento artigianale contenente una spilla a sorpresa ogni giorno fino a Natale! <br /><br /><br /> 24 spille esclusive dalle tue serie TV, film, cartoni animati e fumetti preferiti.
        </p>
        <button onClick={handleAddToCart} className="w-full md:w-auto bg-pink-500 text-white font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider hover:bg-[#f06aa7] transform hover:scale-105 transition-all duration-300 shadow-lg my-4">
          Acquista Subito
        </button>
      </div>
      <div className="__right absolute md:static top-0 right-0 w-full h-full md:h-auto md:w-auto flex items-center justify-center md_px-4 bg-black/30">
        <video
          className="w-full h-full md:h-auto max-h-screen object-cover"
          // src={videoSrc[0]}
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



interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div>
      <HeroSection navigateTo={navigateTo}/>
      <FeaturesSection />
      <ProductSection navigateTo={navigateTo} />
      <SurpriseSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;