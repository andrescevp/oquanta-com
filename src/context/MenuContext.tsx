import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface MenuItem {
  children: React.ReactNode
  href: string
  className?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  allwaysVisible?: boolean
  icon?: React.ReactNode
  rel?: string
  position?: 'left' | 'right'
}

interface MenuContextType {
  menuItems: MenuItem[]
  updateMenuItem: (index: number, item: Partial<MenuItem>) => void
  addMenuItem: (item: MenuItem) => void
  removeMenuItem: (index: number) => void
  setMenuItems: (items: MenuItem[]) => void
}

interface MenuProviderProps {
  children: React.ReactNode
  initialItems?: MenuItem[]
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<MenuProviderProps> = ({ children, initialItems = [] }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems)

  const updateMenuItem = useCallback((index: number, item: Partial<MenuItem>) => {
    setMenuItems(prev => {
      const newItems = [...prev]
      newItems[index] = { ...newItems[index], ...item }
      return newItems
    })
  }, [])

  const addMenuItem = useCallback((item: MenuItem) => {
    setMenuItems(prev => [...prev, item])
  }, [])

  const removeMenuItem = useCallback((index: number) => {
    setMenuItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        updateMenuItem,
        addMenuItem,
        removeMenuItem,
        setMenuItems
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = (initialItems?: MenuItem[]) => {
  const context = useContext(MenuContext)

  if (context === undefined) {
    throw new Error('useMenu debe usarse dentro de un MenuProvider')
  }

  // Actualizar menú cuando cambie la ruta o los items iniciales
  useEffect(() => {
    if (initialItems) {
      context.setMenuItems(initialItems)
    }
  }, [initialItems, context.setMenuItems])

  return context
}
