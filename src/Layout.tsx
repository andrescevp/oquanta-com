import React, { Suspense } from 'react';
import { Instagram } from 'lucide-react';
import { useTranslation } from "react-i18next";
import WhatsAppButton from "./components/WhatsAppButton.tsx";
import { Outlet } from 'react-router-dom'
import headerImage from './../images/oquanta-logo-transparent.png?h=80&format=png';
import LazyLoad from 'react-lazy-load';
import { Menu } from '@headlessui/react';
import { SquareMenu as MenuIcon } from 'lucide-react';
import { HeadProvider } from './context/HeadContext';
import PagesHead from './pages/PagesHead';

import {  initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {},
    lng: "es", // if you're using a language detector, do not define the lng option
    fallbackLng: "es",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

const Layout = () => {
  const { t } = useTranslation();
    return (
      <HeadProvider>
        <div className="min-h-screen bg-[#FFF9F5] snap-y">
          <PagesHead />
            <header className="bg-pure-white shadow-sm fixed w-full z-50">
                <div className="container mx-auto py-4 flex justify-between items-center h-32 max-w-6xl">
                    <div className="flex items-start w-1/2 text-left">
                        <a href="/" className="flex items-center w-auto">
                                <LazyLoad>
                                    <img src={headerImage} alt="oQuanta"
                                        className="object-scale-down aspect-auto" />
                                </LazyLoad>
                        </a>                                                            
                    </div>                    
                    <nav className="flex gap-2 items-center justify-end w-1/2">
                        {/* Enlaces escritorio */}
                        <div className="hidden md:flex md:items-center md:gap-4">
                            <a href="/blog"
                            className="border border-pumpkin-orange text-pumpkin-orange hover:text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pumpkin-orange">
                            {t('Blog')}
                            </a>
                        </div>

                        {/* Botones siempre visibles */}
                        <a href="/contact"
                            className="bg-pumpkin-orange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pumpkin-orange-60">
                            {t('Prueba Gratis')}
                        </a>
                        <a href="https://instagram.com/oquanta_es" 
                            className="text-black p-2 hover:text-pumpkin-orange"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Instagram className="w-5 h-5" />
                        </a>

                        {/* Menu móvil */}
                        <Menu as="div" className="relative md:hidden flex-last">
                            <Menu.Button className="p-2 text-gray-600 hover:text-pumpkin-orange">
                            <MenuIcon className="h-6 w-6" />
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg p-2">
                            <Menu.Item>
                                <a href="/blog" 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                {t('Blog')}
                                </a>
                            </Menu.Item>
                            </Menu.Items>
                        </Menu>
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
                        <div className="text-xs text-black-60 uppercase tracking-wider">{t('Speak up. Shape the future')}</div>
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-black mb-4">{t('Contacto:')}</h3>
                        <div className="text-black-60 space-y-2">
                            <p><a href={encodeURI(`mailto:${t('hola@oquanta.com')}`)} target='blank'>{t('hola@oquanta.com')}</a></p>
                            <p><a href={encodeURI(`tel:${t('+34669202916')}`)} target='blank'>{t('669202916')}</a></p>
                        </div>
                    </div>
                </div>
            </footer>
            <WhatsAppButton phoneNumber="34669202916" message="Hola, me gustaría saber más sobre oQuanta."  />
            
        </div>
      </HeadProvider>
    );
}

export default Layout;