import { ColorModeButton } from "@/components/ui/color-mode";
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
  Card,
  Badge,
  Separator,
  Container,
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
  "950",
];

const semanticColorKeys = ["DEFAULT", "emphasized", "muted", "subtle", "ghost"];

const ColorSwatch = ({ label, color }: { label: string; color: string }) => (
  <VStack gap={1}>
    <Box
      w="60px"
      h="60px"
      bg={color}
      borderRadius="md"
      border="1px solid"
      borderColor="border"
      shadow="sm"
    />
    <Text fontSize="xs" color="fg.muted">
      {label}
    </Text>
  </VStack>
);

const ColorBlock = ({
  title,
  colorPrefix,
}: {
  title: string;
  colorPrefix: string;
}) => (
  <Card.Root>
    <Card.Body>
      <Heading size="sm" mb={4} color="fg">
        {title}
      </Heading>
      <HStack wrap="wrap" gap={3}>
        {colorKeys.map((key) => (
          <ColorSwatch
            key={key}
            label={`${key}`}
            color={`${colorPrefix}.${key}`}
          />
        ))}
      </HStack>
    </Card.Body>
  </Card.Root>
);

const SemanticColorBlock = ({
  title,
  colorPrefix,
}: {
  title: string;
  colorPrefix: string;
}) => (
  <Card.Root>
    <Card.Body>
      <Heading size="sm" mb={4} color="fg">
        {title}
      </Heading>
      <HStack wrap="wrap" gap={3}>
        {semanticColorKeys.map((key) => (
          <ColorSwatch
            key={key}
            label={key}
            color={key === "DEFAULT" ? colorPrefix : `${colorPrefix}.${key}`}
          />
        ))}
      </HStack>
    </Card.Body>
  </Card.Root>
);

const ButtonGroupBlock = ({
  title,
  colorPalette,
}: {
  title: string;
  colorPalette: string;
}) => (
  <Card.Root>
    <Card.Body>
      <Text fontWeight="medium" mb={4} color="fg">
        {title}
      </Text>
      <VStack gap={4} align="stretch">
        <ButtonGroup>
          <Button colorPalette={colorPalette} variant="solid">
            Solid
          </Button>
          <Button colorPalette={colorPalette} variant="outline">
            Outline
          </Button>
          <Button colorPalette={colorPalette} variant="ghost">
            Ghost
          </Button>
          <Button colorPalette={colorPalette} variant="subtle">
            Subtle
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button colorPalette={colorPalette} size="xs">
            XS
          </Button>
          <Button colorPalette={colorPalette} size="sm">
            SM
          </Button>
          <Button colorPalette={colorPalette} size="md">
            MD
          </Button>
          <Button colorPalette={colorPalette} size="lg">
            LG
          </Button>
        </ButtonGroup>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const StatusShowcase = () => (
  <Card.Root>
    <Card.Body>
      <Heading size="sm" mb={4} color="fg">
        狀態色彩與徽章
      </Heading>
      <VStack gap={4} align="stretch">
        <HStack wrap="wrap" gap={2}>
          <Badge colorPalette="success">成功</Badge>
          <Badge colorPalette="warning">警告</Badge>
          <Badge colorPalette="error">錯誤</Badge>
          <Badge colorPalette="info">資訊</Badge>
          <Badge colorPalette="primary">主要</Badge>
          <Badge colorPalette="secondary">次要</Badge>
          <Badge colorPalette="neutral">中性</Badge>
        </HStack>

        <HStack wrap="wrap" gap={2}>
          <Button colorPalette="success" size="sm">
            成功按鈕
          </Button>
          <Button colorPalette="warning" size="sm">
            警告按鈕
          </Button>
          <Button colorPalette="error" size="sm">
            錯誤按鈕
          </Button>
          <Button colorPalette="info" size="sm">
            資訊按鈕
          </Button>
        </HStack>
      </VStack>
    </Card.Body>
  </Card.Root>
);

export default function ThemePlayground() {
  return (
    <Box bg="bg.canvas" minH="100vh">
      <Container maxW="7xl" py={8}>
        {/* 頁面標題 */}
        <HStack justifyContent="space-between" mb={8}>
          <Heading size="xl" color="fg">
            🎨 元件遊樂場
          </Heading>
          <ColorModeButton rounded="full" />
        </HStack>

        {/* 基礎色彩系統 */}
        <VStack gap={6} align="stretch">
          <Box>
            <Heading size="lg" mb={4} color="fg">
              基礎色彩系統
            </Heading>
            <SimpleGrid columns={[1, null, 2]} gap={6}>
              <ColorBlock title="主色 (Primary)" colorPrefix="primary" />
              <ColorBlock title="副色 (Secondary)" colorPrefix="secondary" />
              <ColorBlock title="中性色 (Neutral)" colorPrefix="neutral" />
              <SemanticColorBlock title="語義化主色" colorPrefix="primary" />
            </SimpleGrid>
          </Box>

          <Separator />

          {/* 按鈕系統 */}
          <Box>
            <Heading size="lg" mb={4} color="fg">
              按鈕系統
            </Heading>
            <SimpleGrid columns={[1, null, 3]} gap={6}>
              <ButtonGroupBlock title="主色按鈕" colorPalette="primary" />
              <ButtonGroupBlock title="副色按鈕" colorPalette="secondary" />
              <ButtonGroupBlock title="中性色按鈕" colorPalette="neutral" />
            </SimpleGrid>
          </Box>

          <Separator />

          {/* 狀態色彩 */}
          <Box>
            <Heading size="lg" mb={4} color="fg">
              狀態色彩
            </Heading>
            <StatusShowcase />
          </Box>

          <Separator />

          {/* 玻璃態效果 */}
          <Box>
            <Heading size="lg" mb={4} color="fg">
              玻璃態效果
            </Heading>
            <SimpleGrid columns={[1, null, 2]} gap={6}>
              <Box
                h="200px"
                bg="primary.500"
                borderRadius="lg"
                position="relative"
                overflow="hidden"
              >
                <Box
                  {...glassmorphismStyle}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="120px"
                  h="120px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white" fontWeight="bold">
                    Primary
                  </Text>
                </Box>
              </Box>
              <Box
                h="200px"
                bg="secondary.500"
                borderRadius="lg"
                position="relative"
                overflow="hidden"
              >
                <Box
                  {...glassmorphismStyle}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="120px"
                  h="120px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white" fontWeight="bold">
                    Secondary
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          <Separator />

          {/* Line Bot 整合 */}
          <Box>
            <Heading size="lg" mb={4} color="fg">
              Line Bot 整合
            </Heading>
            <Card.Root>
              <Card.Body>
                <VStack gap={4}>
                  <QrCode.Root value="https://lin.ee/C8mOU9e">
                    <QrCode.Frame>
                      <QrCode.Pattern />
                    </QrCode.Frame>
                  </QrCode.Root>
                  <Link
                    href="https://lin.ee/pP8m3td"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                      alt="加入好友"
                      h="36px"
                    />
                  </Link>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
