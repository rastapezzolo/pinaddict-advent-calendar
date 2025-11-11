import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import type { CartItem } from '../../types';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe - replace with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');


const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 rounded-md object-cover" />
                <div>
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-gray-500 hover:bg-gray-100"><MinusIcon /></button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 text-gray-500 hover:bg-gray-100"><PlusIcon /></button>
                </div>
                <p className="font-bold w-24 text-right">{(item.product.price * item.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors"><TrashIcon /></button>
            </div>
        </div>
    );
};

const Cart: React.FC = () => {
    const { cartItems, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold mb-2">Il tuo carrello è vuoto.</h2>
                <p className="text-gray-600">Aggiungi il nostro fantastico calendario per iniziare!</p>
            </div>
        );
    }
    
    return (
        <div>
            {cartItems.map(item => <CartItemRow key={item.product.id} item={item} />)}
            <div className="mt-6 text-right">
                <p className="text-lg">Subtotale: <span className="font-bold">{cartTotal.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</span></p>
                <p className="text-sm text-gray-500">Spedizione e tasse calcolate al checkout.</p>
            </div>
        </div>
    );
};

const CheckoutForm: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe non è stato caricato correttamente');
      }

      // Call Lambda to create checkout session
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          customerEmail: email,
          shippingAddress: {
            street,
            city,
            province,
            postalCode,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante la creazione della sessione di pagamento');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('URL di checkout non ricevuto');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Errore durante il checkout. Riprova.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Indirizzo di Spedizione</label>
        <input
          type="text"
          placeholder="Via, numero civico"
          required
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <input
            type="text"
            placeholder="Città"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="Provincia"
            required
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="CAP"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-sm text-blue-700">
          ℹ️ Verrai reindirizzato a Stripe per completare il pagamento in modo sicuro
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f06aa7] text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-[#d85a8f] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Caricamento...
          </span>
        ) : (
          `Procedi al Pagamento ${cartTotal.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}`
        )}
      </button>
    </form>
  );
};

const CartPage: React.FC = () => {
    const { cartItems } = useCart();
    
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center text-teal-600 mb-10">Carrello e Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6">Riepilogo Ordine</h2>
                        <Cart />
                    </div>
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6">Informazioni</h2>
                        {cartItems.length > 0 ? <CheckoutForm /> : <p className="text-gray-500">Aggiungi prodotti al carrello per procedere con il checkout.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;