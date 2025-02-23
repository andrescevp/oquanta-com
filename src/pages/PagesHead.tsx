import React from 'react'
import { JsonLd } from 'react-schemaorg'
import { Organization } from 'schema-dts'
import { Head } from 'vite-react-ssg'

import { useHead } from '../context/HeadContext'

import headerImage from './../../images/oquanta-logo-transparent.png?h=80&format=png'

const PagesHead: React.FC = () => {
  const { title, description, canonicalLink, extraNodes } = useHead()

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest.json' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='canonical' href={canonicalLink} />
        {extraNodes && extraNodes}
      </Head>
      <JsonLd<Organization>
        item={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://oquanta.com/#organization',
          name: 'oQuanta',
          url: 'https://oquanta.com',
          logo: headerImage,
          description: 'oQuanta ofrece una plataforma de encuestas para recopilar opiniones de tus clientes, mejorar sus experiencias y potenciar tu negocio.',
          email: 'hola@oquanta.com',
          telephone: '+34 660220216',
          image: headerImage,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Burgos',
            addressCountry: 'ES'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+34 660220216',
            contactType: 'customer support',
            areaServed: 'ES',
            availableLanguage: ['Español']
          }
        }}
      />
    </>
  )
}

export default PagesHead
