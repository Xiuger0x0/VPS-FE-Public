// src/components/AccessoryModels.tsx
import { memo } from "react";

// 使用 React.memo 優化渲染效能，避免不必要的重繪

import { Vector3 } from "@react-three/fiber";

type OpticBProps = {
  position: Vector3;
};

// OpticA 模擬瞄具 A：簡單的藍色方塊
export const OpticA = memo(({ position }: OpticBProps) => (
  <mesh position={position}>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
));

export const OpticB = memo(({ position }: OpticBProps) => (
  <mesh position={position}>
    <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
    <meshStandardMaterial />
  </mesh>
));

// Suppressor 模擬消音器：灰色圓柱體
export const Suppressor = memo(() => (
  <mesh>
    <cylinderGeometry />
    <meshStandardMaterial />
  </mesh>
));

// FlashHider 模擬火帽：紅色圓錐（近似火帽結構）
export const FlashHider = memo(() => (
  <mesh>
    <coneGeometry />
    <meshStandardMaterial />
  </mesh>
));
