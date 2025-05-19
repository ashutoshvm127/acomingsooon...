'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

export function Scene3D() {
  return (
    <Canvas className="absolute inset-0" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={60} />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} castShadow />
      {/* Add your other 3D components here */}
    </Canvas>
  )
}
