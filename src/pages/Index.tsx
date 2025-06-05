import { clsx } from 'clsx'
import { BarChart2, ClipboardEdit, Instagram, QrCode as QrCodeIcon, ArrowRight } from 'lucide-react'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazy-load'
import { pdfjs } from 'react-pdf'
import { JsonLd } from 'react-schemaorg'
import {
  WebSite as WebSiteSchema,
  WebPage as WebPageSchema,
  Service as ServiceSchema
} from 'schema-dts'

import whyOquantaVideo from '../../videos/how-works.mp4?h=450&format=webm'
import clientData, { images as clientImages } from '../ClientData.ts'
import clientTestimonies from '../ClientTestimonies.ts'
import CalendlyInline from '../components/CalendlyInline'
import FaqSection from '../components/FaqSection'
import LazyVideoPlayer from '../components/LazyVideoPlayer'
import { PDFViewer } from '../components/PDFViewer.tsx'
import PressCarousel, { PressCarouselProps } from '../components/PressCarousel'
import SlideShow from '../components/SlideShow/index.tsx'
import Slide from '../components/SlideShow/Slide.tsx'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import TrustCarousel, { TrustCarouselProps } from '../components/TrustCarousel.tsx'
import WaveBackground from '../components/WaveBackground/index.tsx'
import { useHead } from '../context/HeadContext.tsx'
import { useMenu } from '../context/MenuContext.tsx'
import { MenuItemCTA, MenuItemSimpleClassName, MenuItemSpecial } from '../layout/Navbar.tsx'
import { pressPosts as pressPostsLoaded, images as pressPostsImages } from '../PressPosts'

import firstImage from './../../images/Banner-Web-B2B-1024x1024.png?h=450&format=webp'
import surveyPhone1 from './../../images/survey-phone-1.png?h=450&format=webp'
import surveyPhone2 from './../../images/survey-phone-2.png?h=450&format=webp'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

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
        'fixed rounded-full opacity-40 blur-3xl mix-blend-multiply dark:mix-blend-soft-light animate-pulse z-[1]',
        className
      )}
      style={{ backgroundColor: color }}
    />
  )
}

