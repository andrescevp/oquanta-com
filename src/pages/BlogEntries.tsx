import React from 'react';
import { JsonLd } from "react-schemaorg";
import { Blog as BlogSchema } from 'schema-dts';
import pages from '../BlogEntries.ts';
import PagesHead from './PagesHead.tsx';
import { useTranslation } from "react-i18next";


function BlogEntries() {
  const { t } = useTranslation();
    return (
        <>
        <PagesHead title={t('Blog de oQuanta')} description={t('Artículos de ayuda para restauradores y hosteleros')} cannonicalLink="http://www.oquanta.com/blog" />
        <JsonLd<BlogSchema>
                item={{
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "@id": "https://www.oquanta.com/#blog",
                    "headline": `${t('blog.title')}`,
                    "description": `${t('blog.description')}`,
                    "publisher": {
                        "@id": "https://www.oquanta.com/#organization",
                    }
                }}
            />
        <section className="text-gray-600 body-font" id='blog'>
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{t('Blog de oQuanta')}</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{t('Artículos de ayuda para restauradores y hosteleros')}</p>
    </div>
    <div className="flex flex-wrap">
        {Object.values(pages).map((page) => (<div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{page.fields.title}</h2>
        <p className="leading-relaxed text-base mb-4">{page.fields.description}</p>
        <a className="text-indigo-500 inline-flex items-center" href={`/blog/${page.fields.slug}`}>
          {t('Leer más')}
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>))}
    </div>
  </div>
</section>

<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto shadow-md p-8">
      <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Quiero mejorar mi negocio y conocer que piensan mis clientes</h1>
      <a href="/contact"
          className="text-center inline-block bg-pumpkin-orange text-white px-8 py-3 rounded-full font-medium hover:bg-pumpkin-orange-60 transition-colors">
          {t('Recibir mas información')}
      </a>    
      </div>
  </div>
</section>
            </>
    );
}

export default BlogEntries;
