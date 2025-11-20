import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  Badge,
  Button,
  Icon,
  Image,
  SimpleGrid,
  Flex,
  List,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaCrosshairs,
  FaGamepad,
  FaCoffee,
  FaUsers,
  FaTrophy,
  FaWifi,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaStar,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// 核心服務資料
const CORE_SERVICES = [
  {
    id: "tactical-range",
    title: "戰術射擊場",
    subtitle: "專業級氣槍射擊體驗",
    description: "配備最新科技的室內射擊場，提供多種射擊模式和難度等級",
    icon: FaCrosshairs,
    color: "primary",
    features: ["智能靶標系統", "即時成績統計", "多種射擊模式", "專業教練指導"],
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "vr-training",
    title: "VR 戰術訓練",
    subtitle: "沉浸式虛擬實境體驗",
    description: "結合 VR 技術的戰術訓練，體驗真實的 Rainbow Six 作戰場景",
    icon: FaCrosshairs,
    color: "secondary",
    features: [
      "Rainbow Six 場景",
      "團隊協作模式",
      "戰術策略訓練",
      "即時語音通訊",
    ],
    image:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "esports-arena",
    title: "電競競技場",
    subtitle: "專業電競賽事空間",
    description: "高規格電競設備，舉辦各種射擊遊戲競賽和錦標賽",
    icon: FaTrophy,
    color: "success",
    features: ["專業電競設備", "大型顯示螢幕", "賽事直播系統", "觀眾席設計"],
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "cafe-lounge",
    title: "主題咖啡廳",
    subtitle: "軍事風格輕食空間",
    description: "提供精緻點心飲料，打造舒適的休憩和社交環境",
    icon: FaCoffee,
    color: "warning",
    features: ["軍事主題裝潢", "精緻咖啡飲品", "戰術風格點心", "舒適社交空間"],
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=60",
  },
];

// 特色亮點
const HIGHLIGHTS = [
  {
    icon: FaShieldAlt,
    title: "安全第一",
    description: "嚴格的安全規範和專業防護設備",
  },
  {
    icon: FaWifi,
    title: "智能科技",
    description: "IoT 設備整合，數據即時追蹤分析",
  },
  {
    icon: FaUsers,
    title: "社群體驗",
    description: "建立戰術愛好者的交流社群平台",
  },
  {
    icon: FaMapMarkedAlt,
    title: "多元場景",
    description: "可變換的場地配置和任務場景",
  },
];

// 菜單資料
const MENU_CATEGORIES = [
  {
    id: "beverages",
    name: "戰術飲品",
    icon: FaCoffee,
    items: [
      {
        name: "狙擊手特調咖啡",
        price: "NT$ 180",
        description: "濃郁義式咖啡，提神醒腦",
      },
      {
        name: "突擊隊能量飲",
        price: "NT$ 150",
        description: "維他命 B 群，快速補充體力",
      },
      {
        name: "偵察兵綠茶",
        price: "NT$ 120",
        description: "清香綠茶，保持專注力",
      },
      {
        name: "指揮官熱可可",
        price: "NT$ 160",
        description: "溫暖可可，舒緩緊張情緒",
      },
    ],
  },
  {
    id: "snacks",
    name: "戰術點心",
    icon: FaGamepad,
    items: [
      {
        name: "彈匣造型餅乾",
        price: "NT$ 80",
        description: "酥脆餅乾，創意造型",
      },
      {
        name: "手榴彈馬卡龍",
        price: "NT$ 120",
        description: "法式馬卡龍，精緻美味",
      },
      {
        name: "戰術背包蛋糕",
        price: "NT$ 200",
        description: "巧克力蛋糕，造型逼真",
      },
      {
        name: "軍用口糧三明治",
        price: "NT$ 180",
        description: "豐富配料，營養均衡",
      },
    ],
  },
  {
    id: "meals",
    name: "作戰簡餐",
    icon: FaShieldAlt,
    items: [
      {
        name: "特種部隊牛肉堡",
        price: "NT$ 280",
        description: "厚實牛肉排，配薯條沙拉",
      },
      {
        name: "狙擊手雞肉捲",
        price: "NT$ 220",
        description: "嫩煎雞肉，蔬菜捲餅",
      },
      {
        name: "突擊隊義大利麵",
        price: "NT$ 250",
        description: "奶油白醬，培根蘑菇",
      },
      {
        name: "指揮官燉飯",
        price: "NT$ 300",
        description: "海鮮燉飯，香濃起司",
      },
    ],
  },
];

