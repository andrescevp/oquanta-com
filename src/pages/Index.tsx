import { BarChart2, ClipboardEdit, Instagram, QrCode as QrCodeIcon } from 'lucide-react'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazy-load'
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
import ColorGrid from '../components/ColorGrid/index.tsx'
import FaqSection from '../components/FaqSection'
import LazyVideoPlayer from '../components/LazyVideoPlayer'
import PressCarousel, { PressCarouselProps } from '../components/PressCarousel'
import ProgressReveal from '../components/ProgressReveal/index.tsx'
import SlideShow from '../components/SlideShow/index.tsx'
import Slide from '../components/SlideShow/Slide.tsx'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import TrustCarousel, { TrustCarouselProps } from '../components/TrustCarousel.tsx'
import WaveBackground from '../components/WaveBackground/index.tsx'
import { useHead } from '../context/HeadContext.tsx'
import { useMenu } from '../context/MenuContext.tsx'
import { MenuItemCTA, MenuItemSimpleClassName, MenuItemSpecial } from '../layout/Navbar.tsx'
import { pressPosts as pressPostsLoaded, images as pressPostsImages } from '../PressPosts'

import secondImage from './../../images/Banner-Web-B2B-1-1024x1024.png?h=450&format=webp'
import firstImage from './../../images/Banner-Web-B2B-1024x1024.png?h=450&format=webp'
import reportPhone1 from './../../images/report-phone-1.png?h=450&format=webp'
import reportPhone2 from './../../images/report-phone-2.png?h=450&format=webp'
import surveyPhone1 from './../../images/survey-phone-1.png?h=450&format=webp'
import surveyPhone2 from './../../images/survey-phone-2.png?h=450&format=webp'

const DataBackground = React.lazy(() => import('../components/DataBackground.tsx'))

