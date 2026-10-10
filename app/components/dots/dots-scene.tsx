"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Dot } from "./dot";
import { mascot, type DotExpression } from "./config";
import { useDotsQuality, type DotsQuality } from "./use-dots-quality";
export { useDotsQuality } from "./use-dots-quality";
export type DotsSceneProps = {
  quality?: DotsQuality;
  active?: boolean;
  expression?: DotExpression;
  onFailure?: () => void;
  onReady?: () => void;
};

function RenderDriver({ active, reducedMotion, onReady }: { active: boolean; reducedMotion: boolean; onReady?: () => void }) {
  const firstFrame = useRef<number | null>(null);
  useFrame(() => {
    if (firstFrame.current !== null) return;
    // Notify after the first scene draw, rather than just WebGL initialization.
    firstFrame.current = requestAnimationFrame(() => onReady?.());
  });
  useEffect(() => () => { if (firstFrame.current !== null) cancelAnimationFrame(firstFrame.current); }, []);
  const invalidate = useThree(s => s.invalidate);
  useEffect(() => {
    if (!active) return;
    invalidate();
    if (reducedMotion) return;
    let id: number;
    let previous = 0;
    const tick = (time: number) => {
      if (time - previous > 32) { invalidate(); previous = time; }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, reducedMotion, invalidate]);
  return null;
}

export default function DotsScene({ quality = "auto", active = true, expression = "welcome", onFailure, onReady }: DotsSceneProps) {
  const q = useDotsQuality(quality);
  return <Canvas dpr={[1, q.dpr]} frameloop={active ? "demand" : "never"}
    camera={{ position: [0, 0, 3.9], fov: 32 }}
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    onCreated={({ gl }) => {
      gl.setClearColor(0x000000, 0);
      gl.domElement.addEventListener("webglcontextlost", event => { event.preventDefault(); onFailure?.(); }, { once: true });
    }}>
    <ambientLight intensity={1.2} />
    <directionalLight position={[-3, 4, 5]} intensity={2.6} color="#fff3d6" />
    <pointLight position={[3, 2, -2]} intensity={18} color="#d1dcff" />
    <pointLight position={[0, -2, 3]} intensity={3} color="#ffc16c" />
    <Dot {...mascot} expression={expression} shells={q.shells} resolution={q.resolution}
      reducedMotion={q.reducedMotion} phase={0} />
    <RenderDriver active={active} reducedMotion={q.reducedMotion} onReady={onReady} />
  </Canvas>;
}
