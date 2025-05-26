export default function MainBody() {
  return (
    <mesh position={[0, 0, 0]} castShadow>
      {/* 主體幾何可替換成外部模型 */}
      <boxGeometry args={[1.5, 1, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
