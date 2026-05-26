"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── Floating orb ─────────────────────────────────────── */
function FloatingOrb({
  position,
  color,
  scale,
  speed,
  distort,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  distort: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <Sphere args={[1, 64, 64]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

/* ─── Particle system ────────────────────────────────────── */
function Particles({ count = 250 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#E91E8C"),
      new THREE.Color("#F472B6"),
      new THREE.Color("#FF6EB4"),
      new THREE.Color("#FFF5F7"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Ring accent ────────────────────────────────────────── */
function PinkRing({
  radius,
  tube,
  position,
  rotation,
}: {
  radius: number;
  tube: number;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.15;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial
        color="#FF6EB4"
        metalness={0.9}
        roughness={0.15}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

/* ─── Scene ──────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#F472B6" />
      <pointLight position={[5, 5, 5]} intensity={30} color="#E91E8C" />
      <pointLight position={[-5, -3, 3]} intensity={20} color="#F472B6" />
      <pointLight position={[0, 8, -4]} intensity={15} color="#FF6EB4" />

      {/* Background stars */}
      <Stars
        radius={40}
        depth={30}
        count={600}
        factor={2}
        saturation={0.5}
        fade
        speed={0.4}
      />

      {/* Particles */}
      <Particles count={280} />

      {/* Orbs */}
      <FloatingOrb
        position={[-2.5, 0.5, -1]}
        color="#E91E8C"
        scale={1.1}
        speed={1.2}
        distort={0.45}
      />
      <FloatingOrb
        position={[2.8, -0.8, -2]}
        color="#F472B6"
        scale={0.75}
        speed={1.8}
        distort={0.5}
      />
      <FloatingOrb
        position={[0.5, 2.2, -3]}
        color="#FF6EB4"
        scale={0.55}
        speed={2.2}
        distort={0.35}
      />
      <FloatingOrb
        position={[-1.2, -2.0, -1.5]}
        color="#FF1493"
        scale={0.45}
        speed={1.5}
        distort={0.6}
      />
      <FloatingOrb
        position={[3.5, 1.8, -4]}
        color="#DB2777"
        scale={0.38}
        speed={2.5}
        distort={0.4}
      />

      {/* Rings */}
      <PinkRing
        radius={2}
        tube={0.02}
        position={[0, 0, -3]}
        rotation={[Math.PI / 4, 0, 0]}
      />
      <PinkRing
        radius={3}
        tube={0.015}
        position={[0, 0, -5]}
        rotation={[Math.PI / 3, Math.PI / 6, 0]}
      />
    </>
  );
}

/* ─── Export ─────────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
