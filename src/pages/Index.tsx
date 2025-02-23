import { BarChart2, CheckCircle2, ClipboardEdit, QrCode as QrCodeIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import FaqSection from '../components/FaqSection'
import LazyVideoPlayer from '../components/LazyVideoPlayer'
import PressCarousel, { PressCarouselProps } from '../components/PressCarousel'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import TrustCarousel, { TrustCarouselProps } from '../components/TrustCarousel.tsx'
import { useHead } from '../context/HeadContext.tsx'
import { pressPosts as pressPostsLoaded, images as pressPostsImages } from '../PressPosts'

import secondImage from './../../images/Banner-Web-B2B-1-1024x1024.png?h=450&format=webp'
import firstImage from './../../images/Banner-Web-B2B-1024x1024.png?h=450&format=webp'

function Index() {
  const { updateHead } = useHead()
  const [logos, setLogos] = useState<TrustCarouselProps['images']>()
  const [pressPosts, setPressPosts] = useState<PressCarouselProps['posts']>()
  const [testimonies, setTestimonies] = useState<string[]>()
  const { t } = useTranslation()

  updateHead({
    title: `oQuanta - ${t('Inteligencia de negocio para hostelería')}`,
    description: t(
      'Plataforma de encuestas de oQuanta que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios.'
    ),
    canonicalLink: 'https://www.oquanta.com/'
  })

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

      <section className="pt-4 pb-16 px-4 " id="why-oquanta">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-5xl font-bold text-pumpkin-orange mb-4">
                {t('Conoce qué piensan tus clientes sobre tu negocio')}
              </h1>
              <p className="text-xl text-[#6B46FF] font-medium mb-8">
                {t('Mejora tu bar o restaurante con datos reales')}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                  <p className="text-black-60">
                    {t('Toma decisiones basadas en las opiniones de tus clientes.')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                  <p className="text-black-60">{t('Impulsa la lealtad mediante recompensas.')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                  <p className="text-black-60">
                    {t('Haz que tus promociones lleguen a más gente gracias a nuestra comunidad.')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                  <p className="text-black-60">{t('Acceso inmediato a datos clave.')}</p>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <a
                  href="/contact"
                  className="inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors"
                >
                  {t('Prueba Gratis')}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-black-30 rounded-lg">
                <LazyLoad height="450px">
                  <img
                    src={secondImage}
                    alt={t('Imagen de una encuesta de un bar en un dispositivo movil')}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-pure-white" id="our-clients">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-pumpkin-orange mb-12">
            {t('Confían en nosotros')}
          </h2>
          {logos && <TrustCarousel images={logos} />}
        </div>
      </section>

      <section className="py-16 px-4" id="beneficios">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#6B46FF] font-bold mb-4">
                {t('Toda información que necesitas sobre tu negocio y clientes')}
              </h2>
              <h3 className="text-4xl font-bold text-pumpkin-orange mb-6">
                {t('Beneficios para tu bar o restaurante')}
              </h3>
              <p className="text-black-60 mb-2">
                {t(
                  '✅ Opiniones verificadas y reales. Solo clientes que han visitado tu local pueden opinar.'
                )}
              </p>
              <p className="text-black-60 mb-2">
                {t(
                  '✅ Datos que realmente importan. Descubre información clave sobre tu negocio, clientes y servicio.'
                )}
              </p>
              <p className="text-black-60 mb-2">
                {t(
                  '✅ Mejora lo que necesites. Identifica qué está funcionando y qué podrías mejorar.'
                )}
              </p>
              <p className="text-black-60 mb-2">
                {t(
                  '✅ Decisiones basadas en datos. Olvídate de intuiciones: actúa con información clara y útil.'
                )}
              </p>
              <p className="text-black-60 mb-8">
                {t(
                  '✅ Fácil, rápido y sin complicaciones. Sin instalaciones complejas ni pérdida de tiempo.'
                )}
              </p>
              <div className="flex items-center justify-start">
                <a
                  href="/contact"
                  className="inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors"
                >
                  {t('Quiero probarlo gratis')}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-black-30 rounded-lg">
                <LazyLoad height="450px">
                  <img
                    src={firstImage}
                    alt={t('Imagen de un reporte estadístico en un dispositivo movil')}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-pure-white" id="como-funciona">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-[#6B46FF] mb-16">
            {t('¿Cómo funciona oQuanta en tu local?')}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center mb-2">
                    <ClipboardEdit className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-black">{t('Configura tu encuesta')}</h3>
              <p className="text-black-60">
                {t('Elige entre encuestas tipo o personalizadas que se adapten a tus necesidades.')}
              </p>
            </div>
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center mb-2">
                    <QrCodeIcon className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-black">{t('Distribuye el QR en tu local')}</h3>
              <p className="text-black-60">
                {t('Nuestros materiales promocionales facilitan que tus clientes participen.')}
              </p>
            </div>
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <span className="inline-block w-16 h-16 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center mb-2">
                    <BarChart2 className="w-8 h-8" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-black">{t('Recibe y analiza los datos')}</h3>
              <p className="text-black-60">
                {t('Accede a resultados en tiempo real y actúa de inmediato.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="testimonios">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-pumpkin-orange mb-16">
            {t('Testimonios reales de hosteleros')}
          </h2>
          {testimonies && <TestimonialsCarousel testimonials={testimonies} />}
        </div>
      </section>

      <section className="py-16 px-4 bg-pure-white" id="noticias">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-pumpkin-orange mb-16 text-center">
            {t('Últimas noticias en medios')}
          </h2>
          {pressPosts && <PressCarousel posts={pressPosts} />}
        </div>
      </section>

      <FaqSection />

      <section className="pt-4 pb-16 px-4 bg-pure-white " id="demo-schedule">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col justify-center">
              <h1 className="text-5xl font-bold text-iris-purple mb-4">
                {t('Empieza a obtener datos de tu local hoy mismo')}
              </h1>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <p className="text-black-60">
                    <span className="font-bold mr-1">{t('Solicita tu demo gratis.')}</span>
                    <span>
                      {t(
                        'Durante la reunión te presentaremos cómo podemos ayudar a tu negocio a diferenciarse y generar más resultados.'
                      )}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-black-60">{t('✅ Datos')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-black-60">{t('✅ Reseñas')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-black-60">{t('✅ Feedback')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-black-60">{t('✅ Recurrencia')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-black-60">{t('✅ Nuevos clientes')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <CalendlyInline />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="why-born">
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

      <section className="pt-4 pb-16 px-4 bg-pure-white " id="know-more">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-iris-purple mb-8 mx-auto text-center">
            {t('¿Quieres saber más?')}
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col justify-center">
              <div className="space-y-4 mb-8">
                <div className="flex flex-col space-y-3">
                  <p className="text-black-60">
                    <span>
                      {t(
                        'Descubre en detalle cómo oQuanta puede ayudarte a mejorar tu negocio con datos reales y opiniones verificadas.'
                      )}
                    </span>
                  </p>
                  <p className="text-black-60">
                    <span>{t('Descarga nuestro dossier gratuito y entérate de todo:')}</span>
                  </p>
                </div>
                <div className="ml-4">
                  <div className="flex items-start gap-3">
                    <p className="text-black-60">{t('✅ Cómo funciona paso a paso.')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black-60">{t('✅ Qué datos puedes obtener.')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black-60">
                      {t('✅ Beneficios específicos para tu negocio.')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black-60">{t('✅ Casos de éxito de otros hosteleros.')}</p>
                  </div>
                </div>
              </div>
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
