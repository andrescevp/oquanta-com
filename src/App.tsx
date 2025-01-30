import React from 'react';
import {BarChart2, CheckCircle2, ClipboardEdit, Instagram, QrCode as QrCodeIcon, Send} from 'lucide-react';
import {t} from './translations';
import {TrustCarousel} from "./TrustCarousel.tsx";
import firstImage from './../images/Banner-Web-B2B-1024x1024.png?w=450&format=webp';
import secondImage from './../images/Banner-Web-B2B-1-1024x1024.png?w=450&format=webp';
import {Head} from "vite-react-ssg";
import {AutoIframe} from "./AutoIframe.tsx";
import WhatsAppButton from "./WhatsAppButton.tsx";

function App() {
  return (
      <div className="min-h-screen bg-[#FFF9F5]">
        <Head>
          <meta charSet="utf-8"/>
          <title>oQuanta - Inteligencia y analitica para hosteleria</title>
          <meta name="description"
                content="oQuanta es una plataforma de inteligencia y analitica para hosteleria que te ayuda a tomar decisiones basadas en datos."/>
          <link rel="canonical" href="http://www.oquanta.com"/>
        </Head>
        <header className="bg-white shadow-sm fixed w-full z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex flex-col items-start">
              <div className="text-2xl font-bold text-pumpkin-orange">oQuanta.</div>
              <div className="text-xs text-black-60 uppercase tracking-wider">{t('tagline')}</div>
            </div>
            <nav className="flex gap-4 items-center">
              <a href="#contanct-form"
                 className="bg-pumpkin-orange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pumpkin-orange-60">
                {t('tryFree')}
              </a>
              <a href="https://instagram.com/oquanta_es" className="text-black p-2 hover:text-pumpkin-orange" target="_blank">
                <Instagram className="w-5 h-5"/>
              </a>
            </nav>
          </div>
        </header>

        <section className="pt-32 pb-16 px-4">
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
                    <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0"/>
                    <p className="text-black-60">{t('heroFeatures.decisions')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0"/>
                    <p className="text-black-60">{t('heroFeatures.loyalty')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0"/>
                    <p className="text-black-60">{t('heroFeatures.promotions')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lime-green mt-1 flex-shrink-0"/>
                    <p className="text-black-60">{t('heroFeatures.access')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <a href="#contanct-form"
                     className="inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors">
                    {t('tryFree')}
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-black-30 rounded-lg">
                  <img src={secondImage} alt={t('heroImageAlt')} className="w-full h-full object-cover rounded-lg"/>
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
            <TrustCarousel/>
          </div>
        </section>

        <section className="py-16 px-4">
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
                <a href="#contanct-form"
                   className="inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors">
                  {t('tryFree')}
                </a>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-black-30 rounded-lg">
                  <img src={firstImage} alt={t('whyImageAlt')} className="w-full h-full object-cover rounded-lg"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
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
                    <ClipboardEdit className="w-8 h-8"/>
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
                    <QrCodeIcon className="w-8 h-8"/>
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
                    <BarChart2 className="w-8 h-8"/>
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

        <section className="py-16 px-4 bg-[#C0F03E]" id="contanct-form">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-center text-black mb-4">
              {t('contactTitle')}
            </h2>
            <p className="text-center text-black-60 mb-8">
              {t('contactDescription')}
            </p>
            <AutoIframe src="https://survey.oquanta.com/872855?newtest=Y&lang=es" title="Formulario de contacto"/>
          </div>
        </section>

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
                <p>{t('email')}</p>
                <p>{t('phone')}</p>
              </div>
            </div>
          </div>
        </footer>
        <WhatsAppButton phoneNumber="34669202916" message="Hola, me gustaría saber más sobre oQuanta."/>
      </div>
  );
}

export default App;