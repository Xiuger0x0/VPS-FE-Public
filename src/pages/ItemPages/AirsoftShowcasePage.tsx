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
  Input,
  Spinner,
  Separator,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogBody,
  DialogFooter,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback } from "react";
import {
  FaSearch,
  FaHeart,
  FaShare,
  FaTimes,
  FaStar,
  FaUser,
  FaCalendar,
  FaTag,
  FaCrosshairs,
  FaShieldAlt,
  FaBullseye,
  FaFire,
  FaBolt,
  FaCogs,
  FaWind,
} from "react-icons/fa";

// 氣槍項目類型定義
interface AirsoftItem {
  id: string;
  title: string;
  category: string;
  powerType: string;
  brand: string;
  model: string;
  price: string;
  rating: number;
  likes: number;
  views: number;
  image: string;
  user: {
    name: string;
    avatar: string;
  };
  uploadDate: string;
  accessories: string[];
  specs: {
    length: string;
    weight: string;
    capacity: string;
    fps: string;
  };
  description: string;
}

// 氣槍分類資料
const AIRSOFT_CATEGORIES = [
  { id: "all", name: "全部", icon: FaCrosshairs, count: 0 },
  { id: "assault-rifle", name: "突擊步槍", icon: FaFire, count: 0 },
  { id: "sniper-rifle", name: "狙擊步槍", icon: FaBullseye, count: 0 },
  { id: "submachine-gun", name: "衝鋒槍", icon: FaShieldAlt, count: 0 },
  { id: "pistol", name: "手槍", icon: FaUser, count: 0 },
  { id: "shotgun", name: "霰彈槍", icon: FaTag, count: 0 },
];

// 動力類型分類
const POWER_TYPES = [
  { id: "electric", name: "電動", icon: FaBolt },
  { id: "gas", name: "氣動", icon: FaWind },
  { id: "spring", name: "彈簧", icon: FaCogs },
];

