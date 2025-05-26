import { useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  setDragging: (value: boolean) => void;
};

export default function Attachment({ setDragging }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  // 限制移動範圍
  useFrame(() => {
    if (meshRef.current) {
      const pos = meshRef.current.position;
      pos.x = THREE.MathUtils.clamp(pos.x, -1, 1);
      pos.y = 0.6;
      pos.z = 0;
    }
  });

  return (
    <TransformControls
      ref={controlsRef}
      mode="translate"
      showX
      showY={false}
      showZ={false}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
    >
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </TransformControls>
  );
}
