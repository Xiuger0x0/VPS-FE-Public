import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Icon,
  Image,
  Tabs,
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

export const ServicePage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeMenuCategory, setActiveMenuCategory] = useState("beverages");

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <>
      <Helmet>
        <title>{`${appName} | SERVICES`}</title>
        <meta
          name="description"
          content="TactiCafe - Tactical Experience & Dining"
        />
      </Helmet>

      <Box bg="#0f0f0f" minH="100vh" color="white">
        {/* Hero Section */}
        <Box
          position="relative"
          h="60vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage="url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&q=80')"
            bgSize="cover"
            bgPos="center"
            bgAttachment="fixed"
            filter="grayscale(100%) brightness(0.3)"
            zIndex={0}
          />
          <Container maxW="7xl" position="relative" zIndex={1} textAlign="center">
            <VStack gap={6}>
              <Heading size="5xl" letterSpacing="widest" fontWeight="bold" color="white">
                SERVICES
              </Heading>
              <Text color="gray.300" fontSize="2xl" maxW="2xl" letterSpacing="wide">
                Tactical Experience & Dining
              </Text>
            </VStack>
          </Container>
        </Box>

        <Container maxW="7xl" py={20}>
            {/* Core Services */}
            <Box mb={24}>
                <Heading size="xl" mb={12} letterSpacing="wide" color="#FF6600">
                    EXPERIENCES
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="start">
                    {CORE_SERVICES.map((service) => (
                        <Box
                            key={service.id}
                            bg="whiteAlpha.50"
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor="whiteAlpha.200"
                            overflow="hidden"
                            transition="all 0.3s"
                            _hover={{
                                borderColor: "#FF6600",
                                transform: "translateY(-5px)",
                                boxShadow: "0 0 20px rgba(255, 102, 0, 0.2)",
                                bg: "whiteAlpha.100"
                            }}
                        >
                            <Box position="relative" h="250px">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    w="full"
                                    h="full"
                                    objectFit="cover"
                                />
                                <Box
                                    position="absolute"
                                    top={4}
                                    left={4}
                                    p={3}
                                    bg="blackAlpha.700"
                                    borderRadius="full"
                                    color="#FF6600"
                                    backdropFilter="blur(10px)"
                                >
                                    <Icon boxSize={6}>
                                        <service.icon />
                                    </Icon>
                                </Box>
                            </Box>

                            <VStack p={8} align="stretch" gap={4}>
                                <Box>
                                    <Heading size="xl" mb={2}>{service.title}</Heading>
                                    <Text color="gray.400" fontSize="lg">{service.subtitle}</Text>
                                </Box>
                                <Text color="gray.500" lineHeight="tall">
                                    {service.description}
                                </Text>

                                {/* Features Toggle */}
                                <Button
                                    variant="ghost"
                                    color="white"
                                    justifyContent="space-between"
                                    onClick={() => toggleServiceExpansion(service.id)}
                                    _hover={{ bg: "whiteAlpha.100" }}
                                    mt={2}
                                >
                                    FEATURES
                                    <Icon>
                                        {expandedService === service.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </Icon>
                                </Button>

                                {expandedService === service.id && (
                                    <Box pt={4} borderTopWidth="1px" borderColor="whiteAlpha.200">
                                        <VStack align="start" gap={2}>
                                            {service.features.map((feature, index) => (
                                                <HStack key={index} color="gray.400">
                                                    <Icon color="#FF6600" boxSize={3}><FaStar /></Icon>
                                                    <Text fontSize="sm">{feature}</Text>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </Box>
                                )}
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            {/* Highlights */}
            <Box mb={24}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
                    {HIGHLIGHTS.map((highlight, index) => (
                        <VStack
                            key={index}
                            bg="whiteAlpha.50"
                            p={8}
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor="whiteAlpha.200"
                            textAlign="center"
                            gap={4}
                            transition="all 0.3s"
                            _hover={{ borderColor: "#00FFFF", transform: "translateY(-5px)" }}
                        >
                            <Icon boxSize={8} color="#00FFFF">
                                <highlight.icon />
                            </Icon>
                            <Heading size="md">{highlight.title}</Heading>
                            <Text color="gray.500" fontSize="sm">
                                {highlight.description}
                            </Text>
                        </VStack>
                    ))}
                </SimpleGrid>
            </Box>

            {/* Menu */}
            <Box mb={24}>
                <Heading size="xl" mb={12} letterSpacing="wide" color="#003366">
                    MENU
                </Heading>
                
                <Tabs.Root
                    value={activeMenuCategory}
                    onValueChange={(e) => setActiveMenuCategory(e.value)}
                    variant="line"
                    colorPalette="blue"
                >
                    <Tabs.List bg="transparent" borderBottomColor="whiteAlpha.200" mb={8}>
                        {MENU_CATEGORIES.map((cat) => (
                            <Tabs.Trigger
                                key={cat.id}
                                value={cat.id}
                                color="gray.400"
                                _selected={{ color: "#003366", borderColor: "#003366" }}
                                _hover={{ color: "white" }}
                                px={6}
                                py={3}
                            >
                                <HStack gap={2}>
                                    <Icon><cat.icon /></Icon>
                                    <Text>{cat.name}</Text>
                                </HStack>
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    {MENU_CATEGORIES.map((category) => (
                        <Tabs.Content key={category.id} value={category.id}>
                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                                {category.items.map((item, index) => (
                                    <Box
                                        key={index}
                                        bg="whiteAlpha.50"
                                        p={6}
                                        borderRadius="lg"
                                        borderWidth="1px"
                                        borderColor="whiteAlpha.200"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="start"
                                        _hover={{ bg: "whiteAlpha.100" }}
                                    >
                                        <VStack align="start" gap={1}>
                                            <Heading size="md">{item.name}</Heading>
                                            <Text color="gray.500" fontSize="sm">{item.description}</Text>
                                        </VStack>
                                        <Text color="#003366" fontWeight="bold" fontSize="lg">
                                            {item.price}
                                        </Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </Box>

            {/* CTA */}
            <Box
                bgGradient="linear(to-r, whiteAlpha.50, whiteAlpha.100)"
                p={12}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                textAlign="center"
            >
                <VStack gap={6}>
                    <Heading size="2xl">Ready to Join?</Heading>
                    <Text color="gray.400" fontSize="lg" maxW="2xl">
                        Experience the future of tactical entertainment.
                    </Text>
                    <HStack gap={4}>
                        <Button size="lg" colorPalette="cyan" variant="solid">
                            Contact Us
                        </Button>
                        <Button size="lg" variant="outline" color="white" borderColor="whiteAlpha.500" _hover={{ bg: "whiteAlpha.100" }}>
                            Book Now
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </Container>
      </Box>
    </>
  );
};

