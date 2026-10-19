import { Canvas } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

function Monogram() {
  return (
    <>
      <pointLight
        position={[0.4, 0.6, 3]}
        intensity={14}
        color="#5eead4"
        distance={12}
      />
      <group position={[0, 0.05, 0]} scale={1}>
        <RoundedBox
          args={[2.55, 0.1, 2.55]}
          radius={0.05}
          position={[0, -1.32, 0]}
        >
          <meshStandardMaterial
            color="#12101a"
            metalness={0.7}
            roughness={0.28}
          />
        </RoundedBox>

        <RoundedBox args={[1.6, 1.6, 0.42]} radius={0.24}>
          <meshStandardMaterial
            color="#0a101c"
            metalness={0.45}
            roughness={0.22}
          />
        </RoundedBox>

        {/* S */}
        <mesh position={[-0.3, 0.24, 0.26]}>
          <boxGeometry args={[0.74, 0.17, 0.13]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#0f766e"
            emissiveIntensity={0.55}
            metalness={0.25}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.5, 0, 0.26]}>
          <boxGeometry args={[0.17, 0.56, 0.13]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#0f766e"
            emissiveIntensity={0.4}
            metalness={0.25}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.3, -0.24, 0.26]}>
          <boxGeometry args={[0.74, 0.17, 0.13]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#6d28d9"
            emissiveIntensity={0.45}
            metalness={0.25}
            roughness={0.2}
          />
        </mesh>

        {/* K */}
        <mesh position={[0.3, 0, 0.26]}>
          <boxGeometry args={[0.16, 0.92, 0.13]} />
          <meshStandardMaterial
            color="#f1f5f9"
            metalness={0.7}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0.54, 0.24, 0.26]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.56, 0.14, 0.13]} />
          <meshStandardMaterial
            color="#c4b5fd"
            metalness={0.55}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.54, -0.24, 0.26]} rotation={[0, 0, 0.55]}>
          <boxGeometry args={[0.56, 0.14, 0.13]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.55}
            roughness={0.2}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.35, 0.28, 0]}>
          <torusGeometry args={[1.58, 0.01, 12, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[0.45, 0.75, 0.15]}>
          <torusGeometry args={[1.9, 0.007, 12, 100]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.25} />
        </mesh>

        <mesh position={[1.42, 0.72, -0.25]}>
          <icosahedronGeometry args={[0.085, 0]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={0.55}
          />
        </mesh>
        <mesh position={[-1.38, -0.48, 0.18]}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.45}
          />
        </mesh>
      </group>
    </>
  );
}

export default function SkSculpture() {
  return (
    <Canvas
      style={{ pointerEvents: "none", touchAction: "pan-y" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 4.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="demand"
    >
      <fog attach="fog" args={["#060509", 6, 12.5]} />
      <ambientLight intensity={0.38} />
      <directionalLight
        position={[3.2, 5.2, 2.4]}
        intensity={1.05}
        color="#e2e8f0"
      />
      <pointLight position={[-3, 1.1, 2]} intensity={12} color="#a78bfa" />
      <Monogram />
    </Canvas>
  );
}