function Index() {
  const { updateHead } = useHead()
  const [logos, setLogos] = useState<TrustCarouselProps['images']>()
  const [pressPosts, setPressPosts] = useState<PressCarouselProps['posts']>()
  const [testimonies, setTestimonies] = useState<string[]>()
  const { t } = useTranslation()
  const [isContentLoaded, setIsContentLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = useMemo(
    () => [
      {
        children: t('Beneficios'),
        href: '/#beneficios',
        className: MenuItemSpecial,
        position: 'left'
      },
      {
        children: t('Cómo Funciona?'),
        href: '/#como-funciona',
        className: MenuItemSpecial,
        position: 'left'
      },
      {
        children: t('Testimonios'),
        href: '/#testimonios',
        className: MenuItemSpecial,
        position: 'left'
      },
      {
        children: t('Noticias'),
        href: '/#noticias',
        className: MenuItemSpecial,
        position: 'left'
      },
      {
        children: t('Blog'),
        href: '/blog',
        className: MenuItemSpecial,
        position: 'right'
      },
      {
        children: t('Prueba Gratis'),
        href: '/#demo-schedule',
        className: MenuItemCTA,
        allwaysVisible: true,
        position: 'right'
      },
      {
        children: (
          <>
            <span className="sr-only">{t('Instagram')}</span>
            <Instagram className="w-5 h-5" />
          </>
        ),
        href: 'https://instagram.com/oquanta_es',
        className: MenuItemSimpleClassName,
        target: '_blank',
        rel: 'noopener noreferrer',
        allwaysVisible: true,
        position: 'right'
      }
    ],
    [t]
  )

  useMenu(menuItems as never[])

  updateHead({
    title: `oQuanta - ${t('Inteligencia de negocio para hostelería')}`,
    description: t(
      'Plataforma de encuestas de oQuanta que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios.'
    ),
    canonicalLink: 'https://www.oquanta.com/'
  })

  useEffect(() => {
    // Detectar cuando el contenido principal está cargado
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

  useEffect(() => {
    if (!logos) {
      const logos: TrustCarouselProps['images'] = []
      Object.keys(clientData).forEach(client => {
        logos.push({
          image: clientImages[client as keyof typeof clientImages],
          name: clientData[client as keyof typeof clientData]['fields']['name']
        })
      })
      setLogos(logos)
    }

    if (!testimonies) {
      const testimonies: string[] = []
      Object.keys(clientTestimonies).forEach(testimony => {
        testimonies.push(
          clientTestimonies[testimony as keyof typeof clientTestimonies]['fields']['testimony']
        )
      })
      setTestimonies(testimonies)
    }

    if (!pressPosts) {
      const posts = Object.keys(pressPostsLoaded).map(i => {
        const item = pressPostsLoaded[i as keyof typeof pressPostsLoaded]
        const image = pressPostsImages[i as keyof typeof pressPostsImages]
        return {
          fields: {
            title: item.fields.title,
            description: item.fields.description,
            url: item.fields.url
          },
          image
        }
      })
      setPressPosts(posts)
    }
  }, [logos, pressPosts, testimonies])

  return (
    <>
      <JsonLd<WebPageSchema>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://oquanta.com/#webpage',
          url: 'https://oquanta.com',
          name: 'oQuanta - Inteligencia de negocio para hostelería',
          description:
            'Plataforma de encuestas que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios.',
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

      {/* <React.Suspense fallback={<div className="min-h-[50vh]" />}>
        <DataBackground isContentLoaded={isContentLoaded} />
      </React.Suspense> */}
      <DecorativeBlur
        color="#5a33ee"
        className="w-40 h-40 top-50 left-10 lg:w-96 lg:h-96 lg:top-50 lg:left-10 md:w-96 md:h-96 md:top-50 md:left-10"
      />
      {/* <DecorativeBlur color="#fd5304" className="w-96 h-96 top-50 left-10" /> */}
      <DecorativeBlur
        color="#fd5304"
        className="w-40 h-40 top-80 right-10 lg:w-96 lg:h-96 lg:top-[80vh] lg:right-[50vw] md:w-96 md:h-96 md:top-[80vh] md:left-40"
      />
      <DecorativeBlur
        color="#c0f03e"
        className="w-40 h-40 top-96 right-500 lg:w-96 lg:h-96 lg:top-[10vh] lg:right-40 md:w-96 md:h-96 md:top-[10vh] md:right-10"
      />

      {/* Hero Section */}
      <section
        className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-br  overflow-hidden relative"
        id="why-oquanta"
      >
        {/* Decorative elements */}
        {/* <DecorativeBlur color="#fd5304" className="w-96 h-96 -top-40 -left-40" />
        <DecorativeBlur
          color="#5a33ee"
          className="w-96 h-96 top-1/3 right-0 transform translate-x-1/2"
        />
        <DecorativeBlur color="#c0f03e" className="w-64 h-64 bottom-20 left-1/4" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6 flex flex-col justify-center">
              <div className="inline-block mb-2">
                <span className="bg-iris-purple/10 text-iris-purple px-4 py-1.5 rounded-full text-sm font-medium">
                  oQuanta 2025
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-pumpkin-orange">
                {t('Conoce qué piensan tus clientes')}
              </h1>
              <p className="text-lg text-iris-purple font-semibold">
                {t('Mejora tu bar o restaurante con datos reales')}
              </p>

              <div className={glassCard + ' p-6 space-y-4'}>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <span>{t('Toma decisiones basadas en las opiniones de tus clientes.')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <span>{t('Impulsa la lealtad mediante recompensas personalizadas.')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    {t('Haz que tus promociones lleguen a más gente gracias a nuestra comunidad.')}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                  <span>{t('Acceso inmediato a datos clave de tu negocio.')}</span>
                </div>
              </div>

              <div className="flex items-center justify-start mt-4 gap-4">
                <a
                  href="/#demo-schedule"
                  className={modernButton}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {t('Prueba Gratis')}
                </a>
                <a
                  href="#como-funciona"
                  className="text-iris-purple hover:text-iris-purple/80 font-medium transition-all duration-200"
                >
                  {t('Cómo funciona')} →
                </a>
              </div>
            </div>
            <div className="relative items-center justify-center my-auto">
              <WaveBackground width="auto" height="450px" className="rounded-2xl shadow-2xl">
                <SlideShow width="auto" height="450px" className="rounded-2xl">
                  <Slide direction="up" duration={800}>
                    <div className="aspect-[4/3] rounded-lg">
                      <LazyLoad height="450px">
                        <img
                          src={surveyPhone1}
                          alt={t('Imagen de una encuesta de un bar en un dispositivo movil')}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </LazyLoad>
                    </div>
                  </Slide>
                  <Slide direction="up" duration={1000}>
                    <div className="aspect-[4/3] rounded-lg">
                      <LazyLoad height="450px">
                        <img
                          src={surveyPhone2}
                          alt={t('Imagen de una encuesta de un bar en un dispositivo movil')}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </LazyLoad>
                    </div>
                  </Slide>
                </SlideShow>
              </WaveBackground>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="our-clients"
      >
        {/* <DecorativeBlur color="#c0f03e" className="w-80 h-80 -bottom-40 -right-20" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-pumpkin-orange mb-12">
            {t('Confían en nosotros')}
          </h2>
          {logos && <TrustCarousel images={logos} />}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-br  relative overflow-hidden" id="beneficios">
        {/* <DecorativeBlur color="#fd5304" className="w-96 h-96 -top-20 -right-40" />
        <DecorativeBlur color="#5a33ee" className="w-64 h-64 bottom-20 left-20" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="space-y-6">
            <span className="text-sm font-medium text-iris-purple">
              {t('Toda información que necesitas sobre tu negocio y clientes')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-pumpkin-orange">
              {t('Beneficios para tu bar o restaurante')}
            </h2>

            <div className={glassCard + ' p-6 space-y-4'}>
              <div className="flex items-start gap-3">
                <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                <p>
                  {t(
                    'Opiniones verificadas y reales. Solo clientes que han visitado tu local pueden opinar.'
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                <p>
                  {t(
                    'Datos que realmente importan. Descubre información clave sobre tu negocio, clientes y servicio.'
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                <p>
                  {t(
                    'Mejora lo que necesites. Identifica qué está funcionando y qué podrías mejorar.'
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                <p>
                  {t(
                    'Decisiones basadas en datos. Olvídate de intuiciones: actúa con información clara y útil.'
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pumpkin-orange flex-shrink-0 mt-0.5">✓</span>
                <p>
                  {t(
                    'Fácil, rápido y sin complicaciones. Sin instalaciones complejas ni pérdida de tiempo.'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start mt-4">
              <a href="/#demo-schedule" className={modernButton}>
                {t('Quiero probarlo gratis')}
                <ArrowRight className="w-5 h-5" />
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
        {/* <DecorativeBlur color="#c0f03e" className="w-80 h-80 -bottom-20 -left-20" />
        <DecorativeBlur color="#fd5304" className="w-64 h-64 top-20 right-40" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple mb-16 text-center">
            {t('¿Cómo funciona oQuanta en tu local?')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={clsx(
                glassCard,
                'p-8 relative hover:translate-y-[-4px] transition-all duration-300'
              )}
            >
              <div className="text-center mb-6 relative">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-gradient-to-br from-iris-purple to-iris-purple/80 text-white font-bold flex items-center justify-center mb-2 shadow-lg shadow-iris-purple/20">
                    <ClipboardEdit className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center">
                {t('Configura tu encuesta')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t('Elige entre encuestas tipo o personalizadas que se adapten a tus necesidades.')}
              </p>
            </div>

            <div
              className={clsx(
                glassCard,
                'p-8 relative hover:translate-y-[-4px] transition-all duration-300'
              )}
            >
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-gradient-to-br from-iris-purple to-iris-purple/80 text-white font-bold flex items-center justify-center mb-2 shadow-lg shadow-iris-purple/20">
                    <QrCodeIcon className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center">
                {t('Distribuye el QR en tu local')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t('Nuestros materiales promocionales facilitan que tus clientes participen.')}
              </p>
            </div>

            <div
              className={clsx(
                glassCard,
                'p-8 relative hover:translate-y-[-4px] transition-all duration-300'
              )}
            >
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-gradient-to-br from-iris-purple to-iris-purple/80 text-white font-bold flex items-center justify-center mb-2 shadow-lg shadow-iris-purple/20">
                    <BarChart2 className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center">
                {t('Recibe y analiza los datos')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t('Accede a resultados en tiempo real y actúa de inmediato.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br  relative overflow-hidden" id="testimonios">
        {/* <DecorativeBlur color="#5a33ee" className="w-96 h-96 -top-40 -right-40" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-pumpkin-orange mb-16 text-center">
            {t('Testimonios reales de hosteleros')}
          </h2>
          <div className={'p-4'}>
            {testimonies && <TestimonialsCarousel testimonials={testimonies} />}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="noticias"
      >
        {/* <DecorativeBlur color="#c0f03e" className="w-80 h-80 top-20 -left-20" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-pumpkin-orange mb-16 text-center">
            {t('Últimas noticias en medios')}
          </h2>
          {pressPosts && <PressCarousel posts={pressPosts} />}
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Demo Schedule Section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="demo-schedule"
      >
        {/* <DecorativeBlur color="#fd5304" className="w-96 h-96 top-20 -left-40" />
        <DecorativeBlur color="#5a33ee" className="w-80 h-80 bottom-10 right-0" /> */}

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple">
                {t('Empieza a obtener datos de tu local hoy mismo')}
              </h2>
              <div className={glassCard + ' p-6 space-y-4'}>
                <div className="mb-4">
                  <p className="font-semibold text-lg mb-2">{t('Solicita tu demo gratis')}</p>
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

      {/* Why Section */}
      <section className="py-16 px-4 bg-gradient-to-br relative overflow-hidden" id="why-born">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-pumpkin-orange mb-16">
            {t('¿Por qué nació oQuanta?')}
          </h2>
          <div className={clsx(glassCard, 'p-1 max-w-3xl mx-auto overflow-hidden')}>
            <LazyVideoPlayer
              src={whyOquantaVideo}
              poster={firstImage}
              title={t('"Video demostrativo de oQuanta"')}
              height={350}
              className="rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </section>

      {/* Know More Section */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-900/80 relative overflow-hidden"
        id="know-more"
      >
        <div className="container mx-auto w-full relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-iris-purple mb-16 text-center">
            {t('¿Quieres saber más?')}
          </h2>
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-6">
              <div className={glassCard + ' p-6 space-y-4'}>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300 ">
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
              </div>
              {/* <div className="py-4">
                <button className={modernButton + ' justify-center'}>
                  {t('Descargar dossier')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div> */}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-green/20 to-pumpkin-orange/10 rounded-2xl blur-xl transform -rotate-2"></div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <PDFViewer pdfUrl={'dossier.pdf'} title="Nuestra propuesta en detalle" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
