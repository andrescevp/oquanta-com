import React from 'react';
import { t } from '../translations.ts';
import { Head } from "vite-react-ssg";
import { JsonLd } from "react-schemaorg";
import { InlineWidget } from "react-calendly";
import { ContactPage as ContactPageSchema } from 'schema-dts';

function Contact() {
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
        <JsonLd<ContactPageSchema>
                item={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": t('contactTitle'),
                    "description": t('contactDescription'),
                    "url": "https://www.oquanta.com/contact",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Oquanta",
                        "url": "https://www.oquanta.com",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+1-800-555-5555",
                            "contactType": "Customer Service",
                            "areaServed": "ES",
                            "availableLanguage": "Spanish"
                        }
                    }
                }}
            />
    </>)

    return (
        <>
        {head}
                <section className="py-16 px-4 snap-center" id="contact-form">
                    <div className="container mx-auto max-w-2xl">
                        <h2 className="text-4xl font-bold text-center text-black mb-4">
                            {t('contactTitle')}
                        </h2>
                        <p className="text-center text-black-60 mb-8">
                            {t('contactDescription')}
                        </p>
                        <InlineWidget url="https://calendly.com/hola-oquanta/como-me-puede-ayudar-oquanta-a-mejorar-mi-negocio" styles={{
                            height: '1000px'
                        }} />
                        {/*{root && <PopupWidget*/}
                        {/*    url="https://calendly.com/hola-oquanta/como-me-puede-ayudar-oquanta-a-mejorar-mi-negocio"*/}
                        {/*    rootElement={root}*/}
                        {/*    text="Click here to schedule!"*/}
                        {/*    textColor="#ffffff"*/}
                        {/*    color="#00a2ff"*/}
                        {/*/>}*/}
                        {/*<AutoIframe src="https://survey.oquanta.com/872855?newtest=Y&lang=es"*/}
                        {/*            title="Formulario de contacto"/>*/}
                    </div>
                </section>
            </>
    );
}

export default Contact;