import { MenuIcon } from 'lucide-react'
import React, { useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { Link } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import { MenuItem, useMenu } from '../context/MenuContext'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

import headerImage from './../../images/oquanta-logo-transparent.png?h=80&format=png'

export const MenuItemSimpleClassName = 'text-black hover:text-pumpkin-orange'
export const MenuItemCTA =
  'text-center shadow-md bg-pumpkin-orange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pumpkin-orange-60 hover:text-iris-purple font-semibold w-fit'
export const MenuItemSpecial =
  'text-center shadow-md bg-pure-white px-4 py-2 rounded-full border border-pumpkin-orange hover:pumpkin-orangepumpkin-orange text-sm font-medium text-pumpkin-orange hover:bg-pumpkin-orange-30 hover:text-iris-purple font-semibold'

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { menuItems } = useMenu()
  const { scrollToElement } = useSmoothScroll()

  const renderMenuItem = (item: MenuItem, index: number) => (
    <Link
      key={index}
      to={item.href}
      className={item.className}
      target={item.target}
      rel={item.rel}
      onClick={item.href.includes('#') ? scrollToElement : undefined}
    >
      {item.icon ? item.icon : item.children}
    </Link>
  )

  return (
    <header className="bg-pure-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto py-4 flex justify-between items-center h-32 max-w-6xl space-x-4">
        <div className="flex items-start w-fit text-left">
          <a href="/" className="flex items-center w-auto ml-4 lg:ml-0">
            <LazyLoad>
              <img src={headerImage} alt="oQuanta" className="object-scale-down aspect-auto" />
            </LazyLoad>
          </a>
        </div>
        <nav className="flex items-center justify-end w-full">
          {/* Enlaces escritorio que se ocultan */}
          <div className="hidden md:flex md:items-center md:space-x-2 md:justify-center flex-grow">
            {menuItems
              .filter(item => !item.allwaysVisible && item.position === 'left')
              .map((item, index) => renderMenuItem(item, index))}
          </div>

          <div className="flex justify-center space-x-2 items-center">
            <div className="hidden md:flex md:items-center md:space-x-2">
              {menuItems
                .filter(item => !item.allwaysVisible && item.position === 'right')
                .map((item, index) => renderMenuItem(item, index))}
            </div>

            {/* Enlaces siempre visibles */}
            {menuItems
              .filter(item => item.allwaysVisible && item.position === 'right')
              .map((item, index) => renderMenuItem(item, index))}
          </div>

          {/* Botón del menú móvil */}
          <button
            className="p-2 text-gray-600 hover:text-pumpkin-orange md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </nav>

        {/* Sidebar para móvil */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          menuItems={menuItems.filter(item => !item.allwaysVisible)}
        />
      </div>
    </header>
  )
}

export default Navbar
