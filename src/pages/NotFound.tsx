import React from 'react';
import { Link } from 'react-router-dom';
import { useHead } from '../context/HeadContext';

const NotFound: React.FC = () => {
    const { updateHead } = useHead();

    React.useEffect(() => {
        updateHead({
            title: 'Página no encontrada - oQuanta',
            description: 'Lo sentimos, la página que buscas no existe.',
            canonicalLink: 'https://www.oquanta.com/404'
        });
    }, []);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-2xl text-center">
                <h1 className="text-9xl font-bold text-pumpkin-orange mb-4">
                    404
                </h1>
                <h2 className="text-4xl font-bold text-iris-purple mb-8">
                    Página no encontrada
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <Link 
                    to="/"
                    className="inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors"
                >
                    Volver al inicio
                </Link>
            </div>
        </section>
    );
};

export default NotFound;