// src/pages/WeaponCustomizer.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva"; // 引入 Leva 和 useControls
import {
  OpticA,
  OpticB,
  Suppressor,
  FlashHider,
} from "@/components/R3F/components/AccessoryModels"; // 引入配件模型
import { Text } from "@react-three/drei";

import { useAttachmentControls } from "@/components/R3F/components/AccessorySelector";
import { Box } from "@chakra-ui/react";
import MainBody from "@/components/R3F/components/MainBody";
import { WorkBench } from "../components/WorkBench";

export default function WeaponCustomizer() {
  // 使用 Leva 控制面板來管理配件參數
  // 從控制 hook 中獲得目前的瞄具與槍口設定
  const {
    optics, // 瞄具選擇
    muzzle, // 槍口配件選擇
    opticPositionX,
    opticPositionY,
    opticPositionZ,
  } = useAttachmentControls();

  const LightingColors = {
    ambientSoftBlue: "#667799",
    warmKey: "#ffddcc",
    white: "#FFFFFF",
    cyberTeal: "#00ffe0",
    industrialGray: "#999999",
  };

  return (
    <Box position="relative" w="100%" h="100vh">
      {/* 🔹 工作台背景模型（固定不可旋轉） */}
      <Box pos={"absolute"} inset={0} zIndex={-1}>
        <Canvas camera={{ position: [0, 3, 7], fov: 60 }}>
          {/* 主方向光：加強亮度與清晰度 */}
          <directionalLight
            position={[0, 5, 4]}
            intensity={1.2}
            color={LightingColors.white}
            castShadow
          />
          {/* 額外補光：從另一角度補一點柔光提升對比 */}
          <directionalLight
            position={[-2, 3, -2]}
            intensity={1}
            color={LightingColors.white}
          />
          {/* 🔧 調整桌面位置、大小與角度 */}
          <WorkBench position={[1, 1, 6]} rotation={[-0.3, 0.15, 0]} />

          {/* 署名文字，右下角定位 */}
          <Text
            fontSize={0.03}
            position={[1.05, 1.97, 5.3]} // X軸設定為正數，Y軸設定為負數，這會讓文字移到右下角
            rotation={[-0.3, 0.15, 0]} // 與桌面保持一致的角度
            anchorX="right" // 文字右對齊
          >
            "Workbench" (https://skfb.ly/oCSoA) by Wolfpredator is licensed
            under Creative Commons Attribution
            (http://creativecommons.org/licenses/by/4.0/).
          </Text>
        </Canvas>
      </Box>

      {/* 🔸 建立 3D 主場景（可旋轉） */}
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} castShadow />
        <OrbitControls />

        {/* 武器主體模型 */}
        <MainBody />

        {/* 瞄具切換模型 */}
        {optics === "opticA" && (
          <OpticA position={[opticPositionX, opticPositionY, opticPositionZ]} />
        )}
        {optics === "opticB" && (
          <OpticB position={[opticPositionX, opticPositionY, opticPositionZ]} />
        )}

        {/* 槍口配件切換模型 */}
        {muzzle === "suppressor" && <Suppressor />}
        {muzzle === "flashHider" && <FlashHider />}
      </Canvas>

      {/* 🔧 Leva 控制面板 */}
      <Leva collapsed={false} />
    </Box>
  );
}
