import React, {useState} from 'react';
import { useTranslation } from "react-i18next";
import { Head } from "vite-react-ssg";
import { JsonLd } from "react-schemaorg";
import { ContactPage as ContactPageSchema } from 'schema-dts';
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

function Contact() {
  const { t } = useTranslation();
    useCalendlyEventListener({
      //onProfilePageViewed: () => console.log("onProfilePageViewed"),
      //onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
      //onEventTypeViewed: () => console.log("onEventTypeViewed"),
      //onEventScheduled: (e) => console.log(e.data.payload),
      onPageHeightResize: (e) => {
        const { height: pHeight } = e.data.payload;
        // remove px from height
        const pHeightInt = parseInt(pHeight.replace("px", ""));
        const minHeightInt = parseInt(minHeight.replace("px", ""));
        if (pHeightInt > minHeightInt) {
            setHeight(pHeightInt + "px");
            return;
        }
      },
    });

    const minHeight = "598px";
    const [height, setHeight] = useState(minHeight);
    
    const head = (<>
        <Head>
            <meta charSet="UTF-8" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest.json" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>oQuanta - Inteligencia y analitica para hosteleria</title>
            <meta name="description" content="Contacta con oQuanta para llevar tu negocio al siguente nivel" />
            <link rel="canonical" href="http://www.oquanta.com" />
        </Head>
        <JsonLd<ContactPageSchema>
                item={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": t('¿Listo para llevar tu negocio al siguiente nivel?'),
                    "description": t('Déjanos tus datos y te contactaremos para explicarte cómo oQuanta puede ayudarte a mejorar la experiencia de tus clientes y potenciar tu negocio.'),
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
                            {t('¿Listo para llevar tu negocio al siguiente nivel?')}
                        </h2>
                        <p className="text-center text-black-60 mb-8">
                            {t('Déjanos tus datos y te contactaremos para explicarte cómo oQuanta puede ayudarte a mejorar la experiencia de tus clientes y potenciar tu negocio.')}
                        </p>
                        <InlineWidget url="https://calendly.com/hola-oquanta/como-me-puede-ayudar-oquanta-a-mejorar-mi-negocio" styles={{
                            height: height,
                            transition: "height 0.5s",
                        }} />
                    </div>
                </section>
            </>
    );
}

export default Contact;