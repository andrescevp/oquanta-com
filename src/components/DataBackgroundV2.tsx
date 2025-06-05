import { Points, PointMaterial } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

interface DataBackgroundProps {
  isContentLoaded: boolean
}

// Componente para la esfera de puntos
const SpherePoints = React.memo(() => {
  const ref = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    const phi = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < 3000; i++) {
      const y = 1 - (i / 2999) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      positions[i * 3] = x * 250
      positions[i * 3 + 1] = y * 250
      positions[i * 3 + 2] = z * 250
    }

    return positions
  }, [])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.y = time * -0.2
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      Math.cos(time / 2) * Math.PI * 0.1 + Math.PI * 0.23,
      0.1
    )
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={3}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#5a33ee"
      />
    </Points>
  )
})

// Componente para las órbitas
const Orbits = React.memo(() => {
  const orbitRef = useRef<THREE.Group>(null!)

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    orbitRef.current.rotation.y = time * 0.1
  })

  return (
    <group ref={orbitRef}>
      {Array.from({ length: 4 }).map((_, orbit) => (
        <group key={orbit}>
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * Math.PI * 2
            const radius = 300 + orbit * 75
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            return (
              <mesh key={i} position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial
                  color="#fd5304"
                  transparent
                  opacity={0.8}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
})

const DataBackgroundV2: React.FC<DataBackgroundProps> = ({ isContentLoaded }) => {
  if (!isContentLoaded) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas
        camera={{
          position: [0, 0, 1000],
          fov: 45,
          near: 1,
          far: 2000
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <SpherePoints />
          <Orbits />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default React.memo(DataBackgroundV2)
