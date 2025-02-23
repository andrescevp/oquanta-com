import React from 'react';
import FaqItem from './FaqItem';
import faqEntries from '../FaqEntries';
import { useTranslation } from "react-i18next";

const FaqSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 px-4 bg-white" id="faq">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-pumpkin-orange mb-12">
          {t('Preguntas frecuentes')}
        </h2>
        
        <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
          {Object.values(faqEntries).map((entry) => (
            <FaqItem
              key={entry.sys.id}
              question={entry.fields.question}
              answer={entry.fields.answer as never}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;