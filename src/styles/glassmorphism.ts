/**
 * 一個表示玻璃態樣式的對象。
 * 
 * @property {string} bg - 帶有透明度的背景顏色。
 * @property {string} backdropFilter - 背景濾鏡效果，通常是模糊。
 * @property {string} borderRadius - 用於圓角的邊框半徑。
 */
export const glassmorphismStyle = {
  bg: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "5px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};
