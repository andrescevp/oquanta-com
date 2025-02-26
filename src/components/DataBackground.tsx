import React, { useEffect, useRef, useCallback } from 'react'

interface Point {
  x: number
  y: number
  z: number
  size: number
  color: string
}

interface DataBackgroundProps {
  isContentLoaded: boolean
}

const qrCodeIcon = `<svg version="1.1" id="Capa_1" height="24px" width="24px" viewBox="0 0 330 330">
<g>
	<g>
		<rect x="105.084" y="38.271" width="5" height="20"/>
	</g>
	<g>
		<path d="M311.596,190.189c-7.441-9.347-18.403-16.206-32.743-20.522V30c0-16.542-13.458-30-30-30H125.084
			c-16.542,0-30,13.458-30,30v120.143h-8.296c-16.542,0-30,13.458-30,30v1.333c0,5.854,1.691,11.317,4.603,15.939
			c-7.34,5.474-12.103,14.221-12.103,24.061v1.333c0,9.84,4.763,18.587,12.103,24.062c-2.911,4.621-4.603,10.085-4.603,15.938v1.333
			c0,16.542,13.458,30,30,30h8.324c0.427,11.631,7.503,21.587,17.534,26.177c0.931,10.503,4.084,30.187,14.768,45.537
			c1.943,2.792,5.054,4.288,8.216,4.288c1.972,0,3.963-0.582,5.704-1.793c4.533-3.155,5.65-9.388,2.495-13.921
			c-6.798-9.767-9.602-22.608-10.76-31.4h82.685c0.272,0.414,0.545,0.818,0.815,1.21c3.142,4.541,9.372,5.679,13.913,2.534
			c4.542-3.142,5.677-9.371,2.535-13.913c-11.919-17.229-8.787-35.884,9.581-57.012c3.067-2.652,12.307-11.732,11.217-24.033
			c-0.828-9.343-7.109-17.194-18.669-23.337c-0.344-0.183-0.698-0.345-1.061-0.486c-0.466-0.182-11.403-4.579-9.741-15.706
			c1.007-6.737,14.768-8.273,23.766-7.666c23.156,1.569,39.698,7.803,47.836,18.026c5.752,7.225,7.607,16.623,5.673,28.733
			c-0.413,2.585-0.824,5.241-1.245,7.959c-5.756,37.194-12.919,83.483-49.87,114.661c-4.221,3.561-4.756,9.87-1.194,14.092
			c1.979,2.344,4.803,3.551,7.648,3.551c2.277,0,4.567-0.773,6.444-2.358c42.672-36.005,50.802-88.533,56.737-126.888
			c0.415-2.684,0.821-5.309,1.229-7.863C324.202,216.813,320.913,201.893,311.596,190.189z M79.288,232.809c-5.514,0-10-4.486-10-10
			v-1.333c0-5.514,4.486-10,10-10h7.5h7.5v21.333h-7.5H79.288z M76.788,180.143c0-5.514,4.486-10,10-10h7.5v21.333h-7.5
			c-5.514,0-10-4.486-10-10V180.143z M94.288,274.142h-7.5c-5.514,0-10-4.486-10-10v-1.333c0-5.514,4.486-10,10-10h7.5V274.142z
			 M125.084,303.029c-5.514,0-10-4.486-10-10v-8.271h91.457c-0.851,6.668-0.437,12.787,0.731,18.271H125.084z M204.566,189.331
			c-3.124,20.906,12.427,33.184,21.625,37.04c5.441,2.968,7.551,5.647,7.701,7.188c0.21,2.15-2.553,5.684-4.477,7.251
			c-0.482,0.378-0.929,0.8-1.335,1.261c-6.987,7.936-11.982,15.52-15.432,22.688h-97.564V30c0-5.514,4.486-10,10-10h123.769
			c5.514,0,10,4.486,10,10v135.579c-3.032-0.381-6.15-0.694-9.389-0.914C224.305,162.971,207.094,172.413,204.566,189.331z"/>
		<path d="M179.129,83.167h-24.06c-2.761,0-5,2.238-5,5v24.061c0,2.762,2.239,5,5,5h24.06c2.761,0,5-2.238,5-5V88.167
			C184.129,85.405,181.89,83.167,179.129,83.167z"/>
		<path d="M172.629,142.86h-12.56V130.8c0-2.762-2.239-5-5-5c-2.761,0-5,2.238-5,5v17.061c0,2.762,2.239,5,5,5h17.56
			c2.761,0,5-2.238,5-5C177.629,145.099,175.39,142.86,172.629,142.86z"/>
		<path d="M216.568,83.167h-24.06c-2.761,0-5,2.238-5,5v24.061c0,2.762,2.239,5,5,5h24.06c2.761,0,5-2.238,5-5V88.167
			C221.568,85.405,219.33,83.167,216.568,83.167z M211.568,107.228h-14.06V93.167h14.06V107.228z"/>
		<path d="M211.669,125.936H197.41c-2.761,0-5,2.238-5,5v14.257c0,2.762,2.239,5,5,5h14.259c2.761,0,5-2.238,5-5v-14.257
			C216.669,128.174,214.43,125.936,211.669,125.936z"/>
	</g>
</g>
</svg>`

const DataBackground: React.FC<DataBackgroundProps> = ({ isContentLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const pointsRef = useRef<Point[]>([])
  const rotationRef = useRef({ y: 0 })

  const AXIS_TILT = 23.5
  const ROTATION_SPEED = -0.2

  const generatePoints = useCallback((size: number) => {
    const points: Point[] = []
    const numPoints = 3000
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

    // Ordenar puntos por Z para correcto rendering 3D
    const sortedPoints = [...pointsRef.current].sort((a, b) => b.z - a.z)

    sortedPoints.forEach(point => {
      // Aplicar rotaciones
      const x = point.x
      const y = point.y * Math.cos(tiltAngle) - point.z * Math.sin(tiltAngle)
      const z = point.y * Math.sin(tiltAngle) + point.z * Math.cos(tiltAngle)

      const newX = x * Math.cos(angle) + z * Math.sin(angle)
      const newZ = -x * Math.sin(angle) + z * Math.cos(angle)

      // Calcular posición en pantalla
      const screenX = width / 2 + newX
      const screenY = height / 2 + y

      // Calcular opacidad y tamaño basado en Z
      const opacity = 0.15 + (1 - Math.abs(newZ) / (height / 2)) * 0.85
      const size = point.size * (1 + newZ / (height * 1.5))

      // Dibujar punto
      ctx.beginPath()
      ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
      ctx.fillStyle = point.color
      ctx.globalAlpha = opacity
      ctx.fill()
    })

    // Actualizar rotación
    rotationRef.current.y -= ROTATION_SPEED
    animationRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    if (!isContentLoaded || !canvasRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight
    const size = Math.max(500, Math.min(width, height) * 0.6)

    pointsRef.current = generatePoints(size)
    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isContentLoaded, generatePoints, draw])

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
