// src/components/R3F/models/WorkTable.tsx
import { useGLTF } from "@react-three/drei";

export const WorkBench = (props: JSX.IntrinsicElements["group"]) => {
  const { scene } = useGLTF("/models/bg/workbench.glb"); // 注意前面是斜線，從 public 起算
  return <primitive object={scene} {...props} />;
};
