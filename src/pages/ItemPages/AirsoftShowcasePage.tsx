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
      <Box bg="bg.canvas" minH="100vh">
        {/* 置頂搜尋與過濾區域 */}
        <Box
          position="sticky"
          top="0"
          zIndex={100}
          bg="bg.canvas"
          borderBottom="1px solid"
          borderColor="border"
          py={6}
          mt={"60px"}
          shadow="sm"
        >
          <Container maxW="7xl">
            <VStack gap={6} align="stretch">
              {/* 搜尋欄 */}
              <Box maxW="2xl" mx="auto" w="full">
                <HStack gap={3} p={4} bg="bg" borderRadius="xl" shadow="sm">
                  <Icon color="fg.muted" fontSize="xl">
                    <FaSearch />
                  </Icon>
                  <Input
                    placeholder="搜尋氣槍名稱、品牌或型號..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="subtle"
                    size="lg"
                    flex={1}
                  />
                </HStack>
              </Box>

              {/* 過濾選項 */}
              <HStack justify="center" wrap="wrap" gap={4}>
                {/* 武器分類 */}
                <HStack gap={2}>
                  <Text fontSize="sm" fontWeight="medium" color="fg.muted">
                    分類:
                  </Text>
                  <HStack gap={1}>
                    {updateCategoryCounts().map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "solid" : "outline"
                        }
                        colorPalette={
                          selectedCategory === category.id
                            ? "primary"
                            : "neutral"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon mr={1}>
                          <category.icon />
                        </Icon>
                        {category.name}
                        <Badge ml={1} size="sm">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </HStack>
                </HStack>

                <Separator orientation="vertical" h="6" />

                {/* 動力類型 */}
                <HStack gap={2}>
                  <Text fontSize="sm" fontWeight="medium" color="fg.muted">
                    動力:
                  </Text>
                  <HStack gap={1}>
                    <Button
                      variant={
                        selectedPowerType === "all" ? "solid" : "outline"
                      }
                      colorPalette={
                        selectedPowerType === "all" ? "primary" : "neutral"
                      }
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
                            : "outline"
                        }
                        colorPalette={
                          selectedPowerType === powerType.id
                            ? "primary"
                            : "neutral"
                        }
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

                <Separator orientation="vertical" h="6" />

                {/* 結果統計 */}
                <Text fontSize="sm" color="fg.muted">
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
                bg="bg"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                shadow="sm"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg",
                  backdropFilter: "blur(15px)",
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
                    <Badge colorPalette="warning" size="sm">
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
                    <Heading size="sm" color="fg" lineClamp={1}>
                      {item.title}
                    </Heading>
                    <Text color="fg.muted" fontSize="sm">
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
              <Spinner size="lg" colorPalette="primary" />
            </Flex>
          )}

          {!hasMore && (
            <Text textAlign="center" mt={8} color="fg.muted">
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
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedItem?.title}</DialogTitle>
              <DialogCloseTrigger asChild>
                <Button variant="ghost" size="sm">
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
                      <Heading size="md" mb={3} color="fg">
                        基本資訊
                      </Heading>
                      <VStack gap={2} align="stretch">
                        <HStack justify="space-between">
                          <Text color="fg.muted">品牌：</Text>
                          <Text color="fg">{selectedItem.brand}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="fg.muted">型號：</Text>
                          <Text color="fg">{selectedItem.model}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="fg.muted">價格：</Text>
                          <Text color="primary.500" fontWeight="bold">
                            {selectedItem.price}
                          </Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="fg.muted">評分：</Text>
                          <HStack>
                            <Icon color="warning.500">
                              <FaStar />
                            </Icon>
                            <Text color="fg">{selectedItem.rating}</Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </Box>

                    <Box>
                      <Heading size="md" mb={3} color="fg">
                        規格參數
                      </Heading>
                      <VStack gap={2} align="stretch">
                        <HStack justify="space-between">
                          <Text color="fg.muted">長度：</Text>
                          <Text color="fg">{selectedItem.specs.length}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="fg.muted">重量：</Text>
                          <Text color="fg">{selectedItem.specs.weight}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="fg.muted">彈匣容量：</Text>
                          <Text color="fg">{selectedItem.specs.capacity}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="fg.muted">初速：</Text>
                          <Text color="fg">{selectedItem.specs.fps} FPS</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </SimpleGrid>

                  <Separator />

                  {/* 配件清單 */}
                  <Box>
                    <Heading size="md" mb={3} color="fg">
                      搭配配件
                    </Heading>
                    <SimpleGrid columns={2} gap={2}>
                      {selectedItem.accessories.map((accessory, index) => (
                        <Badge
                          key={index}
                          colorPalette="primary"
                          variant="outline"
                        >
                          {accessory}
                        </Badge>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Separator />

                  {/* 描述 */}
                  <Box>
                    <Heading size="md" mb={3} color="fg">
                      詳細描述
                    </Heading>
                    <Text color="fg.muted" lineHeight="tall">
                      {selectedItem.description}
                    </Text>
                  </Box>

                  {/* 用戶資訊 */}
                  <Box>
                    <Heading size="md" mb={3} color="fg">
                      分享者
                    </Heading>
                    <HStack gap={3}>
                      <Box
                        w="48px"
                        h="48px"
                        borderRadius="full"
                        bg="neutral.200"
                        backgroundImage={`url(${selectedItem.user.avatar})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                      />
                      <VStack gap={1} align="start">
                        <Text fontWeight="medium" color="fg">
                          {selectedItem.user.name}
                        </Text>
                        <HStack gap={1} fontSize="sm" color="fg.muted">
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
              <HStack gap={3}>
                <Button colorPalette="primary" flex={1}>
                  <Icon mr={2}>
                    <FaHeart />
                  </Icon>
                  收藏 ({selectedItem?.likes})
                </Button>
                <Button variant="outline" colorPalette="neutral" flex={1}>
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
