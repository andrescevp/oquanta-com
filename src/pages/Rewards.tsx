import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { ArrowRight, ClipboardEdit, QrCode as QrCodeIcon, MessageSquare, Gift } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazy-load'
import { JsonLd } from 'react-schemaorg'
import {
  WebSite as WebSiteSchema,
  WebPage as WebPageSchema,
  Service as ServiceSchema
} from 'schema-dts'

import CalendlyInline from '../components/CalendlyInline.tsx'
import { useHead } from '../context/HeadContext.tsx'

// Import required images
import amazonCardImage from './../../images/amazon-card.png?h=120&format=webp'
import secondImage from './../../images/Banner-Web-B2B-1-1024x1024.png?h=450&format=webp'
import giftCardImage from './../../images/gift-card.png?h=120&format=webp'
import dinnerImage from './../../images/restaurant-dinner.png?h=120&format=webp'

// Reusable style classes
const glassCard =
  'backdrop-blur-sm bg-white/60 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-700/30 dark:to-gray-800/20 transition-all duration-200 ease-in-out'

const modernButton =
  'bg-gradient-to-r from-pumpkin-orange to-pumpkin-orange/80 text-white py-3 px-4 rounded-xl shadow-lg shadow-pumpkin-orange/20 hover:translate-y-[-2px] transition-all duration-200 ease-in-out flex items-center gap-2 font-medium'

// Decorative blur element component
const DecorativeBlur = ({ color, className }) => {
  return (
    <div
      className={clsx(
        'absolute rounded-full opacity-40 blur-3xl mix-blend-multiply dark:mix-blend-soft-light animate-pulse',
        className
      )}
      style={{ backgroundColor: color }}
    />
  )
}

