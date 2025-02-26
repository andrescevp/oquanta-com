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

// Modificar la interfaz Wave
interface Wave {
  x: number
  y: number
  z: number
  radius: number
  maxRadius: number
  startTime: number
  duration: number
  color: string
  sourceX: number // Nueva propiedad para el origen del rayo
  sourceY: number
  sourceZ: number
  progress: number // Nueva propiedad para la animación
  targetX: number // Nueva propiedad para el destino
  targetY: number
  targetZ: number
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
  const wavesRef = useRef<Wave[]>([])

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

  // Reemplazar la función drawRay por drawGlowingSphere
  const drawGlowingSphere = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number
    ) => {
      // Crear gradiente radial para el efecto de brillo
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `${color}`)
      gradient.addColorStop(0.4, `${color}88`) // 88 es para 50% de transparencia
      gradient.addColorStop(1, `${color}00`) // 00 es para transparencia total

      ctx.save()
      ctx.globalAlpha = alpha

      // Efecto de resplandor
      ctx.shadowColor = color
      ctx.shadowBlur = radius * 0.5

      // Dibujar esfera brillante
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

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
    const now = performance.now()

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
      type: 'point' | 'satellite' | 'wave'
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

    // Modificar en la sección donde se manejan los satélites
    satellitesRef.current.forEach(satellite => {
      const now = performance.now()
      const randTime = Math.random() * 2000 + Math.random() * 2000 + 1000

      if (now - satellite.lastColorSwitch > randTime) {
        satellite.colorSwitch = !satellite.colorSwitch
        satellite.lastColorSwitch = now

        // Calcular posición del satélite considerando la rotación
        const orbitAngle = now * satellite.orbitSpeed
        const satX = satellite.x * Math.cos(orbitAngle) + satellite.z * Math.sin(orbitAngle)
        const satZ = -satellite.x * Math.sin(orbitAngle) + satellite.z * Math.cos(orbitAngle)

        // Calcular punto de impacto en la esfera
        const radius = Math.sqrt(satX * satX + satellite.y * satellite.y + satZ * satZ)
        const scale = 0.5 // Factor de escala para el punto de impacto
        const impactX = (satX * scale) / radius
        const impactY = (satellite.y * scale) / radius
        const impactZ = (satZ * scale) / radius

        // Crear una nueva onda en el punto de impacto
        wavesRef.current.push({
          x: impactX * satellite.orbitRadius,
          y: impactY * satellite.orbitRadius,
          z: impactZ * satellite.orbitRadius,
          radius: 0,
          maxRadius: 100,
          startTime: now,
          duration: 3000,
          color: '#fd5304',
          progress: 0,
          sourceX: satX,
          sourceY: satellite.y,
          sourceZ: satZ,
          targetX: impactX * satellite.orbitRadius,
          targetY: impactY * satellite.orbitRadius,
          targetZ: impactZ * satellite.orbitRadius
        })
      }
      // ... resto del código existente
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

    // Procesar y eliminar ondas antiguas
    wavesRef.current = wavesRef.current.filter(wave => {
      const elapsed = now - wave.startTime
      return elapsed < wave.duration
    })

    // Modificar en la sección de renderizado de ondas
    wavesRef.current.forEach(wave => {
      const progress = Math.max(0, Math.min(1, (now - wave.startTime) / wave.duration))
      wave.progress = progress // Actualizar el progreso
      const currentRadius = Math.max(0, wave.radius + wave.maxRadius * progress)

      renderableElements.push({
        type: 'wave',
        z: wave.z,
        render: () => {
          // Calcular posición en pantalla del punto de impacto
          const screenX = width / 2 + wave.x * Math.cos(angle) + wave.z * Math.sin(angle)
          const screenY = height / 2 + wave.y

          // Solo dibujar si el radio es positivo
          if (currentRadius > 0) {
            // Dibujar la onda
            ctx.beginPath()
            ctx.arc(screenX, screenY, currentRadius, 0, Math.PI * 2)
            ctx.strokeStyle = wave.color
            ctx.lineWidth = 2 * (1 - progress)
            ctx.globalAlpha = 0.5 * (1 - progress)
            ctx.stroke()

            // Animar esferas brillantes
            if (progress < 0.2) {
              // Calcular posición en pantalla del satélite fuente
              const sourceScreenX =
                width / 2 + wave.sourceX * Math.cos(angle) + wave.sourceZ * Math.sin(angle)
              const sourceScreenY = height / 2 + wave.sourceY

              // Interpolar posición de la esfera brillante
              const sphereProgress = progress * 5 // Multiplicar por 5 para que la animación sea más rápida
              const sphereX = sourceScreenX + (screenX - sourceScreenX) * sphereProgress
              const sphereY = sourceScreenY + (screenY - sourceScreenY) * sphereProgress

              // Dibujar esfera brillante principal
              drawGlowingSphere(
                ctx,
                sphereX,
                sphereY,
                20 * (1 - sphereProgress * 0.5), // Reducir tamaño gradualmente
                wave.color,
                1.0
              )

              // Estela de la esfera (efecto trail)
              for (let i = 0; i < 3; i++) {
                const trailProgress = Math.max(0, sphereProgress - i * 0.1)
                const trailX = sourceScreenX + (screenX - sourceScreenX) * trailProgress
                const trailY = sourceScreenY + (screenY - sourceScreenY) * trailProgress

                drawGlowingSphere(
                  ctx,
                  trailX,
                  trailY,
                  15 * (1 - trailProgress * 0.5),
                  wave.color,
                  0.3 - i * 0.1
                )
              }
            }
          }
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
  }, [drawSmartphone, drawGlowingSphere])

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
