import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import type { Page } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import Banner from './Banner';

const Logo = () => (
    <div className="flex items-center">
      <img src={`${process.env.CDN_BASE_URL}/1758818477.webp`} alt="Pin Addict Logo" className="h-20 w-auto" />
    </div>
  );

interface HeaderProps {
    navigateTo: (page: Page) => void;
    currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage }) => {
  const { itemCount } = useCart();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 500) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (page: Page) => 
    `cursor-pointer text-sm font-semibold transition-colors duration-300 ${
      currentPage === page ? 'text-[#f06aa7]' : 'text-white hover:text-[#f06aa7]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#43d3b0] shadow-lg">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        <div onClick={() => navigateTo('home')} className="cursor-pointer shadow-sm">
          <Logo />
        </div>
        <div className="flex items-center space-x-8">
          <a onClick={() => navigateTo('home')} className={navLinkClasses('home')}>HOME</a>
          <a onClick={() => navigateTo('contact')} className={navLinkClasses('contact')}>CONTATTI</a>
          <a onClick={() => navigateTo('cart')} className={`${navLinkClasses('cart')} relative`}>
            <ShoppingCartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </a>
        </div>
      </nav>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showBanner ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
      <a href="#buy" onClick={(e) => { e.preventDefault(); navigateTo('home'); setTimeout(() => { document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}><Banner /></a>
      </div>
    </header>
  );
};

export default Header;