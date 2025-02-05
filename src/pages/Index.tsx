import React from 'react';
import { BarChart2, CheckCircle2, ClipboardEdit, QrCode as QrCodeIcon } from 'lucide-react';
import { t } from '../translations.ts';
import { TrustCarousel } from "../TrustCarousel.tsx";
import firstImage from './../../images/Banner-Web-B2B-1024x1024.png?h=450&format=webp';
import secondImage from './../../images/Banner-Web-B2B-1-1024x1024.png?h=450&format=webp';
import { Head } from "vite-react-ssg";
import { JsonLd } from "react-schemaorg";
import { Organization as OrgSchema, WebSite as WebSiteSchema, WebPage as WebPageSchema, Service as ServiceSchema } from "schema-dts";
import LazyLoad from 'react-lazy-load';

function Index() {
    const head = (<>
        <Head>
            <meta charSet="UTF-8" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest.json" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>oQuanta - Inteligencia y analitica para hosteleria</title>
            <link rel="canonical" href="http://www.oquanta.com" />
        </Head>
        <JsonLd<OrgSchema>
            item={{
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://oquanta.com/#organization",
                name: "oQuanta",
                url: "https://oquanta.com",
                logo: "https://oquanta.com/android-chrome-512x512.png",
                description: "oQuanta ofrece una plataforma de encuestas para recopilar opiniones de tus clientes, mejorar sus experiencias y potenciar tu negocio.",
                email: "hola@oquanta.com",
                telephone: "+34 660220216",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Burgos",
                    addressCountry: "ES"
                },
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+34 660220216",
                    contactType: "customer support",
                    areaServed: "ES",
                    availableLanguage: ["Español"]
                }
            }}
        />
        <JsonLd<WebSiteSchema>
            item={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://oquanta.com/#website",
                url: "https://oquanta.com",
                name: "oQuanta",
                description: "Conoce qué piensan tus clientes sobre tu negocio gracias a la plataforma de encuestas de oQuanta.",
                publisher: { "@id": "https://oquanta.com/#organization" }
            }}
        />
        <JsonLd<WebPageSchema>
            item={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://oquanta.com/#webpage",
                url: "https://oquanta.com",
                name: "Página principal de oQuanta",
                inLanguage: "es",
                isPartOf: { "@id": "https://oquanta.com/#website" },
                primaryImageOfPage: firstImage,
                description: "Plataforma de encuestas de oQuanta que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios."
            }}
        />
        <JsonLd<ServiceSchema>
            item={{
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": "https://oquanta.com/#service",
                serviceType: "Plataforma de encuestas y recolección de datos de clientes",
                name: "Servicio de Encuestas oQuanta",
                description: "Recopila opiniones verificadas y mejora la experiencia de tus clientes con oQuanta.",
                provider: { "@id": "https://oquanta.com/#organization" },
                areaServed: "ES"
            }}
        />
    </>)

    return (
        <>
        {head}
                <section className="pt-4 pb-16 px-4" id="website">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h1 className="text-5xl font-bold text-pumpkin-orange mb-4">
                                    {t('heroTitle')}
                                </h1>
                                <p className="text-xl text-[#6B46FF] font-medium mb-8">
                                    {t('heroSubtitle')}
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                                        <p className="text-black-60">{t('heroFeatures.decisions')}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                                        <p className="text-black-60">{t('heroFeatures.loyalty')}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                                        <p className="text-black-60">{t('heroFeatures.promotions')}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0" />
                                        <p className="text-black-60">{t('heroFeatures.access')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <a href="/contact"
                                        className="inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors">
                                        {t('tryFree')}
                                    </a>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-[4/3] bg-black-30 rounded-lg">
                                    <LazyLoad height="450px">
                                        <img src={secondImage} alt={t('heroImageAlt')}
                                            className="w-full h-full object-cover rounded-lg" />
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-4 bg-white">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-4xl font-bold text-center text-pumpkin-orange mb-12">
                            {t('trustTitle')}
                        </h2>
                        <TrustCarousel />
                    </div>
                </section>

                <section className="py-16 px-4" id="webpage">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-[#6B46FF] font-bold mb-4">{t('whyTitle')}</h2>
                                <h3 className="text-4xl font-bold text-pumpkin-orange mb-6">
                                    {t('whySubtitle')}
                                </h3>
                                <p className="text-black-60 mb-6">
                                    {t('whyDescription1')}
                                </p>
                                <p className="text-black-60 mb-8">
                                    {t('whyDescription2')}
                                </p>
                                <div className="flex items-center justify-center">
                                    <a href="/contact"
                                        className="mx-auto inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors">
                                        {t('tryFree2')}
                                    </a>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-[4/3] bg-black-30 rounded-lg">
                                    <LazyLoad height="450px">
                                        <img src={firstImage} alt={t('whyImageAlt')}
                                            className="w-full h-full object-cover rounded-lg" />
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-4" id="service">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h2 className="text-4xl font-bold text-[#6B46FF] mb-16">
                            {t('stepsTitle')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <div className="text-center mb-6">
                                    <div className="inline-flex flex-col items-center">
                                        <span
                                            className="inline-block w-16 h-16 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center mb-2">
                                            <ClipboardEdit className="w-8 h-8" />
                                        </span>
                                        <span
                                            className="inline-block w-8 h-8 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center">1</span>
                                    </div>
                                </div>
                                <h3 className="font-bold mb-2 text-black">{t('steps.configure.title')}</h3>
                                <p className="text-black-60">{t('steps.configure.description')}</p>
                            </div>
                            <div>
                                <div className="text-center mb-6">
                                    <div className="inline-flex flex-col items-center">
                                        <span
                                            className="inline-block w-16 h-16 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center mb-2">
                                            <QrCodeIcon className="w-8 h-8" />
                                        </span>
                                        <span
                                            className="inline-block w-8 h-8 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center">2</span>
                                    </div>
                                </div>
                                <h3 className="font-bold mb-2 text-black">{t('steps.distribute.title')}</h3>
                                <p className="text-black-60">{t('steps.distribute.description')}</p>
                            </div>
                            <div>
                                <div className="text-center mb-6">
                                    <div className="inline-flex flex-col items-center">
                                        <span
                                            className="inline-block w-16 h-16 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center mb-2">
                                            <BarChart2 className="w-8 h-8" />
                                        </span>
                                        <span
                                            className="inline-block w-8 h-8 rounded-full bg-[#6B46FF] text-white font-bold flex items-center justify-center">3</span>
                                    </div>
                                </div>
                                <h3 className="font-bold mb-2 text-black">{t('steps.analyze.title')}</h3>
                                <p className="text-black-60">{t('steps.analyze.description')}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}

export default Index;