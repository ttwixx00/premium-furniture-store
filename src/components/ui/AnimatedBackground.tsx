"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";
import { motion } from "framer-motion";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate 8000 particles in a wide/deep sphere distribution
  const [sphere] = useState(() => random.inSphere(new Float32Array(8000), { radius: 3.5 }));

  // We need to keep track of previous scroll to calculate velocity
  const scrollData = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollData.current.target = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth scroll interpolation
    scrollData.current.current += (scrollData.current.target - scrollData.current.current) * 0.05;
    
    // Slow ambient rotation
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
    
    // Extreme Scroll Parallax: push particles towards the camera on scroll
    // ScrollY dictates the Z position of the entire particle group
    ref.current.position.z = scrollData.current.current * 0.003;
    
    // Mouse parallax effect (tilt)
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    
    ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
    ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#C8A27A"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollData = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollData.current.target = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    scrollData.current.current += (scrollData.current.target - scrollData.current.current) * 0.05;

    // Objects rotate and bob
    groupRef.current.rotation.y = Math.sin(t / 4) / 2 + scrollData.current.current * 0.001;
    groupRef.current.rotation.x = Math.cos(t / 3) / 2;
    groupRef.current.position.y = Math.sin(t / 1.5) / 5 + scrollData.current.current * 0.002;
    groupRef.current.position.z = scrollData.current.current * 0.005; // Fly past camera
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-1.5, -1, -2]} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[0.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#C8A27A" transparent opacity={0.3} />
      </mesh>
      <mesh position={[2, 1.5, -3]} rotation={[-0.5, 0.2, 0]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#C8A27A" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh position={[-0.5, 2, -4]} rotation={[0.2, -0.4, 0]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#8B5E3C" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
}

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-deep-charcoal pointer-events-none">
      {/* Dark Premium Fluid Background Mesh */}
      <motion.div 
        className="absolute inset-0 opacity-40 blur-[100px]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #2a1b12 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, #1a1614 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #201a15 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, #2a1b12 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <fog attach="fog" args={["#151515", 2, 8]} />
        <ParticleField />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
