import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import React, { Fragment } from 'react'

import { useSmoothScroll } from '../hooks/useSmoothScroll'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  menuItems: Array<{
    name: string
    href: string
    className?: string
    target?: string
    rel?: string
    position?: 'left' | 'right'
  }>
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, menuItems }) => {
  const { scrollToElement } = useSmoothScroll()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.href.includes('#')) {
      scrollToElement(e)
    }
    onClose()
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden md:hidden" onClose={onClose}>
        {/* Panel de fondo con click para cerrar */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 flex max-w-full">
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xl font-semibold text-pumpkin-orange">
                      Menú
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500"
                      onClick={onClose}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="flex flex-col space-y-4">
                    {/* Enlaces de la izquierda */}
                    <div className="space-y-2">
                      {menuItems
                        .filter(item => item.position === 'left')
                        .map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="block w-full px-4 py-2 text-left text-base font-medium text-gray-900 hover:bg-gray-100 rounded-lg"
                            onClick={handleClick}
                            target={item.target}
                            rel={item.rel}
                          >
                            {item.name}
                          </a>
                        ))}
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-200" />

                    {/* Enlaces de la derecha */}
                    <div className="space-y-2">
                      {menuItems
                        .filter(item => item.position === 'right')
                        .map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="block w-full px-4 py-2 text-left text-base font-medium text-gray-900 hover:bg-gray-100 rounded-lg"
                            onClick={handleClick}
                            target={item.target}
                            rel={item.rel}
                          >
                            {item.name}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Sidebar
