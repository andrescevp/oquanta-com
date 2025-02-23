import { Menu } from '@headlessui/react'
import i18n from 'i18next'
import { Instagram, SquareMenu as MenuIcon } from 'lucide-react'
import React, { Suspense, useState, useEffect } from 'react'
import { useTranslation, initReactI18next } from 'react-i18next'
import LazyLoad from 'react-lazy-load'
import { Outlet } from 'react-router-dom'
import { MenuProvider, useMenu, MenuItem } from './context/MenuContext';

import headerImage from './../images/oquanta-logo-transparent.png?h=80&format=png'
import WhatsAppButton from './components/WhatsAppButton.tsx'
import { HeadProvider } from './context/HeadContext'
import PagesHead from './pages/PagesHead'
import Sidebar from './components/Sidebar.tsx'
import Navbar from './layout/Navbar.tsx'


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {},
    lng: 'es', // if you're using a language detector, do not define the lng option
    fallbackLng: 'es',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  })

const Layout = () => {
  const { t } = useTranslation()
  return (
    <HeadProvider>
      <MenuProvider>
        <div className='min-h-screen bg-white snap-y'>
          <PagesHead />
          <Navbar />
          <main className='pt-32'>
            <Suspense>
              <Outlet />
            </Suspense>
          </main>
          <footer className='bg-white py-12 px-4'>
            <div className='container mx-auto max-w-6xl'>
              <div className='flex flex-col items-center mb-8'>
                <div className='text-2xl font-bold text-pumpkin-orange'>oQuanta.</div>
                <div className='text-xs text-black-60 uppercase tracking-wider'>{t('Speak up. Shape the future')}</div>
              </div>
              <div className='text-center'>
                <h3 className='font-bold text-black mb-4'>{t('Contacto:')}</h3>
                <div className='text-black-60 space-y-2'>
                  <p><a href={encodeURI(`mailto:${t('hola@oquanta.com')}`)} target='blank'>{t('hola@oquanta.com')}</a></p>
                  <p><a href={encodeURI(`tel:${t('+34669202916')}`)} target='blank'>{t('669202916')}</a></p>
                </div>
              </div>
            </div>
          </footer>
          <WhatsAppButton phoneNumber='34669202916' message='Hola, me gustaría saber más sobre oQuanta.' />

        </div>
      </MenuProvider>
    </HeadProvider>
  )
}

export default Layout
