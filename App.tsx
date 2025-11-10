
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import ContactPage from './components/pages/ContactPage';
import CartPage from './components/pages/CartPage';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import type { Page } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
