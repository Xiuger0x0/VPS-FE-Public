import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { glassmorphismStyle } from "@/styles/glassmorphism";
import {
  Box,
  Text,
  SimpleGrid,
  Heading,
  Button,
  VStack,
  HStack,
  ButtonGroup,
  QrCode,
  Link,
  Image,
} from "@chakra-ui/react";

const colorKeys = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

const ColorSwatch = ({ label, color }: { label: string; color: string }) => (
  <VStack>
    <Box w="60px" h="60px" bg={color} borderRadius="md" />
    <Text fontSize="xs">{label}</Text>
  </VStack>
);

const ColorBlock = ({
  title,
  colorPrefix,
}: {
  title: string;
  colorPrefix: string;
}) => (
  <Box>
    <Heading size="sm" mb={2}>
      {title}
    </Heading>
    <HStack wrap="wrap">
      {colorKeys.map((key) => (
        <ColorSwatch
          key={key}
          label={`${key}`}
          color={`${colorPrefix}.${key}`}
        />
      ))}
    </HStack>
  </Box>
);

const ButtonGroupBlock = ({
  title,
  colorScheme,
}: {
  title: string;
  colorScheme: string;
}) => (
  <VStack align="flex-start" mt={4}>
    <Text fontWeight="medium">{title}</Text>
    <ButtonGroup>
      <Button
        colorScheme={colorScheme}
        variant="solid"
        bgColor={`${colorScheme}.500`}
        _hover={{ bg: `${colorScheme}.700` }}
        focusRingColor={`${colorScheme}.300`}
      >
        Solid
      </Button>
      <Button
        colorScheme={colorScheme}
        variant="outline"
        bgColor={`${colorScheme}.500`}
        _hover={{ bg: `${colorScheme}.700` }}
        focusRingColor={`${colorScheme}.300`}
      >
        Outline
      </Button>
      <Button
        colorScheme={colorScheme}
        variant="ghost"
        bgColor={`${colorScheme}.500`}
        _hover={{ bg: `${colorScheme}.700` }}
        focusRingColor={`${colorScheme}.300`}
      >
        Ghost
      </Button>
    </ButtonGroup>
  </VStack>
);

export default function ThemePlayground() {
  const bg = useColorModeValue("#F0F7EE", "#474847");

  return (
    <Box bg={bg} p={8} minH="100vh">
      <HStack justifyContent="space-between" mb={6}>
        <Heading size="lg">🎨 原件遊樂場</Heading>
        <ColorModeButton rounded="full"></ColorModeButton>
      </HStack>

      <SimpleGrid columns={[1, null, 2]}>
        <ColorBlock title={"Primary 顏色"} colorPrefix={"primary"} />
        <ColorBlock title={"Secondary 顏色"} colorPrefix={"secondary"} />

        <ButtonGroupBlock title={"Primary 按鈕"} colorScheme={"primary"} />
        <ButtonGroupBlock title={"Primary 按鈕"} colorScheme={"secondary"} />
      </SimpleGrid>

      <SimpleGrid mt={12}>
        <Heading size="lg">基礎按鈕</Heading>
        <HStack>
          <Button size="sm" colorScheme="primary">
            Small
          </Button>
          <Button size="md" colorScheme="primary">
            Medium
          </Button>
          <Button size="lg" colorScheme="primary">
            Large
          </Button>
        </HStack>
      </SimpleGrid>

      <SimpleGrid columns={[1, null, 2]} mt={12}>
        <Box boxSize={"sm"} bgColor={"primary"}>
          <Box {...glassmorphismStyle} boxSize={"xs"} m={"auto"} mt={7}></Box>
        </Box>
        <Box boxSize={"sm"} bgColor={"secondary"}>
          <Box {...glassmorphismStyle} boxSize={"xs"} m={"auto"} mt={7}></Box>
        </Box>
      </SimpleGrid>

      <Box alignItems={"center"} mt={12}>
        <QrCode.Root value="https://lin.ee/C8mOU9e">
          <QrCode.Frame>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode.Root>
        <Link href="https://lin.ee/pP8m3td" target="_blank" rel="noreferrer">
          <Image
            src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
            alt="加入好友"
            h={"36px"}
          />
        </Link>
      </Box>
    </Box>
  );
}
