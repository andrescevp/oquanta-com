import { Instagram } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useCalendlyEventListener, InlineWidget } from 'react-calendly'
import { useTranslation } from 'react-i18next'
import { JsonLd } from 'react-schemaorg'
import { ContactPage as ContactPageSchema } from 'schema-dts'

import { useHead } from '../context/HeadContext'
import { useMenu } from '../context/MenuContext'
import { MenuItemCTA, MenuItemSimpleClassName, MenuItemSpecial } from '../layout/Navbar'

function Contact() {
  const { t } = useTranslation()
  const { updateHead } = useHead()
  useCalendlyEventListener({
    // onProfilePageViewed: () => console.log("onProfilePageViewed"),
    // onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    // onEventTypeViewed: () => console.log("onEventTypeViewed"),
    // onEventScheduled: (e) => console.log(e.data.payload),
    onPageHeightResize: e => {
      const { height: pHeight } = e.data.payload
      // remove px from height
      const pHeightInt = parseInt(pHeight.replace('px', ''))
      const minHeightInt = parseInt(minHeight.replace('px', ''))
      if (pHeightInt > minHeightInt) {
        setHeight(pHeightInt + 'px')
      }
    }
  })

  const minHeight = '598px'
  const [height, setHeight] = useState(minHeight)

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
        href: '/contact',
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
    title: t('¿Listo para llevar tu negocio al siguiente nivel?') + ' - oQuanta',
    description: t(
      'Déjanos tus datos y te contactaremos para explicarte cómo oQuanta puede ayudarte a mejorar la experiencia de tus clientes y potenciar tu negocio.'
    ),
    canonicalLink: 'https://www.oquanta.com/contact'
  })

  return (
    <>
      <JsonLd<ContactPageSchema>
        item={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('¿Listo para llevar tu negocio al siguiente nivel?'),
          description: t(
            'Déjanos tus datos y te contactaremos para explicarte cómo oQuanta puede ayudarte a mejorar la experiencia de tus clientes y potenciar tu negocio.'
          ),
          url: 'https://www.oquanta.com/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'Oquanta',
            url: 'https://www.oquanta.com',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-800-555-5555',
              contactType: 'Customer Service',
              areaServed: 'ES',
              availableLanguage: 'Spanish'
            }
          }
        }}
      />
      <section className="py-16 px-4 snap-center" id="contact-form">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-black mb-4">
            {t('¿Listo para llevar tu negocio al siguiente nivel?')}
          </h2>
          <p className="text-center text-black-60 mb-8">
            {t(
              'Déjanos tus datos y te contactaremos para explicarte cómo oQuanta puede ayudarte a mejorar la experiencia de tus clientes y potenciar tu negocio.'
            )}
          </p>
          <InlineWidget
            url="https://calendly.com/hola-oquanta/como-me-puede-ayudar-oquanta-a-mejorar-mi-negocio"
            styles={{
              height,
              transition: 'height 0.5s'
            }}
          />
        </div>
      </section>
    </>
  )
}

export default Contact
