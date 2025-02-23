import { useCallback } from 'react'

export const useSmoothScroll = (offset = 80) => {
  const scrollToElement = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const href = e.currentTarget.getAttribute('href')

      if (href?.startsWith('#')) {
        const targetId = href.replace('/#', '#')
        const element = document.querySelector(targetId)

        if (element) {
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })

          // Actualizar la URL sin causar scroll
          window.history.pushState({}, '', href)
        }
      } else if (href?.includes('#')) {
        // Para enlaces como /page#section
        const [path, hash] = href.split('#')
        if (window.location.pathname === path) {
          e.preventDefault()
          const element = document.getElementById(hash)

          if (element) {
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })

            // Actualizar la URL sin causar scroll
            window.history.pushState({}, '', href)
          }
        }
      }
    },
    [offset]
  )

  return { scrollToElement }
}
