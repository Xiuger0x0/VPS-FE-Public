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
  FaEye,
  FaTimes,
  FaStar,
  FaUser,
  FaCalendar,
  FaTag,
  FaCrosshairs,
  FaShieldAlt,
  FaBullseye,
  FaFire,
} from "react-icons/fa";

// 氣槍項目類型定義
interface AirsoftItem {
  id: string;
  title: string;
  category: string;
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

/**
 {
  id: string,              // 唯一標識
  title: string,           // 氣槍名稱
  category: string,        // 分類
  brand: string,           // 品牌
  model: string,           // 型號
  price: string,           // 價格
  rating: number,          // 評分
  likes: number,           // 喜歡數
  views: number,           // 瀏覽數
  image: string,           // 主要圖片
  user: {                  // 分享者資訊
    name: string,
    avatar: string,
  },
  uploadDate: string,      // 上傳日期
  accessories: string[],   // 配件清單
  specs: {                 // 規格參數
    length: string,
    weight: string,
    capacity: string,
    fps: string,
  },
  description: string,     // 詳細描述
}
 */
// 測試資料 - 氣槍展示
const MOCK_AIRSOFT_DATA = [
  {
    id: "1",
    title: "M4A1 戰術突擊步槍",
    category: "assault-rifle",
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
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <title>{appName} | 氣槍展示館</title>
        <meta
          name="description"
          content="探索精彩的氣槍收藏，分享您的戰術裝備，與愛好者交流心得"
        />
      </Helmet>

      <Box bg="bg.canvas" minH="100vh">
        <Container maxW="full" p={0}>
          <Flex>
            {/* 側邊欄 - 分類選擇 */}
            <Box
              w="280px"
              bg="bg"
              borderRight="1px solid"
              borderColor="border"
              minH="100vh"
              position="sticky"
              top={0}
              p={6}
            >
              <VStack gap={6} align="stretch">
                <Box>
                  <Heading size="lg" mb={4} color="fg">
                    氣槍展示館
                  </Heading>
                  <Text color="fg.muted" fontSize="sm">
                    探索精彩的氣槍收藏
                  </Text>
                </Box>

                {/* 搜尋框 */}
                <Box>
                  <HStack gap={2} p={2} bg="bg.muted" borderRadius="md">
                    <Icon color="fg.muted">
                      <FaSearch />
                    </Icon>
                    <Input
                      placeholder="搜尋氣槍..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="subtle"
                      size="sm"
                    />
                  </HStack>
                </Box>

                {/* 分類選擇 */}
                <Box>
                  <Text fontWeight="medium" color="fg" mb={3}>
                    分類篩選
                  </Text>
                  <VStack gap={2} align="stretch">
                    {updateCategoryCounts().map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "solid" : "ghost"
                        }
                        colorPalette={
                          selectedCategory === category.id
                            ? "primary"
                            : "neutral"
                        }
                        justifyContent="flex-start"
                        onClick={() => setSelectedCategory(category.id)}
                        size="sm"
                      >
                        <Icon mr={2}>
                          <category.icon />
                        </Icon>
                        {category.name}
                        <Badge ml="auto" size="sm">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* 主要內容區域 */}
            <Box flex={1} p={6}>
              {/* Pinterest 風格網格 */}
              <SimpleGrid
                columns={[1, 2, 3, 4]}
                gap={6}
                css={{
                  "& > div": {
                    breakInside: "avoid",
                  },
                }}
              >
                {filteredData.map((item, index) => (
                  <Card.Root
                    key={item.id}
                    ref={index === filteredData.length - 1 ? lastItemRef : null}
                    overflow="hidden"
                    shadow="md"
                    _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                    transition="all 0.2s"
                    cursor="pointer"
                    onClick={() => openItemModal(item)}
                  >
                    {/* 圖片區域 */}
                    <Box position="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        w="full"
                        h="200px"
                        objectFit="cover"
                      />

                      {/* 懸浮操作按鈕 */}
                      <Box
                        position="absolute"
                        top={2}
                        right={2}
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                      >
                        <HStack gap={1}>
                          <Button
                            size="xs"
                            colorPalette="neutral"
                            variant="solid"
                          >
                            <FaHeart />
                          </Button>
                          <Button
                            size="xs"
                            colorPalette="neutral"
                            variant="solid"
                          >
                            <FaShare />
                          </Button>
                        </HStack>
                      </Box>

                      {/* 評分徽章 */}
                      <Box position="absolute" bottom={2} left={2}>
                        <Badge colorPalette="warning" size="sm">
                          <Icon mr={1}>
                            <FaStar />
                          </Icon>
                          {item.rating}
                        </Badge>
                      </Box>
                    </Box>

                    {/* 卡片內容 */}
                    <Card.Body p={4}>
                      <VStack gap={3} align="stretch">
                        <Box>
                          <Heading size="sm" color="fg" mb={1} lineClamp={2}>
                            {item.title}
                          </Heading>
                          <Text color="fg.muted" fontSize="xs">
                            {item.brand} • {item.model}
                          </Text>
                        </Box>

                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="primary.500"
                        >
                          {item.price}
                        </Text>

                        {/* 用戶資訊 */}
                        <HStack gap={2}>
                          <Box
                            w="20px"
                            h="20px"
                            borderRadius="full"
                            bg="neutral.200"
                            backgroundImage={`url(${item.user.avatar})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                          />
                          <Text fontSize="xs" color="fg.muted">
                            {item.user.name}
                          </Text>
                        </HStack>

                        {/* 統計資訊 */}
                        <HStack
                          justify="space-between"
                          fontSize="xs"
                          color="fg.muted"
                        >
                          <HStack gap={1}>
                            <FaHeart />
                            <Text>{item.likes}</Text>
                          </HStack>
                          <HStack gap={1}>
                            <FaEye />
                            <Text>{item.views}</Text>
                          </HStack>
                        </HStack>
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
            </Box>
          </Flex>
        </Container>

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
                            <Text color="fg">
                              {selectedItem.specs.capacity}
                            </Text>
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
      </Box>
    </>
  );
};
