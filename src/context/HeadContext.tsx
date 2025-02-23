import React, { createContext, useContext, useState, useCallback } from 'react'

interface HeadContextType {
  title: string;
  description: string;
  canonicalLink: string;
  extraNodes?: React.ReactNode[];
  updateHead: (data: Partial<HeadData>) => void;
}

export interface HeadData {
  title: string;
  description: string;
  canonicalLink: string;
  extraNodes?: React.ReactNode[];
}

const HeadContext = createContext<HeadContextType | undefined>(undefined)

const DEFAULT_HEAD_DATA: HeadData = {
  title: 'oQuanta',
  description: 'Plataforma de encuestas de oQuanta que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios.',
  canonicalLink: 'https://www.oquanta.com'
}

export const HeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headData, setHeadData] = useState<HeadData>(DEFAULT_HEAD_DATA)

  const updateHead = useCallback((newData: Partial<HeadData>) => {
    // Usar setTimeout para evitar actualizaciones anidadas durante el hot reload
    setTimeout(() => {
      setHeadData(prev => ({ ...prev, ...newData }))
    }, 0)
  }, [])

  const contextValue = React.useMemo(() => ({
    ...headData,
    updateHead
  }), [headData, updateHead])

  return (
    <HeadContext.Provider value={contextValue}>
      {children}
    </HeadContext.Provider>
  )
}

export const useHead = () => {
  const context = useContext(HeadContext)
  if (context === undefined) {
    throw new Error('useHead must be used within a HeadProvider')
  }
  return context
}
