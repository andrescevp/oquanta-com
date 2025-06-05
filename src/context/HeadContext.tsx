import React, { createContext, useContext, useState } from 'react'

interface HeadContextType {
  title: string
  description: string
  canonicalLink: string
  extraNodes?: React.ReactNode[]
  updateHead: (data: Partial<HeadData>) => void
}

export interface HeadData {
  title: string
  description: string
  canonicalLink: string
  extraNodes?: React.ReactNode[]
}

const HeadContext = createContext<HeadContextType | undefined>(undefined)

const DEFAULT_HEAD_DATA: HeadData = {
  title: 'oQuanta - Inteligencia de negocio para hostelería',
  description:
    'Plataforma de encuestas de oQuanta que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios.',
  canonicalLink: 'https://www.oquanta.com/'
}

export const HeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headData, setHeadData] = useState<HeadData>(DEFAULT_HEAD_DATA)

  const updateHead = (newData: Partial<HeadData>) => {
    if (typeof window === 'undefined') {
      // Evitar actualizaciones del head en el servidor
      return
    }
    if (newData.canonicalLink === headData.canonicalLink) {
      // Evitar actualizaciones innecesarias
      return
    }
    console.log('Actualizando head con:', newData, headData)
    // Usar setTimeout para evitar actualizaciones anidadas durante el hot reload
    setHeadData(prev => {
      if (!prev) {
        return newData as HeadData
      }
      return {
        ...prev,
        ...newData
      }
    })
  }

  const contextValue = React.useMemo(() => {
    return {
      ...headData,
      updateHead
    } as HeadContextType
  }, [headData])

  return <HeadContext.Provider value={contextValue}>{children}</HeadContext.Provider>
}

export const useHead = () => {
  const context = useContext(HeadContext)
  if (context === undefined) {
    throw new Error('useHead must be used within a HeadProvider')
  }
  return context
}
