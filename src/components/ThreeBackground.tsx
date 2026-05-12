import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  
  const points = useMemo(() => {
    // INCREASED STARS from 3000 to 12000 for a denser starfield
    const p = new Float32Array(12000 * 3);
    for (let i = 0; i < 12000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return p;
  }, []);

  useFrame((state) => {
    const { clock, mouse } = state;
    ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    ref.current.rotation.x = clock.getElapsedTime() * 0.01;
    
    // Slight reaction to mouse
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.5, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.5, 0.05);
  });

  return (
    <group>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00FFFF" // Cyberpunk Cyan
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Hidden Constellation Text deep in the background */}
      <Text
        position={[0, 0, -15]}
        fontSize={1.5}
        color="#00FFFF"
        fillOpacity={0.015} // Extremely faint
        outlineWidth={0.005}
        outlineOpacity={0.03} // Looks like a very faint constellation of stars
        font="https://fonts.gstatic.com/s/orbitron/v31/yq5sZ5CQ2xKGzoEQrsLvi4uQ.woff"
        letterSpacing={0.2}
      >
        I LOVE YOU BUSHRA
      </Text>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
