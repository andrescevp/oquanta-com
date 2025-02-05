export const translations = {
  es: {
    // navbar
    navbar: {
      contact: "Contacto"
    },

    // Header
    tagline: "Speak up. Shape the future",
    tryFree: "Prueba Gratis",
    tryFree2: "Quiero probarlo",

    // Hero
    heroTitle: "Conoce qué piensan tus clientes sobre tu negocio",
    heroSubtitle: "Escucha a tus clientes; impulsa tu éxito",
    heroFeatures: {
      decisions: "Toma decisiones basadas en las opiniones de tus clientes.",
      loyalty: "Impulsa la lealtad mediante recompensas.",
      promotions: "Haz que tus promociones lleguen a más gente gracias a nuestra comunidad.",
      access: "Acceso inmediato a datos clave.",
    },

    // Trust section
    trustTitle: "Confían en nosotros",
    trustImageAlt: "Logo de empresa que confía en nosotros",

    // Why section
    whyTitle: "Tu aliado estratégico",
    whySubtitle: "¿Por qué oQuanta es lo que tu negocio necesita?",
    whyDescription1: "Plataformas como Google Maps o Tripadvisor no ofrecen opiniones verificadas ni cuantitativas sobre la experiencia de tus clientes.",
    whyDescription2: "Con oQuanta, obtendrás información detallada para mejorar tus servicios y captar más clientes; imagina saber que el 80% de tus clientes considera la limpieza de tu local como «Excelente».",

    // Steps section
    stepsTitle: "Recopila información valiosa en 3 pasos:",
    steps: {
      configure: {
        title: "Configura tu encuesta",
        description: "Elige entre encuestas tipo o personalizadas que se adapten a tus necesidades."
      },
      distribute: {
        title: "Distribuye el QR en tu local",
        description: "Nuestros materiales promocionales facilitan que tus clientes participen."
      },
      analyze: {
        title: "Recibe y analiza los datos",
        description: "Accede a resultados en tiempo real y actúa de inmediato."
      }
    },

    // Contact form
    contactTitle: "¿Listo para llevar tu negocio al siguiente nivel?",
    contactDescription: "Déjanos tus datos y te contactaremos para explicarte cómo oQuanta puede ayudarte a mejorar la experiencia de tus clientes y potenciar tu negocio.",
    form: {
      businessName: "Nombre del local",
      contactPerson: "Persona de Contacto",
      phone: "Teléfono",
      required: "Campo requerido",
      submit: "Enviar"
    },

    // Footer
    contact: "Contacto:",
    location: "📍 Burgos",
    email: "hola@oquanta.com",
    phone: "669202916",

    // Accessibility
    carousel: {
      prevSlide: "Slide anterior",
      nextSlide: "Siguiente slide",
      goToSlide: "Ir al slide"
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.es;

export const currentLanguage: Language = "es";

export function t(key: string): string {
  const keys = key.split(".");
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    value = value[k];
    if (value === undefined) return key;
  }
  
  return value as string;
}