export const ServicePage: React.FC = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeMenuCategory, setActiveMenuCategory] = useState("beverages");

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <>
      <Helmet>
        <title>{`${appName} | TactiCafe - 科技戰術體驗館`}</title>
        <meta
          name="description"
          content="結合科技與戰術的複合式氣槍靶場，提供 Rainbow Six 真人體驗、VR 訓練和精緻軍事主題餐飲"
        />
      </Helmet>

      <Box bg="bg.canvas" minH="100vh">
        {/* Hero Section */}
        <Box
          position="relative"
          minH="100vh"
          bgImage="url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&q=80')"
          bgSize="cover"
          bgPos="center"
          bgAttachment="fixed"
        >
          {/* 漸變遮罩 */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, blackAlpha.600, blackAlpha.800)"
          />

          {/* Hero 內容 */}
          <Flex
            position="relative"
            zIndex={1}
            minH="100vh"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color="white"
          >
            <Container maxW="4xl">
              <VStack gap={8}>
                <Badge colorPalette="primary" size="lg" px={4} py={2}>
                  創業計畫 2024
                </Badge>

                <Heading size="4xl" fontWeight="bold" lineHeight="shorter">
                  TactiCafe
                </Heading>

                <Heading size="xl" fontWeight="normal" color="whiteAlpha.900">
                  科技戰術體驗館
                </Heading>

                <Text
                  fontSize="xl"
                  maxW="2xl"
                  lineHeight="tall"
                  color="whiteAlpha.800"
                >
                  結合最新科技的複合式氣槍靶場，打造真人版 Rainbow Six 體驗。
                  專業戰術訓練、VR 沉浸體驗，搭配精緻軍事主題餐飲，
                  為戰術愛好者創造前所未有的娛樂空間。
                </Text>

                <HStack gap={4} pt={4}>
                  <Button colorPalette="primary" size="lg">
                    <Icon mr={2}>
                      <FaPlay />
                    </Icon>
                    觀看介紹影片
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    color="white"
                    borderColor="white"
                  >
                    了解更多
                  </Button>
                </HStack>
              </VStack>
            </Container>
          </Flex>
        </Box>

        {/* 核心服務區域 */}
        <Container maxW="7xl" py={20}>
          <VStack gap={16} align="stretch">
            <Box textAlign="center">
              <Heading size="2xl" mb={4} color="fg">
                核心服務體驗
              </Heading>
              <Text fontSize="lg" color="fg.muted" maxW="3xl" mx="auto">
                四大主題區域，打造完整的戰術娛樂生態圈
              </Text>
            </Box>

            {/* 服務卡片網格 */}
            <SimpleGrid columns={[1, null, 2]} gap={8}>
              {CORE_SERVICES.map((service) => (
                <Card.Root
                  key={service.id}
                  overflow="hidden"
                  shadow="lg"
                  _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                  transition="all 0.3s"
                >
                  <Box position="relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      w="full"
                      h="250px"
                      objectFit="cover"
                    />
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      p={3}
                      bg={`${service.color}.500`}
                      borderRadius="full"
                      color="white"
                    >
                      <Icon boxSize={6}>
                        <service.icon />
                      </Icon>
                    </Box>
                  </Box>

                  <Card.Body p={6}>
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Heading size="lg" color="fg" mb={2}>
                          {service.title}
                        </Heading>
                        <Text
                          color={`${service.color}.500`}
                          fontWeight="medium"
                          mb={3}
                        >
                          {service.subtitle}
                        </Text>
                        <Text color="fg.muted" lineHeight="tall">
                          {service.description}
                        </Text>
                      </Box>

                      {/* 可展開的功能列表 */}
                      <Box>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleServiceExpansion(service.id)}
                          w="full"
                          justifyContent="space-between"
                        >
                          查看詳細功能
                          <Icon ml={2}>
                            {expandedService === service.id ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </Icon>
                        </Button>

                        {expandedService === service.id && (
                          <Box mt={4} p={4} bg="bg.muted" borderRadius="md">
                            <List.Root>
                              {service.features.map((feature, index) => (
                                <List.Item key={index}>
                                  <List.Indicator>
                                    <Icon color={`${service.color}.500`}>
                                      <FaStar />
                                    </Icon>
                                  </List.Indicator>
                                  <Text fontSize="sm" color="fg">
                                    {feature}
                                  </Text>
                                </List.Item>
                              ))}
                            </List.Root>
                          </Box>
                        )}
                      </Box>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>

        {/* 特色亮點 */}
        <Box bg="bg.subtle" py={20}>
          <Container maxW="7xl">
            <VStack gap={12} align="stretch">
              <Box textAlign="center">
                <Heading size="2xl" mb={4} color="fg">
                  為什麼選擇 TactiCafe？
                </Heading>
                <Text fontSize="lg" color="fg.muted">
                  我們的獨特優勢
                </Text>
              </Box>

              <SimpleGrid columns={[1, 2, 4]} gap={8}>
                {HIGHLIGHTS.map((highlight, index) => (
                  <Card.Root key={index} textAlign="center" p={6}>
                    <Card.Body>
                      <VStack gap={4}>
                        <Box
                          p={4}
                          bg="primary.muted"
                          borderRadius="full"
                          color="primary"
                        >
                          <Icon boxSize={8}>
                            <highlight.icon />
                          </Icon>
                        </Box>
                        <Heading size="md" color="fg">
                          {highlight.title}
                        </Heading>
                        <Text color="fg.muted" fontSize="sm" textAlign="center">
                          {highlight.description}
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* 菜單展示 */}
        <Container maxW="7xl" py={20}>
          <VStack gap={12} align="stretch">
            <Box textAlign="center">
              <Heading size="2xl" mb={4} color="fg">
                戰術主題菜單
              </Heading>
              <Text fontSize="lg" color="fg.muted" maxW="3xl" mx="auto">
                精心設計的軍事主題餐飲，讓味蕾也參與戰術體驗
              </Text>
            </Box>

            {/* 菜單分類導航 */}
            <HStack justify="center" wrap="wrap" gap={4}>
              {MENU_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeMenuCategory === category.id ? "solid" : "outline"
                  }
                  colorPalette={
                    activeMenuCategory === category.id ? "primary" : "neutral"
                  }
                  onClick={() => setActiveMenuCategory(category.id)}
                >
                  <Icon mr={2}>
                    <category.icon />
                  </Icon>
                  {category.name}
                </Button>
              ))}
            </HStack>

            {/* 菜單項目 */}
            <Box>
              {MENU_CATEGORIES.filter(
                (cat) => cat.id === activeMenuCategory
              ).map((category) => (
                <SimpleGrid key={category.id} columns={[1, null, 2]} gap={6}>
                  {category.items.map((item, index) => (
                    <Card.Root key={index}>
                      <Card.Body p={6}>
                        <Flex justify="space-between" align="start" gap={4}>
                          <Box flex={1}>
                            <Heading size="md" color="fg" mb={2}>
                              {item.name}
                            </Heading>
                            <Text
                              color="fg.muted"
                              fontSize="sm"
                              lineHeight="tall"
                            >
                              {item.description}
                            </Text>
                          </Box>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="primary.500"
                            whiteSpace="nowrap"
                          >
                            {item.price}
                          </Text>
                        </Flex>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>
              ))}
            </Box>
          </VStack>
        </Container>

        {/* CTA 區域 */}
        <Box bg="primary.muted" py={20}>
          <Container maxW="4xl" textAlign="center">
            <VStack gap={8}>
              <Heading size="2xl" color="primary">
                準備好體驗未來戰術娛樂了嗎？
              </Heading>
              <Text fontSize="lg" color="fg.muted" maxW="2xl">
                加入我們的創業計畫，成為戰術體驗革命的一份子。
                投資機會有限，搶先體驗無限可能。
              </Text>
              <HStack gap={4}>
                <Button colorPalette="primary" size="lg">
                  投資諮詢
                </Button>
                <Button variant="outline" colorPalette="primary" size="lg">
                  預約體驗
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
};