// Step component for the "How it works" section
const RewardStep = ({ number, icon, title, description }) => {
  return (
    <div
      className={clsx(
        glassCard,
        'p-6 relative hover:translate-y-[-4px] transition-all duration-300'
      )}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="inline-flex flex-col items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-iris-purple to-iris-purple/80 text-white font-bold flex items-center justify-center mb-2 shadow-lg shadow-iris-purple/20">
              {icon}
            </span>
            <span className="w-6 h-6 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center text-sm">
              {number}
            </span>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-between w-full">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:w-1/2">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 md:w-1/2">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Prize card component
const PrizeCard = ({ month, prize, icon, description }) => {
  return (
    <div className={clsx(glassCard, 'p-6 hover:translate-y-[-4px] transition-all duration-300')}>
      <div className="flex items-center mb-3">
        <div className="w-20 h-20 flex-shrink-0 mr-4">{icon}</div>
        <div>
          <span className="block text-iris-purple font-bold mb-1">{month}</span>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{prize}</h4>
        </div>
      </div>
      {description && <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>}
    </div>
  )
}

function Rewards() {
  const { updateHead } = useHead()
  const { t } = useTranslation()
  const [isContentLoaded, setIsContentLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  updateHead({
    title: `oQuanta - ${t('Gana premios por dar tu opinión')}`,
    description: t(
      'Participa en sorteos mensuales simplemente compartiendo tu opinión sobre los negocios que visitas.'
    ),
    canonicalLink: 'https://www.oquanta.com/rewards'
  })

  useEffect(() => {
    // Detect when the main content is loaded
    const handleLoad = () => {
      setIsContentLoaded(true)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <>
      <JsonLd<WebPageSchema>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://oquanta.com/rewards/#webpage',
          url: 'https://oquanta.com/rewards',
          name: 'oQuanta - Gana premios por dar tu opinión',
          description:
            'Participa en sorteos mensuales simplemente compartiendo tu opinión sobre los negocios que visitas.',
          isPartOf: { '@id': 'https://oquanta.com/#website' }
        }}
      />

      <JsonLd<WebSiteSchema>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': 'https://oquanta.com/#website',
          url: 'https://oquanta.com',
          name: 'oQuanta',
          description: 'Plataforma de encuestas e inteligencia de negocio para hostelería',
          publisher: { '@id': 'https://oquanta.com/#organization' }
        }}
      />

      <JsonLd<ServiceSchema>
        item={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': 'https://oquanta.com/#service',
          name: 'oQuanta - Sistema de encuestas para hostelería',
          description: 'Sistema de encuestas y análisis de datos para bares y restaurantes',
          provider: { '@id': 'https://oquanta.com/#organization' },
          areaServed: 'ES',
          audience: {
            '@type': 'Audience',
            audienceType: 'Negocios de hostelería'
          },
          serviceType: 'Plataforma de encuestas y análisis',
          termsOfService: 'https://oquanta.com/terms',
          category: ['Software', 'Business Intelligence', 'Customer Feedback']
        }}
      />

      {/* Hero Section */}
      <section
        className="min-h-[70vh] pt-28 pb-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden relative"
        id="hero"
      >
        {/* Decorative elements */}
        <DecorativeBlur color="#fd5304" className="w-96 h-96 -top-40 -left-40" />
        <DecorativeBlur
          color="#5a33ee"
          className="w-96 h-96 bottom-40 right-0 transform translate-x-1/2"
        />
        <DecorativeBlur color="#c0f03e" className="w-64 h-64 top-40 left-1/4" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pumpkin-orange">
              {t('GANA PREMIOS POR DAR TU OPINIÓN')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-bold">
              <span className="bg-pumpkin-orange text-white px-1">{t('Valorar, ')}</span>
              <span className="text-iris-purple bg-lime-green px-1">{t('criticar, ')}</span>
              <span className="text-lime-green bg-iris-purple px-1">{t('opinar... ')}</span>
              <span className="text-pumpkin-orange px-1 text-3xl">{t('Llámalo Q')}</span>
            </p>

            <div className={clsx(glassCard, 'p-6 max-w-2xl mx-auto')}>
              <p className="text-lg text-iris-purple font-semibold">
                {t('Con oQuanta digas lo que digas tu opinión tiene premio')}
              </p>
            </div>

            <div className="flex items-center justify-center mt-8 gap-4">
              <a
                href="#como-funciona"
                className={modernButton}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {t('¿Cómo funciona?')}
                <Transition
                  show={isHovered}
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ArrowRight className="w-5 h-5" />
                </Transition>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="como-funciona"
      >
        <DecorativeBlur color="#c0f03e" className="w-80 h-80 top-20 -left-20" />
        <DecorativeBlur color="#fd5304" className="w-64 h-64 bottom-20 right-40" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple mb-16 text-center">
            {t('¿Cómo funciona?')}
          </h2>

          <div className="space-y-6">
            <RewardStep
              number="1"
              icon={<ClipboardEdit className="w-6 h-6" />}
              title={t('Vas a un local de oQuanta')}
              description={t('🍻 Te tomas algo, pruebas, disfrutas... lo que sea')}
            />

            <RewardStep
              number="2"
              icon={<QrCodeIcon className="w-6 h-6" />}
              title={t('Encuentras el QR en mesa o en cartel')}
              description={t('📲 Te lleva a una encuesta rápida. Muy rápida.')}
            />

            <RewardStep
              number="3"
              icon={<MessageSquare className="w-6 h-6" />}
              title={t('Compartes tu opinión real (no te cortes)')}
              description={t('🧠 Solo queremos saber qué tal te fue.')}
            />

            <RewardStep
              number="4"
              icon={<Gift className="w-6 h-6" />}
              title={t('Participas automáticamente en el sorteo del mes!')}
              description={t('🎁 Cada mes hay un premio nuevo. Y sí, ya ha habido ganadores.')}
            />
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
        id="premios"
      >
        <DecorativeBlur color="#5a33ee" className="w-96 h-64 top-40 -right-40" />
        <DecorativeBlur color="#fd5304" className="w-64 h-64 bottom-20 left-20" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-pumpkin-orange mb-16 text-center">
            {t('Premiazos que puedes ganar')}
          </h2>

          <div className={clsx(glassCard, 'p-6 mb-10')}>
            <p className="text-center text-lg font-bold">
              {t('📅 Sorteos activos en todos los locales')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PrizeCard
              month="MAYO"
              prize={t('Cena para 2 en el local en el que participes')}
              icon={
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <LazyLoad height={80}>
                    <img
                      src={dinnerImage}
                      alt="Dinner for two"
                      className="w-full h-full object-cover"
                    />
                  </LazyLoad>
                </div>
              }
            />

            <PrizeCard
              month="JUNIO"
              prize={t('Tarjeta Amazon de 30€')}
              icon={
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <LazyLoad height={80}>
                    <img
                      src={amazonCardImage}
                      alt="Amazon gift card"
                      className="w-full h-full object-cover"
                    />
                  </LazyLoad>
                </div>
              }
            />

            <PrizeCard
              month="JULIO"
              prize={t('Cheque regalo de 20€ en cualquier local oQuanta')}
              icon={
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <LazyLoad height={80}>
                    <img
                      src={giftCardImage}
                      alt="Gift card"
                      className="w-full h-full object-cover"
                    />
                  </LazyLoad>
                </div>
              }
            />
          </div>

          <div className="mt-10 text-center">
            <p className="text-lg text-iris-purple font-bold">
              {t('🕐 Recuerda: solo por participar ya estás dentro!')}
            </p>
          </div>
        </div>
      </section>

      {/* Participation CTA Section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="participar"
      >
        {/* <DecorativeBlur color="#c0f03e" className="w-80 h-80 bottom-40 -right-20" /> */}

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple">
              {t('¿Listo para participar?')}
            </h2>

            <div className={clsx(glassCard, 'p-6 max-w-2xl mx-auto')}>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {t(
                  'Busca el código QR en cualquier local de oQuanta, comparte tu opinión y entra automáticamente en nuestros sorteos mensuales.'
                )}
              </p>

              <div className="flex justify-center">
                <a href="/" className={modernButton}>
                  {t('Buscar locales oQuanta')}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="demo-schedule"
      >
        <DecorativeBlur color="#fd5304" className="w-96 h-96 top-40 -left-40" />
        <DecorativeBlur color="#5a33ee" className="w-80 h-80 bottom-40 right-0" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple">
                {t('¿Tienes un local y quieres probar oQuanta?')}
              </h2>
              <div className={glassCard + ' p-6 space-y-4'}>
                <div className="mb-4">
                  <p className="font-semibold text-lg mb-2">{t('Solicita tu demo gratis.')}</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(
                      'Durante la reunión te presentaremos cómo podemos ayudar a tu negocio a diferenciarse y generar más resultados.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                    <p>{t('Datos')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                    <p>{t('Reseñas')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                    <p>{t('Feedback')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                    <p>{t('Recurrencia')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                    <p>{t('Nuevos clientes')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className={glassCard + ' h-full overflow-hidden'}>
                <CalendlyInline />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="know-more"
      >
        <DecorativeBlur color="#5a33ee" className="w-80 h-80 top-40 left-1/4" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple mb-16 text-center">
            {t('¿Quieres saber más?')}
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className={glassCard + ' p-6 space-y-4'}>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(
                      'Descubre en detalle cómo oQuanta puede ayudarte a mejorar tu negocio con datos reales y opiniones verificadas.'
                    )}
                  </p>
                  <p className="font-medium">
                    {t('Descarga nuestro dossier gratuito y entérate de todo:')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <p>{t('Cómo funciona paso a paso.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <p>{t('Qué datos puedes obtener.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <p>{t('Beneficios específicos para tu negocio.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <p>{t('Casos de éxito de otros hosteleros.')}</p>
                </div>

                <div className="pt-4">
                  <button className={modernButton + ' w-full justify-center'}>
                    {t('Descargar dossier')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-green/20 to-pumpkin-orange/10 rounded-2xl blur-xl transform -rotate-2"></div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <LazyLoad height={450}>
                  <img
                    src={secondImage}
                    alt={t('heroImageAlt')}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Rewards
