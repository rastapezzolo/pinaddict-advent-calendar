
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission (e.g., send to an API)
        console.log({ name, email, message });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white py-24">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-teal-600 mb-4">Grazie!</h1>
                    <p className="text-lg text-gray-700">Il tuo messaggio è stato inviato. Ti risponderemo il prima possibile.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
                    <h1 className="text-4xl font-bold text-center text-teal-600 mb-2">Contattaci</h1>
                    <p className="text-center text-gray-600 mb-8">Hai domande? Compila il form qui sotto!</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Messaggio</label>
                            <textarea
                                id="message"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            ></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-pink-500 hover:bg-[#f06aa7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors">
                                Invia Messaggio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
