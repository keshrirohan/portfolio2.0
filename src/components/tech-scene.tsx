"use client";

import { Float, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const nodes = [
  { label: "React", position: [-2.2, 1.1, 0] },
  { label: "Next", position: [1.9, 1.4, -0.4] },
  { label: "TS", position: [-1.5, -1.35, 0.6] },
  { label: "Node", position: [2.1, -1.1, 0.2] },
  { label: "DB", position: [0, 0, 1.1] },
] as const;

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight color="#22d3ee" intensity={22} position={[3, 2, 4]} />
      <pointLight color="#8b5cf6" intensity={18} position={[-3, -2, 3]} />

      <Float floatIntensity={1.5} rotationIntensity={0.8} speed={1.6}>
        <mesh rotation={[0.55, 0.75, 0.35]}>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#312e81"
            emissiveIntensity={0.22}
            metalness={0.7}
            roughness={0.16}
            wireframe
          />
        </mesh>
      </Float>

      {nodes.map((node) => (
        <Float key={node.label} floatIntensity={1.2} speed={1.3}>
          <group position={node.position}>
            <mesh>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#0891b2"
                emissiveIntensity={0.8}
                metalness={0.4}
                roughness={0.18}
              />
            </mesh>
            <Html center distanceFactor={8}>
              <span className="rounded-full border border-cyan-300/30 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.28)] backdrop-blur">
                {node.label}
              </span>
            </Html>
          </group>
        </Float>
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.7}
      />
    </>
  );
}

export function TechScene() {
  return (
    <div className="h-[360px] w-full overflow-hidden rounded-md border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_80px_rgba(15,23,42,0.5)] sm:h-[430px]">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 48 }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
