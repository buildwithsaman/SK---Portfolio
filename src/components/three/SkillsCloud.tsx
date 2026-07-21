import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { techCloud } from "../../data/cv";

const PALETTE = ["#0891b2", "#7c3aed", "#db2777", "#334155"];

function fibonacciSphere(samples: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const offset = 2 / samples;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function Word({
  position,
  children,
  color,
}: {
  position: THREE.Vector3;
  children: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Billboard position={position}>
      <Text
        fontSize={0.42}
        color={hovered ? "#0f172a" : color}
        anchorX="center"
        anchorY="middle"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        outlineWidth={hovered ? 0.014 : 0}
        outlineColor="#0891b2"
      >
        {children}
      </Text>
    </Billboard>
  );
}

function Cloud({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(techCloud.length, 4), []);

  useFrame((state, delta) => {
    if (group.current && animate) {
      group.current.rotation.y += delta * 0.07;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {techCloud.map((word, i) => (
        <Word
          key={word}
          position={points[i]}
          color={PALETTE[i % PALETTE.length]}
        >
          {word}
        </Word>
      ))}
    </group>
  );
}

export default function SkillsCloud() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ alpha: true }}
      frameloop={reduceMotion ? "demand" : "always"}
    >
      <ambientLight intensity={0.8} />
      <Cloud animate={!reduceMotion} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.35}
        rotateSpeed={0.55}
      />
    </Canvas>
  );
}
