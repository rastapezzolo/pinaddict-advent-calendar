import React from 'react';
import { useCart } from "@/contexts/CartContext";
import { Page, Product } from "@/types";
import ImageCarousel from '../ImageCarousel';

export const product: Product = {
  id: 1,
  name: "Calendario dell'Avvento Pin Addict",
  price: 49.99,
  description: "All'interno troverai 24 scatoline, ognuna contenente una spilla in metallo a sorpresa a tema cultura pop: serie TV, film, cartoni animati, e videogiochi. Un regalo perfetto per attendere il Natale con stile!",
  features: [
    '24 Giorni di Gioia',
    'Design Esclusivi',
    'Icone Pop Culture',
    'Qualità Premium',
  ]
};

export const ProductSection: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
    const { addToCart } = useCart();

    const images = [
      `${process.env.CDN_BASE_URL}/5805271895895641063.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641080.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641078.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641074.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641076.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641077.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641072.jpg`,
      `${process.env.CDN_BASE_URL}/5805271895895641065.jpg`,
        // Aggiungi qui altre immagini se necessario
    ];

    const handleAddToCart = () => {
        addToCart(product);
        navigateTo('cart');
    };

    return (
        <section id="buy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* <div className="">
                        <img src={product.imageUrl} alt="Calendario dell'avvento Pin Addict con spille a tema pop" className="rounded-lg shadow-2xl w-full" />
                    </div> */}
                    <div className="w-full text-center">
                        <h2 className="text-4xl font-bold text-teal-600 mb-8">Cosa trovi all'interno?</h2>
                        <div className="my-6">
                          <ImageCarousel images={images} />
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                        <p className="text-3xl font-light text-pink-500 my-4 bold">{product.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                        <button onClick={handleAddToCart} className="w-full md:w-auto bg-pink-500 text-white font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider hover:bg-[#f06aa7] transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Acquista Subito
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
