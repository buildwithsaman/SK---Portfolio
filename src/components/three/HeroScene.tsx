import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  Text,
  Billboard,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

// Syntax palette (matches the site accents)
const KW = "#7c3aed"; // keywords
const FN = "#0891b2"; // functions / components
const STR = "#db2777"; // strings
const VAR = "#0f766e"; // identifiers
const DIM = "#94a3b8"; // punctuation / plain

type Token = { w: number; c: string };
// Each line is an indent level + a set of colored tokens, mimicking real code.
const LINES: { indent: number; tokens: Token[] }[] = [
  {
    indent: 0,
    tokens: [
      { w: 0.55, c: KW },
      { w: 0.7, c: VAR },
      { w: 0.35, c: DIM },
      { w: 0.9, c: STR },
    ],
  },
  {
    indent: 0,
    tokens: [
      { w: 0.55, c: KW },
      { w: 0.6, c: FN },
      { w: 0.25, c: DIM },
      { w: 0.45, c: DIM },
    ],
  },
  {
    indent: 1,
    tokens: [
      { w: 0.5, c: KW },
      { w: 0.55, c: VAR },
      { w: 0.2, c: DIM },
      { w: 0.95, c: FN },
    ],
  },
  {
    indent: 1,
    tokens: [
      { w: 0.45, c: KW },
      { w: 0.75, c: FN },
      { w: 0.2, c: DIM },
      { w: 0.6, c: STR },
    ],
  },
  {
    indent: 2,
    tokens: [
      { w: 0.6, c: FN },
      { w: 0.15, c: DIM },
      { w: 0.85, c: STR },
    ],
  },
  { indent: 1, tokens: [{ w: 0.3, c: DIM }] },
  { indent: 0, tokens: [{ w: 0.3, c: DIM }] },
];

const PANEL_W = 4.3;
const PANEL_H = 3;
const PAD = 0.42;
const LINE_H = 0.27;
const GAP = 0.13;
const CONTENT_TOP = PANEL_H / 2 - 0.95;

function CodeBar({
  x,
  y,
  w,
  color,
  delay,
}: {
  x: number;
  y: number;
  w: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    // sequential "typing" reveal, then hold
    const p = THREE.MathUtils.clamp(
      (state.clock.elapsedTime - 0.6 - delay) / 0.22,
      0.0001,
      1,
    );
    ref.current.scale.x = p;
    ref.current.position.x = x + (w * p) / 2;
  });
  return (
    <mesh ref={ref} position={[x, y, 0.12]}>
      <boxGeometry args={[w, 0.11, 0.05]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        roughness={0.4}
      />
    </mesh>
  );
}

function Cursor({ x, y }: { x: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity =
      0.3 + 0.7 * (Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5);
  });
  return (
    <mesh ref={ref} position={[x, y, 0.12]}>
      <boxGeometry args={[0.05, 0.2, 0.05]} />
      <meshStandardMaterial
        color={KW}
        emissive={KW}
        emissiveIntensity={0.6}
        transparent
      />
    </mesh>
  );
}

function CodeWindow() {
  // Precompute bar layout from LINES
  const bars = useMemo(() => {
    const out: { x: number; y: number; w: number; c: string; delay: number }[] =
      [];
    let order = 0;
    LINES.forEach((line, li) => {
      const y = CONTENT_TOP - li * LINE_H;
      let x = -PANEL_W / 2 + PAD + line.indent * 0.32;
      line.tokens.forEach((t) => {
        out.push({ x, y, w: t.w, c: t.c, delay: order * 0.12 });
        x += t.w + GAP;
        order++;
      });
    });
    return out;
  }, []);

  const cursorPos = useMemo(() => {
    const li = 2;
    const y = CONTENT_TOP - li * LINE_H;
    let x = -PANEL_W / 2 + PAD + LINES[li].indent * 0.32;
    LINES[li].tokens.forEach((t) => (x += t.w + GAP));
    return { x, y };
  }, []);

  return (
    <group>
      {/* soft border / frame behind the panel */}
      <RoundedBox
        args={[PANEL_W + 0.12, PANEL_H + 0.12, 0.18]}
        radius={0.16}
        smoothness={4}
        position={[0, 0, -0.04]}
      >
        <meshStandardMaterial color="#dbe2ee" roughness={0.6} metalness={0.1} />
      </RoundedBox>

      {/* main editor surface */}
      <RoundedBox args={[PANEL_W, PANEL_H, 0.2]} radius={0.14} smoothness={4}>
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.35}
          metalness={0.05}
        />
      </RoundedBox>

      {/* title bar */}
      <RoundedBox
        args={[PANEL_W - 0.04, 0.5, 0.16]}
        radius={0.1}
        smoothness={4}
        position={[0, PANEL_H / 2 - 0.3, 0.06]}
      >
        <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
      </RoundedBox>

      {/* traffic-light dots */}
      {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
        <mesh
          key={c}
          position={[-PANEL_W / 2 + 0.4 + i * 0.28, PANEL_H / 2 - 0.3, 0.16]}
        >
          <circleGeometry args={[0.07, 24]} />
          <meshBasicMaterial color={c} />
        </mesh>
      ))}

      {/* filename tag */}
      <Text
        position={[0.1, PANEL_H / 2 - 0.3, 0.16]}
        fontSize={0.16}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        App.tsx
      </Text>

      {bars.map((b, i) => (
        <CodeBar key={i} x={b.x} y={b.y} w={b.w} color={b.c} delay={b.delay} />
      ))}
      <Cursor x={cursorPos.x} y={cursorPos.y} />
    </group>
  );
}

