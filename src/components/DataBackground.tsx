import * as d3 from 'd3'
import React, { useEffect, useRef, useCallback } from 'react'

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

interface DataBackgroundProps {
  isContentLoaded: boolean
}

const DataBackground: React.FC<DataBackgroundProps> = ({ isContentLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const rotationRef = useRef({ x: 0, y: 0, z: 0 })

  const AXIS_TILT = 23.5 // Inclinación del eje terrestre en grados
  const ROTATION_SPEED = -0.2 // Velocidad de rotación negativa para girar de derecha a izquierda

  // Función para actualizar el tamaño y posición
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    const width = window.innerWidth
    const height = window.innerHeight
    const minSize = 500 // Diámetro mínimo
    const maxSize = Math.min(width, height) * 0.6 // 60% de la dimensión más pequeña
    const size = Math.max(minSize, maxSize)

    // Actualizar tamaño del SVG
    const svg = container.select('svg').attr('width', width).attr('height', height)

    // Actualizar posición del grupo central
    const centerGroup = svg.select('g').attr('transform', `translate(${width / 2},${height / 2})`)

    // Actualizar escala de la esfera
    const sphereGroup = centerGroup.select('g')
    const scale = size / maxSize
    sphereGroup.attr('transform', `scale(${scale})`)
  }, [])

  // Efecto para manejar el redimensionamiento
  useEffect(() => {
    const handleResize = debounce(() => {
      updateDimensions()
    }, 250)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateDimensions])

  useEffect(() => {
    if (!isContentLoaded || !containerRef.current) return

    try {
      const container = d3.select(containerRef.current)
      const width = window.innerWidth
      const height = window.innerHeight
      const minSize = 500 // Minimum diameter
      const maxSize = Math.min(width, height) * 0.6 // 60% of smallest screen dimension
      const size = Math.max(minSize, maxSize) // Use larger of min size or max size

      container.selectAll('svg').remove()

      const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('position', 'fixed')
        .style('top', 0)
        .style('left', 0)
        .style('z-index', -1)

      const centerGroup = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

      // Generar puntos distribuidos uniformemente en la esfera
      const points = []
      const numPoints = 3000 // Aumentamos la cantidad de puntos de 500 a 1000
      const phi = Math.PI * (3 - Math.sqrt(5)) // ángulo áureo

      for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = phi * i

        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius

        points.push({
          x: x * (size / 2),
          y: y * (size / 2),
          z: z * (size / 2),
          size: Math.random() * 2 + 1
        })
      }

      const sphereGroup = centerGroup.append('g')

      // Función para calcular la opacidad basada en la profundidad Z
      const calculateOpacity = (z: number) => {
        return 0.15 + (1 - Math.abs(z) / (size / 2)) * 0.85
      }

      // Definir paleta de colores
      const colorPalette = [
        ['#1d1d1b', '#5b5a57', '#b8b6b2'], // black
        ['#5a33ee', '#876AEF', '#CBBDF1'], // iris-purple
        ['#fd5304', '#fc8146', '#fbc6ab'], // pumpkin-orange
        ['#c0f03e', '#D0F270', '#E9F5BD'] // lime-green
      ]

      // Añadir puntos con efecto de profundidad y colores aleatorios de la paleta
      points.forEach(point => {
        const randomGroup = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        const fillColor = randomGroup[Math.floor(Math.random() * randomGroup.length)]

        sphereGroup
          .append('circle')
          .attr('cx', point.x)
          .attr('cy', point.y)
          .attr('r', point.size)
          .attr('fill', fillColor)
          .style('opacity', calculateOpacity(point.z))
      })

      // Añadir órbitas de QR
      const numOrbits = 4
      const qrPerOrbit = 7
      const orbitAnimations: number[] = [] // Array para guardar las referencias de animación

      for (let orbit = 0; orbit < numOrbits; orbit++) {
        const orbitRadius = (size / 2) * (1.2 + orbit * 0.3)
        const orbitGroup = centerGroup.append('g')

        // Crear QRs en la órbita
        for (let i = 0; i < qrPerOrbit; i++) {
          const angle = (i / qrPerOrbit) * Math.PI * 2
          const x = Math.cos(angle) * orbitRadius
          const y = Math.sin(angle) * orbitRadius

          const qrGroup = orbitGroup.append('g').attr('transform', `translate(${x},${y})`)

          qrGroup
            .append('g')
            .html(qrCodeIcon)
            .attr('fill', colorPalette[orbit][0])
            .style('opacity', 0.8)
        }

        // Función mejorada para la animación de la órbita
        const rotationSpeed = 0.2 - orbit * 0.05 // Velocidad más suave
        let rotation = 90

        function updateOrbitRotation() {
          rotation += rotationSpeed
          orbitGroup.attr('transform', `rotate(${rotation})`)
          orbitAnimations[orbit] = requestAnimationFrame(updateOrbitRotation)
        }

        updateOrbitRotation()
      }

      function updateRotation() {
        // Decrementar el ángulo de rotación para girar de derecha a izquierda
        rotationRef.current.y -= ROTATION_SPEED

        // Aplicar rotación con inclinación del eje y rotación sobre sí misma
        sphereGroup.attr(
          'transform',
          `rotate(${AXIS_TILT}, 1, 0) rotate(${rotationRef.current.y}, 0, 1)`
        )

        // Actualizar cada punto para el efecto 3D
        sphereGroup.selectAll('circle').each(function (d: any, i: number) {
          const point = points[i]

          // Convertir ángulo a radianes
          const angle = ((rotationRef.current.y % 360) * Math.PI) / 180
          const tiltAngle = (AXIS_TILT * Math.PI) / 180

          // Calcular nueva posición Z con inclinación
          const x = point.x
          const y = point.y * Math.cos(tiltAngle) - point.z * Math.sin(tiltAngle)
          const z = point.y * Math.sin(tiltAngle) + point.z * Math.cos(tiltAngle)

          // Rotar alrededor del eje Y
          const newX = x * Math.cos(angle) + z * Math.sin(angle)
          const newZ = -x * Math.sin(angle) + z * Math.cos(angle)

          // Aplicar efecto 3D con profundidad mejorada
          d3.select(this)
            .style('opacity', calculateOpacity(newZ))
            .attr('r', point.size * (1 + newZ / (size * 1.5)))
        })

        animationRef.current = requestAnimationFrame(updateRotation)
      }

      updateRotation()

      // Añadir listener para redimensionamiento
      window.addEventListener('resize', updateDimensions)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        // Cancelar las animaciones de las órbitas
        orbitAnimations.forEach(animationId => {
          cancelAnimationFrame(animationId)
        })
        // Detener todas las animaciones de D3
        d3.selectAll('*').interrupt()
        container.selectAll('svg').remove()
        window.removeEventListener('resize', updateDimensions)
      }
    } catch (error) {
      console.error('Error al renderizar el fondo:', error)
      return () => {}
    }
  }, [isContentLoaded, updateDimensions])

  // Función de utilidad para debounce
  function debounce(fn: Function, ms: number) {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: -1,
        perspective: '1000px',
        perspectiveOrigin: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-hidden="true"
    />
  )
}

export default React.memo(DataBackground)
