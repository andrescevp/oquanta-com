import React from 'react'
import { RiWhatsappFill } from 'react-icons/ri'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message = '' }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <RiWhatsappFill className="w-6 h-6" />
    </a>
  )
}

export default WhatsAppButton