function Index() {
  const { updateHead } = useHead()
  const [logos, setLogos] = useState<TrustCarouselProps['images']>()
  const [pressPosts, setPressPosts] = useState<PressCarouselProps['posts']>()
  const [testimonies, setTestimonies] = useState<string[]>()
  const { t } = useTranslation()
  const [isContentLoaded, setIsContentLoaded] = useState(false)

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
          // "offers": {
          //     "@type": "Offer",
          //     "availability": "https://schema.org/InStock",
          //     "price": "0",
          //     "priceCurrency": "EUR",
          //     "description": "Prueba gratuita del sistema de encuestas oQuanta"
          // },
          serviceType: 'Plataforma de encuestas y análisis',
          termsOfService: 'https://oquanta.com/terms',
          category: ['Software', 'Business Intelligence', 'Customer Feedback']
        }}
      />

      <React.Suspense fallback={<div className="min-h-[50vh]" />}>
        <DataBackground isContentLoaded={isContentLoaded} />
      </React.Suspense>

      <section className="pt-4 pb-16 px-4 bg-white/80" id="why-oquanta">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col justify-center">
              <ProgressReveal>
                <h1 className="text-5xl font-bold text-pumpkin-orange mb-4">
                  <span className="bg-white">
                    {t('Conoce qué piensan tus clientes sobre tu negocio')}
                  </span>
                </h1>
                <p className="text-md text-iris-purple font-semibold mb-8">
                  <span className="bg-white">
                    {t('Mejora tu bar o restaurante con datos reales')}
                  </span>
                </p>
              </ProgressReveal>
              <div className="space-y-4 mb-8">
                <ProgressReveal>
                  <div className="flex items-start gap-3">
                    <span className="bg-white">
                      {t('✅ Toma decisiones basadas en las opiniones de tus clientes.')}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-white">
                      {t('✅ Impulsa la lealtad mediante recompensas.')}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-white">
                      {t(
                        '✅ Haz que tus promociones lleguen a más gente gracias a nuestra comunidad.'
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-white">{t('✅ Acceso inmediato a datos clave.')}</span>
                  </div>
                </ProgressReveal>
              </div>
              <div className="flex items-center justify-start mt-4">
                <a href="/#demo-schedule" className={MenuItemCTA}>
                  {t('Prueba Gratis')}
                </a>
              </div>
            </div>
            <div className="relative">
              <WaveBackground width="auto" height="450px" className="rounded-lg">
                <SlideShow width="auto" height="450px" className="rounded-lg">
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

      <section className="py-16 px-4 bg-pure-white/70" id="our-clients">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-pumpkin-orange mb-12">
            {t('Confían en nosotros')}
          </h2>
          {logos && <TrustCarousel images={logos} />}
        </div>
      </section>

      <section className="py-16 px-4 bg-white/80" id="beneficios">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ProgressReveal>
                <h2 className="text-iris-purple font-bold mb-4 text-md">
                  {t('Toda información que necesitas sobre tu negocio y clientes')}
                </h2>
                <h3 className="text-4xl font-bold text-pumpkin-orange mb-6">
                  {t('Beneficios para tu bar o restaurante')}
                </h3>
              </ProgressReveal>
              <ProgressReveal>
                <p className=" mb-2">
                  {t(
                    '✅ Opiniones verificadas y reales. Solo clientes que han visitado tu local pueden opinar.'
                  )}
                </p>
                <p className=" mb-2">
                  {t(
                    '✅ Datos que realmente importan. Descubre información clave sobre tu negocio, clientes y servicio.'
                  )}
                </p>
                <p className=" mb-2">
                  {t(
                    '✅ Mejora lo que necesites. Identifica qué está funcionando y qué podrías mejorar.'
                  )}
                </p>
                <p className=" mb-2">
                  {t(
                    '✅ Decisiones basadas en datos. Olvídate de intuiciones: actúa con información clara y útil.'
                  )}
                </p>
                <p className=" mb-8">
                  {t(
                    '✅ Fácil, rápido y sin complicaciones. Sin instalaciones complejas ni pérdida de tiempo.'
                  )}
                </p>
              </ProgressReveal>
              <div className="flex items-center justify-start">
                <a href="/#demo-schedule" className={MenuItemCTA}>
                  {t('Quiero probarlo gratis')}
                </a>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <ColorGrid width="100%" height="450px" className="rounded-lg">
                <SlideShow width="auto" height="450px" className="rounded-lg">
                  <Slide direction="up" duration={800}>
                    <div className="aspect-[4/3] rounded-lg">
                      <LazyLoad height="450px">
                        <img
                          src={reportPhone1}
                          alt={t('Imagen de un reporte de un bar en un dispositivo movil')}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </LazyLoad>
                    </div>
                  </Slide>
                  <Slide direction="up" duration={1000}>
                    <div className="aspect-[4/3] rounded-lg">
                      <LazyLoad height="450px">
                        <img
                          src={reportPhone2}
                          alt={t('Imagen de un reporte de un bar en un dispositivo movil')}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </LazyLoad>
                    </div>
                  </Slide>
                </SlideShow>
              </ColorGrid>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-pure-white/70" id="como-funciona">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-iris-purple mb-16">
            {t('¿Cómo funciona oQuanta en tu local?')}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center mb-2">
                    <ClipboardEdit className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-black">{t('Configura tu encuesta')}</h3>
              <p className="">
                {t('Elige entre encuestas tipo o personalizadas que se adapten a tus necesidades.')}
              </p>
            </div>
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center mb-2">
                    <QrCodeIcon className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-black">{t('Distribuye el QR en tu local')}</h3>
              <p className="">
                {t('Nuestros materiales promocionales facilitan que tus clientes participen.')}
              </p>
            </div>
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center mb-2">
                    <BarChart2 className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-iris-purple text-white font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-black">{t('Recibe y analiza los datos')}</h3>
              <p className="">{t('Accede a resultados en tiempo real y actúa de inmediato.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/80" id="testimonios">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-pumpkin-orange mb-16">
            {t('Testimonios reales de hosteleros')}
          </h2>
          {testimonies && <TestimonialsCarousel testimonials={testimonies} />}
        </div>
      </section>

      <section className="py-16 px-4 bg-pure-white/70" id="noticias">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-pumpkin-orange mb-16 text-center">
            {t('Últimas noticias en medios')}
          </h2>
          {pressPosts && <PressCarousel posts={pressPosts} />}
        </div>
      </section>

      <FaqSection />

      <section className="pt-4 pb-16 px-4 bg-pure-white/70" id="demo-schedule">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col justify-center">
              <ProgressReveal>
                <h2 className="text-5xl font-bold text-iris-purple mb-4">
                  {t('Empieza a obtener datos de tu local hoy mismo')}
                </h2>
                <div className="flex items-start">
                  <p className="">
                    <span className="font-bold mr-1">{t('Solicita tu demo gratis.')}</span>
                    <span>
                      {t(
                        'Durante la reunión te presentaremos cómo podemos ayudar a tu negocio a diferenciarse y generar más resultados.'
                      )}
                    </span>
                  </p>
                </div>
              </ProgressReveal>
              <ProgressReveal>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Datos')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Reseñas')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Feedback')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Recurrencia')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Nuevos clientes')}</p>
                </div>
              </ProgressReveal>
            </div>
            <div className="relative">
              <CalendlyInline />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/80" id="why-born">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-pumpkin-orange mb-16">
            {t('¿Por qué nació oQuanta?')}
          </h2>
          <div className="h-fit-content mx-auto">
            <LazyVideoPlayer
              src={whyOquantaVideo}
              poster={firstImage}
              title={t('"Video demostrativo de oQuanta"')}
              height={250}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      <section className="pt-4 pb-16 px-4 bg-pure-white/70" id="know-more">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-iris-purple mb-8 mx-auto text-center">
            {t('¿Quieres saber más?')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col justify-center">
              <ProgressReveal>
                <div className="flex flex-col space-y-3">
                  <p className="">
                    <span>
                      {t(
                        'Descubre en detalle cómo oQuanta puede ayudarte a mejorar tu negocio con datos reales y opiniones verificadas.'
                      )}
                    </span>
                  </p>
                  <p className="">
                    <span>{t('Descarga nuestro dossier gratuito y entérate de todo:')}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Cómo funciona paso a paso.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Qué datos puedes obtener.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Beneficios específicos para tu negocio.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="">{t('✅ Casos de éxito de otros hosteleros.')}</p>
                </div>
              </ProgressReveal>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-black-30 rounded-lg">
                <LazyLoad height="450px">
                  <img
                    src={secondImage}
                    alt={t('heroImageAlt')}
                    className="w-full h-full object-cover rounded-lg"
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

export default Index
