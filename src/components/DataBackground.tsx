import React, { useEffect, useRef, useCallback } from 'react'

interface Point {
  x: number
  y: number
  z: number
  size: number
  color: string
}

interface Satellite {
  x: number
  y: number
  z: number
  rotation: number
  orbitRadius: number
  orbitSpeed: number
  colorSwitch: boolean // Nueva propiedad
  lastColorSwitch: number // Nueva propiedad
}

interface DataBackgroundProps {
  isContentLoaded: boolean
}

const DataBackground: React.FC<DataBackgroundProps> = ({ isContentLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const pointsRef = useRef<Point[]>([])
  const rotationRef = useRef({ y: 0 })
  const satellitesRef = useRef<Satellite[]>([])

  const AXIS_TILT = 23.5
  const ROTATION_SPEED = -0.2
  const NUM_SATELLITES = 10

  const generatePoints = useCallback((size: number) => {
    const points: Point[] = []
    const numPoints = 10000
    const phi = Math.PI * (3 - Math.sqrt(5))

    const colorPalette = [
      ['#1d1d1b', '#5b5a57', '#b8b6b2'],
      ['#5a33ee', '#876AEF', '#CBBDF1'],
      ['#fd5304', '#fc8146', '#fbc6ab'],
      ['#c0f03e', '#D0F270', '#E9F5BD']
    ]

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      const randomGroup = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      const color = randomGroup[Math.floor(Math.random() * randomGroup.length)]

      points.push({
        x: x * (size / 2),
        y: y * (size / 2),
        z: z * (size / 2),
        size: Math.random() * 2 + 1,
        color
      })
    }

    return points
  }, [])

  const generateSatellites = useCallback((size: number) => {
    const satellites: Satellite[] = []
    const baseOrbitRadius = size * 0.8 // Radio de órbita base

    for (let i = 0; i < NUM_SATELLITES; i++) {
      const angle = (i / NUM_SATELLITES) * Math.PI * 2
      satellites.push({
        x: Math.cos(angle) * baseOrbitRadius,
        y: Math.sin(angle) * baseOrbitRadius * 0.4, // Órbita elíptica
        z: Math.sin(angle) * baseOrbitRadius,
        rotation: Math.random() * Math.PI * 2,
        orbitRadius: baseOrbitRadius,
        orbitSpeed: 0.0002 + Math.random() * 0.000000001,
        colorSwitch: false,
        lastColorSwitch: performance.now()
      })
    }
    return satellites
  }, [])

  const drawSmartphone = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      rotation: number,
      scale: number,
      colorSwitch: boolean
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.scale(scale, scale)

      // Dibujar el smartphone
      ctx.beginPath()
      ctx.roundRect(-15, -25, 30, 50, 5)
      ctx.fillStyle = '#333'
      ctx.fill()

      // Pantalla
      ctx.beginPath()
      ctx.roundRect(-13, -23, 26, 46, 3)
      ctx.fillStyle = colorSwitch ? '#fd5304' : '#fff'
      ctx.fill()

      // Q mayúscula
      ctx.font = 'bold 18px sans-serif'
      ctx.fillStyle = colorSwitch ? '#fff' : '#fd5304'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Q', 0, 0)

      ctx.restore()
    },
    []
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = window.innerWidth
    const height = window.innerHeight

    // Ajustar el canvas al DPI del dispositivo
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)

    const angle = ((rotationRef.current.y % 360) * Math.PI) / 180
    const tiltAngle = (AXIS_TILT * Math.PI) / 180

    // Crear un array con todos los elementos renderizables
    const renderableElements: Array<{
      type: 'point' | 'satellite'
      z: number
      render: () => void
    }> = []

    // Agregar puntos al array de renderizado
    pointsRef.current.forEach(point => {
      const x = point.x
      const y = point.y * Math.cos(tiltAngle) - point.z * Math.sin(tiltAngle)
      const z = point.y * Math.sin(tiltAngle) + point.z * Math.cos(tiltAngle)

      const newX = x * Math.cos(angle) + z * Math.sin(angle)
      const newZ = -x * Math.sin(angle) + z * Math.cos(angle)

      renderableElements.push({
        type: 'point',
        z: newZ,
        render: () => {
          const screenX = width / 2 + newX
          const screenY = height / 2 + y

          const opacity = 0.15 + (1 - Math.abs(newZ) / (height / 2)) * 0.85
          const size = point.size * (1 + newZ / (height * 1.5))

          ctx.beginPath()
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fillStyle = point.color
          ctx.globalAlpha = opacity
          ctx.fill()
        }
      })
    })

    // Agregar satélites al array de renderizado
    satellitesRef.current.forEach(satellite => {
      const now = performance.now()
      // Cambiar colores cada 2 segundos
      const randTime = Math.random() * 2000 + 1000
      if (now - satellite.lastColorSwitch > randTime) {
        satellite.colorSwitch = !satellite.colorSwitch
        satellite.lastColorSwitch = now
      }

      const orbitAngle = now * satellite.orbitSpeed
      const x = satellite.x * Math.cos(orbitAngle) + satellite.z * Math.sin(orbitAngle)
      const z = -satellite.x * Math.sin(orbitAngle) + satellite.z * Math.cos(orbitAngle)

      const finalZ = -x * Math.sin(angle) + z * Math.cos(angle)

      renderableElements.push({
        type: 'satellite',
        z: finalZ,
        render: () => {
          const screenX = width / 2 + x * Math.cos(angle) + z * Math.sin(angle)
          const screenY = height / 2 + satellite.y
          const scale = 0.8 + (1 - Math.abs(finalZ) / (height * 1.5))

          satellite.rotation += 0.01
          drawSmartphone(ctx, screenX, screenY, satellite.rotation, scale, satellite.colorSwitch)
        }
      })
    })

    // Ordenar todos los elementos por Z y renderizar
    renderableElements
      .sort((a, b) => b.z - a.z)
      .forEach(element => {
        ctx.globalAlpha = 1
        element.render()
      })

    // Actualizar rotación
    rotationRef.current.y -= ROTATION_SPEED
    animationRef.current = requestAnimationFrame(draw)
  }, [drawSmartphone])

  useEffect(() => {
    if (!isContentLoaded || !canvasRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight
    const size = Math.max(500, Math.min(width, height) * 0.6)

    pointsRef.current = generatePoints(size)
    satellitesRef.current = generateSatellites(size)
    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isContentLoaded, generatePoints, generateSatellites, draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: -1,
        width: '100%',
        height: '100%'
      }}
      aria-hidden="true"
    />
  )
}

export default React.memo(DataBackground)
