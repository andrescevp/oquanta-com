import i18n from 'i18next'
import React, { Suspense } from 'react'
import { useTranslation, initReactI18next } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import WhatsAppButton from './components/WhatsAppButton.tsx'
import { HeadProvider } from './context/HeadContext'
import { MenuProvider } from './context/MenuContext'
import Navbar from './layout/Navbar.tsx'
import PagesHead from './pages/PagesHead'

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
        <div className="min-h-screen snap-y">
          <PagesHead />
          <Navbar />
          <main className="pt-32 relative z-10">
            <Suspense>
              <Outlet />
            </Suspense>
          </main>
          <footer className="relative py-12 px-4 bg-pure-white z-50">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col items-center mb-8">
                <div className="text-2xl font-bold text-pumpkin-orange bg-pure-white">oQuanta.</div>
                <div className="text-xs uppercase tracking-wider bg-pumpkin-orange text-white">
                  {t('Speak up. Shape the future')}
                </div>
              </div>
              <div className="text-center">
                <div className="space-y-2">
                  <p>
                    <a href={encodeURI(`mailto:${t('hola@oquanta.com')}`)} target="blank">
                      {t('hola@oquanta.com')}
                    </a>
                  </p>
                  <p>
                    <a href={encodeURI(`tel:${t('+34669202916')}`)} target="blank">
                      {t('669202916')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
          <WhatsAppButton
            phoneNumber="34669202916"
            message="Hola, me gustaría saber más sobre oQuanta."
          />
        </div>
      </MenuProvider>
    </HeadProvider>
  )
}

export default Layout
