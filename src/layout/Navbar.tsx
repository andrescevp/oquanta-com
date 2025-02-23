import { Instagram, MenuIcon } from "lucide-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import LazyLoad from "react-lazy-load"

import Sidebar from "../components/Sidebar"
import { useMenu } from "../context/MenuContext"


import headerImage from './../../images/oquanta-logo-transparent.png?h=80&format=png'

const MenuItemSimpleClassName = 'text-black hover:text-pumpkin-orange'
const MenuItemCTA = 'text-center shadow-md bg-pumpkin-orange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pumpkin-orange-60 hover:text-iris-purple font-semibold w-fit'
const MenuItemSpecial = 'text-center shadow-md bg-pure-white px-4 py-2 rounded-full border border-pumpkin-orange hover:pumpkin-orangepumpkin-orange text-sm font-medium text-pumpkin-orange hover:bg-pumpkin-orange-30 hover:text-iris-purple font-semibold'

const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { menuItems } = useMenu([
    {
      name: t('Beneficios'),
      href: '/#beneficios',
      className: MenuItemSpecial,
      position: 'left',
    },
    {
      name: t('Cómo Funciona?'),
      href: '/#como-funciona',
      className: MenuItemSpecial,
      position: 'left',
    },
    {
      name: t('Testimonios'),
      href: '/#testimonios',
      className: MenuItemSpecial,
      position: 'left',
    },
    {
      name: t('Noticias'),
      href: '/#noticias',
      className: MenuItemSpecial,
      position: 'left',
    },
    {
      name: t('Blog'),
      href: '/blog',
      className: MenuItemSpecial,
      position: 'right',
    },
    {
      name: t('Prueba Gratis'),
      href: '/contact',
      className: MenuItemCTA,
      allwaysVisible: true,
      position: 'right',
    },
    {
      name: t('Instagram de oQuanta'),
      href: 'https://instagram.com/oquanta_es',
      className: MenuItemSimpleClassName,
      icon: <Instagram className='w-5 h-5' />,
      target: '_blank',
      rel: 'noopener noreferrer',
      allwaysVisible: true,
      position: 'right',
    },
  ]);

  return (
    <header className="bg-pure-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto py-4 flex justify-between items-center h-32 max-w-6xl space-x-4">
        <div className='flex items-start w-fit text-left'>
          <a href='/' className='flex items-center w-auto ml-4 lg:ml-0'>
            <LazyLoad>
              <img
                src={headerImage}
                alt='oQuanta'
                className='object-scale-down aspect-auto'
              />
            </LazyLoad>
          </a>
        </div>
        <nav className='flex items-center justify-end w-full'>
          {/* Enlaces escritorio que se ocultan */}
          <div className='hidden md:flex md:items-center md:space-x-2 md:justify-center flex-grow'>
            {menuItems
              .filter(item => !item.allwaysVisible && item.position === 'left')
              .map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={item.className}
                  target={item.target}
                  rel={item.rel}
                >
                  {item.icon ? item.icon : item.name}
                </a>
              ))}
          </div>

          <div className='flex justify-center space-x-2 items-center'>
            <div className='hidden md:flex md:items-center md:space-x-2'>
                {menuItems
                .filter(item => !item.allwaysVisible && item.position === 'right')
                .map((item, index) => (
                    <a
                    key={index}
                    href={item.href}
                    className={item.className}
                    target={item.target}
                    rel={item.rel}
                    >
                    {item.icon ? item.icon : item.name}
                    </a>
                ))}
            </div>

            {/* Enlaces siempre visibles */}
            {menuItems
            .filter(item => item.allwaysVisible && item.position === 'right')
            .map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className={item.className}
                    target={item.target}
                    rel={item.rel}
                    >
                    {item.icon ? item.icon : item.name}
                </a>
            ))}
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