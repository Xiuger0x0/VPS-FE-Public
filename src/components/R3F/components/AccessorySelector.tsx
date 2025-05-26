// src/components/AccessorySelector.tsx
import { useControls } from "leva";

// useAttachmentControls 是一個自訂 hook，用於建立「附件選擇」的控制選單，分為 optics（瞄具）與 muzzle（槍口裝置）
export function useAttachmentControls() {
  const attachments = useControls("附件選擇", {
    optics: {
      options: {
        無: "none",
        瞄具A: "opticA",
        瞄具B: "opticB",
      },
      value: "none",
      label: "瞄具選擇", // 🟦 中文標籤
    },

    opticPositionX: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.1,
      label: "X 軸位置", // ✅ 中文名稱
    },
    opticPositionY: {
      value: 0.6,
      min: 0.3,
      max: 2,
      step: 0.1,
      label: "Y 軸位置",
    },
    opticPositionZ: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.1,
      label: "Z 軸位置",
    },

    muzzle: {
      options: {
        無: "none",
        消音器: "suppressor",
        火帽: "flashHider",
      },
      value: "none",
      label: "槍口配件",
    },
  });

  return attachments;
}
