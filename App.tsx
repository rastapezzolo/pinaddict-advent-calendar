
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import ContactPage from './components/pages/ContactPage';
import CartPage from './components/pages/CartPage';
import SuccessPage from './components/pages/SuccessPage';
import PrivacyPage from './components/pages/PrivacyPage';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { CartProvider } from './contexts/CartContext';
import type { Page } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Check for success redirect on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');

    if (success === 'true') {
      setCurrentPage('success');
    } else if (canceled === 'true') {
      setCurrentPage('cart');
    }
  }, []);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'success':
        return <SuccessPage navigateTo={navigateTo} />;
      case 'privacy':
        return <PrivacyPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <CartProvider>
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer navigateTo={navigateTo} />
        <CookieBanner navigateTo={navigateTo} />
      </div>
    </CartProvider>
  );
};

export default App;
