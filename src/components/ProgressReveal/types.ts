export interface ProgressRevealProps {
  children: React.ReactNode[]
  className?: string
  delay?: number
  duration?: number
}

export interface ProgressItemProps {
  children: React.ReactNode
  isVisible: boolean
  index: number
  delay: number
  duration: number
}
