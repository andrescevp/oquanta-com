import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: never // Contentful Rich Text
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0 bg-white">
      <button
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium text-left text-gray-900">{question}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-pumpkin-orange" />
        ) : (
          <ChevronDown className="w-5 h-5 text-pumpkin-orange" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div
          className="px-6 pb-4 prose prose-orange"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(answer)
          }}
        />
      </div>
    </div>
  )
}

export default FaqItem