const GLYPHS = ["{ }", "</>", "=>", "( )", "[ ]", ";", "&&", "#"];
const GLYPH_COLORS = [KW, FN, STR, VAR];

function Glyph({
  text,
  position,
  color,
}: {
  text: string;
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.4}>
      <Billboard position={position}>
        <Text
          fontSize={0.42}
          color={color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {text}
        </Text>
      </Billboard>
    </Float>
  );
}

function FloatingGlyphs() {
  const items = useMemo(() => {
    return GLYPHS.map((g, i) => {
      const angle = (i / GLYPHS.length) * Math.PI * 2;
      const radius = 3.5 + (i % 3) * 0.4;
      return {
        text: g,
        color: GLYPH_COLORS[i % GLYPH_COLORS.length],
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * (radius * 0.55),
          -1 - (i % 3) * 0.6,
        ] as [number, number, number],
      };
    });
  }, []);
  return (
    <>
      {items.map((it, i) => (
        <Glyph key={i} text={it.text} position={it.position} color={it.color} />
      ))}
    </>
  );
}

function ParticleField({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#94a3b8"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitSystem() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.035;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <group ref={group} position={[0, 0, -0.65]} rotation={[1.1, 0.2, 0.1]}>
      {[3.15, 3.75, 4.35].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.18, index * 0.12, 0]}>
          <torusGeometry args={[radius, 0.012, 8, 100]} />
          <meshBasicMaterial
            color={[FN, KW, STR][index]}
            transparent
            opacity={0.18 - index * 0.035}
          />
        </mesh>
      ))}
      {[0, 1, 2].map((index) => {
        const angle = index * 2.1 + 0.5;
        const radius = 3.15 + index * 0.6;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={[FN, KW, STR][index]} />
          </mesh>
        );
      })}
    </group>
  );
}

// Eases the whole scene toward the cursor so the editor tilts but always faces you.
function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const tx = state.pointer.x * 0.4;
    const ty = state.pointer.y * 0.28;
    g.current.rotation.y += (tx - g.current.rotation.y) * 0.045;
    g.current.rotation.x += (-ty - g.current.rotation.x) * 0.045;
  });
  return <group ref={g}>{children}</group>;
}

function CursorLight() {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  useFrame((state) => {
    if (!light.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    light.current.position.x = THREE.MathUtils.lerp(
      light.current.position.x,
      x,
      0.06,
    );
    light.current.position.y = THREE.MathUtils.lerp(
      light.current.position.y,
      y,
      0.06,
    );
  });
  return (
    <pointLight
      ref={light}
      position={[0, 0, 4]}
      intensity={20}
      color="#7c3aed"
      distance={16}
    />
  );
}

function SceneComposition() {
  const { size } = useThree();
  const mobile = size.width < 768;
  const compact = size.width < 1100;
  const position: [number, number, number] = mobile
    ? [0, -1.7, -0.9]
    : compact
      ? [1.7, 0.1, -0.2]
      : [2.45, 0.05, 0];

  return (
    <Rig>
      <group position={position} scale={mobile ? 0.68 : compact ? 0.82 : 0.94}>
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5}>
          <group rotation={[0.05, -0.15, 0]}>
            <CodeWindow />
          </group>
        </Float>
        <FloatingGlyphs />
        <OrbitSystem />
      </group>
      <ParticleField count={mobile ? 160 : 350} />
    </Rig>
  );
}

export default function HeroScene() {
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
      camera={{ position: [0, 0, 6.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduceMotion ? "demand" : "always"}
    >
      <color attach="background" args={["#eef1f7"]} />
      <fog attach="fog" args={["#eef1f7", 10, 24]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <pointLight position={[-6, -3, 2]} intensity={20} color="#0891b2" />
      <CursorLight />

      <SceneComposition />

      <Environment preset="city" />
    </Canvas>
  );
}
