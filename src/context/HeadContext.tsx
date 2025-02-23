import React, { createContext, useContext, useState } from 'react';

interface HeadContextType {
  title: string;
  description: string;
  canonicalLink: string;
  updateHead: (data: Partial<HeadData>) => void;
}

interface HeadData {
  title: string;
  description: string;
  canonicalLink: string;
}

const HeadContext = createContext<HeadContextType | undefined>(undefined);

export const HeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headData, setHeadData] = useState<HeadData>({
    title: 'oQuanta',
    description: 'Plataforma de encuestas de oQuanta que te ayuda a recopilar feedback real de tus clientes y mejorar tus servicios.',
    canonicalLink: 'https://www.oquanta.com'
  });

  const updateHead = (newData: Partial<HeadData>) => {
    setHeadData(prev => ({ ...prev, ...newData }));
  };

  return (
    <HeadContext.Provider value={{ ...headData, updateHead }}>
      {children}
    </HeadContext.Provider>
  );
};

export const useHead = () => {
  const context = useContext(HeadContext);
  if (context === undefined) {
    throw new Error('useHead must be used within a HeadProvider');
  }
  return context;
};