// 測試資料 - 氣槍展示
const MOCK_AIRSOFT_DATA = [
  {
    id: "1",
    title: "M4A1 戰術突擊步槍",
    category: "assault-rifle",
    powerType: "electric",
    brand: "Tokyo Marui",
    model: "M4A1 SOPMOD",
    price: "NT$ 15,800",
    rating: 4.8,
    likes: 156,
    views: 2340,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    user: {
      name: "戰術大師",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    },
    uploadDate: "2024-01-15",
    accessories: ["紅點瞄準鏡", "戰術握把", "消音器", "戰術燈"],
    specs: {
      length: "840mm",
      weight: "2.8kg",
      capacity: "300發",
      fps: "280-300",
    },
    description:
      "經典的 M4A1 突擊步槍，配備完整的戰術配件，適合 CQB 和野戰使用。",
  },
  {
    id: "2",
    title: "AWP 狙擊步槍",
    category: "sniper-rifle",
    powerType: "spring",
    brand: "Well",
    model: "MB4401D",
    price: "NT$ 8,500",
    rating: 4.5,
    likes: 89,
    views: 1560,
    image:
      "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=600&q=80",
    user: {
      name: "狙擊手小明",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
    uploadDate: "2024-01-12",
    accessories: ["高倍瞄準鏡", "兩腳架", "消音器"],
    specs: {
      length: "1230mm",
      weight: "4.2kg",
      capacity: "30發",
      fps: "450-480",
    },
    description: "高精度狙擊步槍，適合遠距離精準射擊，配備專業瞄準鏡。",
  },
  {
    id: "3",
    title: "Glock 17 戰術手槍",
    category: "pistol",
    powerType: "gas",
    brand: "WE Tech",
    model: "Glock 17 Gen4",
    price: "NT$ 4,200",
    rating: 4.6,
    likes: 234,
    views: 3120,
    image:
      "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=600&q=80",
    user: {
      name: "手槍專家",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
    uploadDate: "2024-01-10",
    accessories: ["戰術燈", "雷射瞄準器", "消音器"],
    specs: {
      length: "186mm",
      weight: "0.8kg",
      capacity: "25發",
      fps: "280-300",
    },
    description: "經典的 Glock 17 手槍，可靠性高，適合 CQB 和備用武器使用。",
  },
  {
    id: "4",
    title: "MP5 衝鋒槍",
    category: "submachine-gun",
    powerType: "electric",
    brand: "Classic Army",
    model: "MP5A5",
    price: "NT$ 12,000",
    rating: 4.7,
    likes: 178,
    views: 2890,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    user: {
      name: "CQB專家",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=100&q=80",
    },
    uploadDate: "2024-01-08",
    accessories: ["紅點瞄準鏡", "戰術握把", "戰術燈"],
    specs: {
      length: "680mm",
      weight: "2.2kg",
      capacity: "200發",
      fps: "300-320",
    },
    description: "德國經典衝鋒槍，緊湊設計適合室內戰鬥，射速快且精準。",
  },
];

export const AirsoftShowcasePage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPowerType, setSelectedPowerType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [airsoftData, setAirsoftData] =
    useState<AirsoftItem[]>(MOCK_AIRSOFT_DATA);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState<AirsoftItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  // 更新分類計數
  const updateCategoryCounts = useCallback(() => {
    const updatedCategories = AIRSOFT_CATEGORIES.map((category) => ({
      ...category,
      count:
        category.id === "all"
          ? airsoftData.length
          : airsoftData.filter((item) => item.category === category.id).length,
    }));
    return updatedCategories;
  }, [airsoftData]);

  // 過濾資料
  const filteredData = airsoftData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesPowerType =
      selectedPowerType === "all" || item.powerType === selectedPowerType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPowerType && matchesSearch;
  });

  // 模擬載入更多資料
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // 模擬 API 延遲
    setTimeout(() => {
      // 這裡之後會替換為真實的 API 調用
      const newData = [...MOCK_AIRSOFT_DATA].map((item) => ({
        ...item,
        id: `${item.id}_${Date.now()}`,
      }));

      setAirsoftData((prev) => [...prev, ...newData]);
      setLoading(false);

      // 模擬資料載入完畢
      if (airsoftData.length > 20) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, airsoftData.length]);

  // 無限滾動的最後一個元素 ref
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreData]
  );

  // 開啟詳細資訊 Modal
  const openItemModal = (item: AirsoftItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{`${appName} | 氣槍展示館`}</title>
        <meta
          name="description"
          content="探索精彩的氣槍收藏，分享您的戰術裝備，與愛好者交流心得"
        />
      </Helmet>

      {/* 展示頁面主容器 */}
      <Box bg="#0f0f0f" minH="100vh" color="white">
        {/* 置頂搜尋與過濾區域 */}
        <Box
          position="sticky"
          top="0"
          zIndex={100}
          bg="rgba(15, 15, 15, 0.8)"
          backdropFilter="blur(10px)"
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
          py={6}
          mt={"60px"}
          shadow="sm"
        >
          <Container maxW="7xl">
            <VStack gap={6} align="stretch">
              {/* 搜尋欄 */}
              <Box maxW="2xl" mx="auto" w="full">
                <HStack gap={3} p={4} bg="whiteAlpha.100" borderRadius="xl" borderWidth="1px" borderColor="whiteAlpha.200">
                  <Icon color="gray.400" fontSize="xl">
                    <FaSearch />
                  </Icon>
                  <Input
                    placeholder="搜尋氣槍名稱、品牌或型號..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="subtle"
                    bg="transparent"
                    _focus={{ bg: "transparent", boxShadow: "none" }}
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                    size="lg"
                    flex={1}
                  />
                </HStack>
              </Box>

              {/* 過濾選項 */}
              <HStack justify="center" wrap="wrap" gap={4}>
                {/* 武器分類 */}
                <HStack gap={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.400">
                    分類:
                  </Text>
                  <HStack gap={1}>
                    {updateCategoryCounts().map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "solid" : "ghost"
                        }
                        bg={selectedCategory === category.id ? "#FF6600" : "transparent"}
                        color={selectedCategory === category.id ? "white" : "gray.400"}
                        _hover={{ bg: selectedCategory === category.id ? "#E65C00" : "whiteAlpha.100", color: "white" }}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon mr={1}>
                          <category.icon />
                        </Icon>
                        {category.name}
                        <Badge ml={1} size="sm" colorPalette={selectedCategory === category.id ? "white" : "gray"} variant="solid" bg={selectedCategory === category.id ? "whiteAlpha.300" : "whiteAlpha.200"}>
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </HStack>
                </HStack>

                <Separator orientation="vertical" h="6" borderColor="whiteAlpha.200" />

                {/* 動力類型 */}
                <HStack gap={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.400">
                    動力:
                  </Text>
                  <HStack gap={1}>
                    <Button
                        variant={selectedPowerType === "all" ? "solid" : "ghost"}
                        bg={selectedPowerType === "all" ? "#00FFFF" : "transparent"}
                        color={selectedPowerType === "all" ? "black" : "gray.400"}
                        _hover={{ bg: selectedPowerType === "all" ? "#00E6E6" : "whiteAlpha.100", color: selectedPowerType === "all" ? "black" : "white" }}
                        size="sm"
                        onClick={() => setSelectedPowerType("all")}
                    >
                      全部
                    </Button>
                    {POWER_TYPES.map((powerType) => (
                      <Button
                        key={powerType.id}
                        variant={
                          selectedPowerType === powerType.id
                            ? "solid"
                            : "ghost"
                        }
                        bg={selectedPowerType === powerType.id ? "#00FFFF" : "transparent"}
                        color={selectedPowerType === powerType.id ? "black" : "gray.400"}
                        _hover={{ bg: selectedPowerType === powerType.id ? "#00E6E6" : "whiteAlpha.100", color: selectedPowerType === powerType.id ? "black" : "white" }}
                        size="sm"
                        onClick={() => setSelectedPowerType(powerType.id)}
                      >
                        <Icon mr={1}>
                          <powerType.icon />
                        </Icon>
                        {powerType.name}
                      </Button>
                    ))}
                  </HStack>
                </HStack>

                <Separator orientation="vertical" h="6" borderColor="whiteAlpha.200" />

                {/* 結果統計 */}
                <Text fontSize="sm" color="gray.500">
                  共 {filteredData.length} 項結果
                </Text>
              </HStack>
            </VStack>
          </Container>
        </Box>

        {/* 主要內容區域 */}
        <Container maxW="7xl" py={8}>
          {/* 氣槍卡片網格 */}
          <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={6}>
            {filteredData.map((item, index) => (
              <Card.Root
                key={item.id}
                ref={index === filteredData.length - 1 ? lastItemRef : null}
                overflow="hidden"
                bg="whiteAlpha.50"
                borderColor="whiteAlpha.200"
                borderWidth="1px"
                borderRadius="xl"
                shadow="sm"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg",
                  borderColor: "#FF6600",
                  bg: "whiteAlpha.100"
                }}
                transition="all 0.3s ease"
                cursor="pointer"
                onClick={() => openItemModal(item)}
              >
                {/* 簡化的圖片區域 */}
                <Box position="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="full"
                    h="240px"
                    objectFit="cover"
                    borderTopRadius="xl"
                  />

                  {/* 愛心徽章 */}
                  <Box position="absolute" bottom={2} left={2}>
                    <Badge colorPalette="orange" size="sm" variant="solid">
                      <Icon mr={1}>
                        <FaHeart />
                      </Icon>
                      {item.rating}
                    </Badge>
                  </Box>
                </Box>

                {/* 簡化的卡片內容 */}
                <Card.Body p={4}>
                  <VStack gap={2} align="stretch">
                    <Heading size="sm" color="white" lineClamp={1}>
                      {item.title}
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                      {item.brand}
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>

          {/* 載入更多指示器 */}
          {loading && (
            <Flex justify="center" mt={8}>
              <Spinner size="lg" color="cyan.500" />
            </Flex>
          )}

          {!hasMore && (
            <Text textAlign="center" mt={8} color="gray.500">
              已載入全部內容
            </Text>
          )}
        </Container>
      </Box>

      {/* 詳細資訊 Dialog */}
      <DialogRoot
        open={isModalOpen}
        onOpenChange={(details: { open: boolean }) =>
          setIsModalOpen(details.open)
        }
        size="xl"
      >
        <DialogBackdrop bg="blackAlpha.800" backdropFilter="blur(5px)" />
        <DialogPositioner>
          <DialogContent bg="#1a1a1a" color="white" borderColor="whiteAlpha.200" borderWidth="1px">
            <DialogHeader>
              <DialogTitle color="white">{selectedItem?.title}</DialogTitle>
              <DialogCloseTrigger asChild>
                <Button variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}>
                  <FaTimes />
                </Button>
              </DialogCloseTrigger>
            </DialogHeader>

            <DialogBody>
              {selectedItem && (
                <VStack gap={6} align="stretch">
                  {/* 主要圖片 */}
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    w="full"
                    h="300px"
                    objectFit="cover"
                    borderRadius="md"
                  />

                  {/* 基本資訊 */}
                  <SimpleGrid columns={2} gap={6}>
                    <Box>
                      <Heading size="md" mb={3} color="#FF6600">
                        基本資訊
                      </Heading>
                      <VStack gap={2} align="stretch">
                        <HStack justify="space-between">
                          <Text color="gray.400">品牌：</Text>
                          <Text color="white">{selectedItem.brand}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.400">型號：</Text>
                          <Text color="white">{selectedItem.model}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.400">價格：</Text>
                          <Text color="#00FFFF" fontWeight="bold">
                            {selectedItem.price}
                          </Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.400">評分：</Text>
                          <HStack>
                            <Icon color="yellow.400">
                              <FaStar />
                            </Icon>
                            <Text color="white">{selectedItem.rating}</Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </Box>

                    <Box>
                      <Heading size="md" mb={3} color="#FF6600">
                        規格參數
                      </Heading>
                      <VStack gap={2} align="stretch">
                        <HStack justify="space-between">
                          <Text color="gray.400">長度：</Text>
                          <Text color="white">{selectedItem.specs.length}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.400">重量：</Text>
                          <Text color="white">{selectedItem.specs.weight}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.400">彈匣容量：</Text>
                          <Text color="white">{selectedItem.specs.capacity}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.400">初速：</Text>
                          <Text color="white">{selectedItem.specs.fps} FPS</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </SimpleGrid>

                  <Separator borderColor="whiteAlpha.200" />

                  {/* 配件清單 */}
                  <Box>
                    <Heading size="md" mb={3} color="#FF6600">
                      搭配配件
                    </Heading>
                    <SimpleGrid columns={2} gap={2}>
                      {selectedItem.accessories.map((accessory, index) => (
                        <Badge
                          key={index}
                          colorPalette="cyan"
                          variant="outline"
                          borderColor="cyan.500"
                          color="cyan.300"
                        >
                          {accessory}
                        </Badge>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Separator borderColor="whiteAlpha.200" />

                  {/* 描述 */}
                  <Box>
                    <Heading size="md" mb={3} color="#FF6600">
                      詳細描述
                    </Heading>
                    <Text color="gray.300" lineHeight="tall">
                      {selectedItem.description}
                    </Text>
                  </Box>

                  {/* 用戶資訊 */}
                  <Box>
                    <Heading size="md" mb={3} color="#FF6600">
                      分享者
                    </Heading>
                    <HStack gap={3}>
                      <Box
                        w="48px"
                        h="48px"
                        borderRadius="full"
                        bg="gray.700"
                        backgroundImage={`url(${selectedItem.user.avatar})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        borderWidth="2px"
                        borderColor="whiteAlpha.200"
                      />
                      <VStack gap={1} align="start">
                        <Text fontWeight="medium" color="white">
                          {selectedItem.user.name}
                        </Text>
                        <HStack gap={1} fontSize="sm" color="gray.500">
                          <FaCalendar />
                          <Text>分享於 {selectedItem.uploadDate}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                </VStack>
              )}
            </DialogBody>

            <DialogFooter>
              <HStack gap={3} w="full">
                <Button bg="#FF6600" color="white" _hover={{ bg: "#E65C00" }} flex={1}>
                  <Icon mr={2}>
                    <FaHeart />
                  </Icon>
                  收藏 ({selectedItem?.likes})
                </Button>
                <Button variant="outline" borderColor="whiteAlpha.400" color="white" _hover={{ bg: "whiteAlpha.100" }} flex={1}>
                  <Icon mr={2}>
                    <FaShare />
                  </Icon>
                  分享
                </Button>
              </HStack>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </>
  );
};
