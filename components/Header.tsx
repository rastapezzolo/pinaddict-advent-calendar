import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import Banner from './Banner';

const Logo = () => (
    <div className="flex items-center">
      <img src={`${process.env.CDN_BASE_URL}/1758818477.webp`} alt="Pin Addict Logo" className="h-20 w-auto" />
    </div>
  );

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

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

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `cursor-pointer text-sm font-semibold transition-colors duration-300 ${
      isActive ? 'text-[#f06aa7]' : 'text-white hover:text-[#f06aa7]'
    }`;

  const handleBannerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#43d3b0] shadow-lg">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link to="/" className="cursor-pointer shadow-sm">
          <Logo />
        </Link>
        <div className="flex items-center space-x-8">
          <NavLink to="/" className={navLinkClasses}>HOME</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>CONTATTI</NavLink>
          <NavLink to="/cart" className={({ isActive }) => `${navLinkClasses({ isActive })} relative`}>
            <ShoppingCartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showBanner ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <a href="#buy" onClick={handleBannerClick}><Banner /></a>
      </div>
    </header>
  );
};

export default Header;