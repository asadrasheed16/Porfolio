import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface IdentityIllustrationProps {
  image: string;
}

export default function IdentityIllustration({
  image,
}: IdentityIllustrationProps) {
  const texture = useLoader(THREE.TextureLoader, image);
  const meshRef = useRef<THREE.Points>(null!);

  // Create a grid of particles
  const { positions, uvs } = useMemo(() => {
    const size = 160; // Increased resolution for density
    const count = size * size;
    const pos = new Float32Array(count * 3);
    const uvCoords = new Float32Array(count * 2);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const idx = i * size + j;
        // Initial grid position
        pos[idx * 3] = (j / size - 0.5) * 2;
        pos[idx * 3 + 1] = (i / size - 0.5) * 2;
        pos[idx * 3 + 2] = 0;

        uvCoords[idx * 2] = j / size;
        uvCoords[idx * 2 + 1] = i / size;
      }
    }
    return { positions: pos, uvs: uvCoords };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#E2FF4D") },
      uSecondaryColor: { value: new THREE.Color("#09090B") },
    }),
    [texture],
  );

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.getElapsedTime();
      (
        meshRef.current.material as THREE.ShaderMaterial
      ).uniforms.uMouse.value.lerp(mouse, 0.1);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-uv"
          count={uvs.length / 2}
          array={uvs}
          itemSize={2}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform vec2 uMouse;

          void main() {
            vUv = uv;
            vec4 tex = texture2D(uTexture, vUv);
            float gray = (tex.r + tex.g + tex.b) / 3.0;
            
            vec3 pos = position;
            
            // Fragmenting effect at edges
            float edge = distance(vUv, vec2(0.5));
            float noise = sin(pos.x * 10.0 + pos.y * 10.0 + uTime) * (1.0 - gray) * 0.2;
            
            // Only show particles where the image is bright
            float visibility = gray > 0.05 ? 1.0 : 0.0;
            
            // Displacement based on mouse (increased range)
            float d = distance(uMouse, vec2(pos.x, pos.y));
            if (d < 0.6) {
              pos += normalize(vec3(pos.x - uMouse.x, pos.y - uMouse.y, 0.0)) * (0.6 - d) * 0.4;
            }

            // Dissolve edges based on luminance
            pos.z += sin(uTime + pos.x * 20.0) * 0.1 * (1.0 - gray);
            pos.xy += noise * visibility;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (2.0 + gray * 6.0) * (200.0 / -mvPosition.z) * visibility;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform vec3 uColor;
          uniform vec3 uSecondaryColor;
          uniform float uTime;

          void main() {
            vec4 tex = texture2D(uTexture, vUv);
            float gray = (tex.r + tex.g + tex.b) / 3.0;
            
            // Duotone effect
            vec3 duotone = mix(uSecondaryColor, uColor, gray);
            
            // Circle shape for particles with soft edge
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            
            float alpha = smoothstep(0.5, 0.2, d) * gray * 0.9;
            
            // Flicker effect
            alpha *= (0.8 + 0.2 * sin(uTime * 5.0 + vUv.x * 100.0));

            gl_FragColor = vec4(duotone, alpha);
          }
        `}
      />
    </points>
  );
}
