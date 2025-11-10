import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import type { CartItem } from '../../types';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';


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
  const { cartTotal, clearCart } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order processing
    console.log("Processing order...");
    setIsOrderComplete(true);
    clearCart();
  };

  if (isOrderComplete) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold">Grazie per il tuo ordine!</h3>
        <p className="mt-2">Abbiamo ricevuto il tuo ordine e lo stiamo preparando per la spedizione. Riceverai una conferma via email a breve.</p>
      </div>
    );
  }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Indirizzo di Spedizione</label>
                <input type="text" placeholder="Via, numero civico" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <input type="text" placeholder="Città" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    <input type="text" placeholder="Provincia" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    <input type="text" placeholder="CAP" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Dati di Pagamento</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm text-gray-600">Questo è un checkout fittizio. Non inserire dati reali.</p>
                    <input type="text" placeholder="Numero Carta" required className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                     <div className="grid grid-cols-2 gap-4 mt-2">
                        <input type="text" placeholder="MM/AA" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                        <input type="text" placeholder="CVC" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                </div>
            </div>
            <button type="submit" className="w-full bg-[#f06aa7] text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-[#f06aa7] transition-all duration-300 shadow-lg">
                Paga Ora {cartTotal.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
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