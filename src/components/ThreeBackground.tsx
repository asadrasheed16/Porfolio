import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  
  const points = useMemo(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  useFrame((state) => {
    const { clock, mouse } = state;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
    
    // Slight reaction to mouse
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.2, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.2, 0.05);
  });

  return (
    <group>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#E2FF4D"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Decorative vertical lines for the editorial look */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[(i - 2) * 5, 0, -10]}>
          <boxGeometry args={[0.01, 100, 0.01]} />
          <meshBasicMaterial color="#E2FF4D" transparent opacity={0.05} />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
