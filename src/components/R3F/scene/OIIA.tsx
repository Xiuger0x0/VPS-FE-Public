import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box } from "@chakra-ui/react";
import { Text } from "@react-three/drei";

import * as THREE from "three";

const OIIACAT = (props: JSX.IntrinsicElements["group"]) => {
  const { scene } = useGLTF("/models/oiia.glb");
  const catRef = useRef<THREE.Object3D>(null);

  // 🌀 讓貓咪節奏式旋轉
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (catRef.current) {
      // 🎵 旋轉邏輯：以 sine 曲線模擬節奏
      const beat = Math.sin(time * 10); // 表示節奏頻率（調整可加快）
      catRef.current.rotation.y = beat * 10; // 範圍
    }
  });

  return <primitive ref={catRef} object={scene} {...props} />;
};

export default function OIIA() {
  return (
    <Box position="relative" w="100%" h="100vh">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
        {/* 背景光源 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} castShadow intensity={1.5} />

        {/* 可旋轉的貓咪 */}
        <OrbitControls />
        <OIIACAT scale={[0.02, 0.02, 0.02]} />

        {/* 署名文字，右下角定位 */}
        <Text
          position={[4.2, -2.6, 0]} // X軸設定為正數，Y軸設定為負數，這會讓文字移到右下角
          fontSize={0.12}
          color="white"
          anchorX="right" // 文字右對齊
          anchorY="bottom" // 文字底部對齊
          rotation={[0, 0, 0]} // 保持文字方向不變
        >
          "OIIA" (https://skfb.ly/pvDHG) by HAND0ME🐰fock🎨 (2) is licensed
          under Creative Commons Attribution
          (http://creativecommons.org/licenses/by/4.0/).
        </Text>
      </Canvas>
    </Box>
  );
}
