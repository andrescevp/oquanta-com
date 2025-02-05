import React, { Suspense } from 'react';
import { Instagram } from 'lucide-react';
import { t } from './translations.ts';
import WhatsAppButton from "./WhatsAppButton.tsx";
import { Outlet } from 'react-router-dom'
import headerImage from './../images/branding_quanta_v2-24.jpg?w=250&format=png';
import LazyLoad from 'react-lazy-load';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#FFF9F5] snap-y">
            <header className="bg-pure-white shadow-sm fixed w-full z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center h-32">
                    <div className="flex flex-col items-start">
                        <a href="/">
                            <LazyLoad width="250px">
                                <img src={headerImage} alt="oQuanta"
                                    className="w-full h-full object-cover rounded-lg" />
                            </LazyLoad>
                        </a>                                                            
                    </div>                    
                    <nav className="flex gap-4 items-center">
                        <a href="/contact"
                            className="bg-pumpkin-orange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pumpkin-orange-60">
                            {t('navbar.contact')}
                        </a>
                        <a href="https://instagram.com/oquanta_es" className="text-black p-2 hover:text-pumpkin-orange"
                            target="_blank">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </nav>
                </div>
            </header>
            <main className="pt-32">
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
            <footer className="bg-white py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="text-2xl font-bold text-pumpkin-orange">oQuanta.</div>
                        <div className="text-xs text-black-60 uppercase tracking-wider">{t('tagline')}</div>
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-black mb-4">{t('contact')}</h3>
                        <div className="text-black-60 space-y-2">
                            <p>{t('location')}</p>
                            <p><a href={encodeURI(`mailto:${t('email')}`)} target='blank'>{t('email')}</a></p>
                            <p><a href={encodeURI(`tel:${t('phone')}`)} target='blank'>{t('phone')}</a></p>
                        </div>
                    </div>
                </div>
            </footer>
            <WhatsAppButton phoneNumber="34669202916" message="Hola, me gustaría saber más sobre oQuanta."  />
            
        </div>
    );
}

export default Layout;