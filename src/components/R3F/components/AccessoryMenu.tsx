import { useState } from "react";
import { Box, Image, Text, SimpleGrid } from "@chakra-ui/react";

const accessories = [
  { name: "Optic A", value: "opticA", imgSrc: "/images/opticA.png" },
  { name: "Optic B", value: "opticB", imgSrc: "/images/opticB.png" },
  { name: "Suppressor", value: "suppressor", imgSrc: "/images/suppressor.png" },
  {
    name: "Flash Hider",
    value: "flashHider",
    imgSrc: "/images/flashHider.png",
  },
];

export default function AccessoryMenu() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SimpleGrid columns={[2, 2]}>
      {accessories.map((item) => (
        <Box
          key={item.value}
          borderWidth={2}
          borderColor={selected === item.value ? "blue.400" : "transparent"}
          borderRadius="xl"
          p={2}
          cursor="pointer"
          boxShadow="md"
          _hover={{ borderColor: "blue.300" }}
          onClick={() => setSelected(item.value)}
          transition="all 0.2s"
        >
          <Image src={item.imgSrc} alt={item.name} boxSize="80px" mx="auto" />
          <Text
            mt={2}
            textAlign="center"
            fontWeight={selected === item.value ? "bold" : "normal"}
          >
            {item.name}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
