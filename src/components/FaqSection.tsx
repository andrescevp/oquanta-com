import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { JsonLd } from 'react-schemaorg'
import { FAQPage } from 'schema-dts'

import faqEntries from '../FaqEntries'

import FaqItem from './FaqItem'

interface FaqSectionProps {
  className?: string
}

const FaqSection: React.FC<FaqSectionProps> = ({ className = 'py-16 px-4 bg-white/50' }) => {
  const { t } = useTranslation()
  return (
    <section className={className} id="faq">
      <JsonLd<FAQPage>
        item={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: Object.values(faqEntries).map(faq => {
            const answer = documentToHtmlString(faq.fields.answer as never)
            // html string to text
            const answerText = answer.replace(/<[^>]*>?/gm, '')

            return {
              '@type': 'Question',
              name: faq.fields.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: answerText
              }
            }
          }) as never
        }}
      />
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-pumpkin-orange mb-12">
          <span className="bg-white">{t('Preguntas frecuentes')}</span>
        </h2>

        <div className="bg-pure-white rounded-lg shadow-lg divide-y divide-gray-200">
          {Object.values(faqEntries).map(entry => (
            <FaqItem
              key={entry.sys.id}
              question={entry.fields.question}
              answer={entry.fields.answer as never}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
