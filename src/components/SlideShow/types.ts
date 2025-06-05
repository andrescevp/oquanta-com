export interface SlideShowProps {
  children: React.ReactNode[]
  width?: string | number
  height?: string | number
  className?: string
}

export interface SlideProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  duration?: number
}