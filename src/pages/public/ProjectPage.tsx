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
  Link,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
import {
  FaCode,
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaMobile,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// 專案資料
/**
 {
  id: string,           // 專案唯一標識
  title: string,        // 專案標題
  description: string,  // 專案描述
  status: string,       // 專案狀態
  statusColor: string,  // 狀態顏色
  image: string,        // 專案圖片
  technologies: [],     // 技術棧陣列
  features: [],         // 功能特色陣列
  github: string,       // GitHub 連結
  demo: string,         // 預覽連結
  startDate: string,    // 開始日期
  category: string,     // 專案分類
}
 */
const PROJECTS_DATA = [
  {
    id: "vps-project",
    title: "VPS 全端專案",
    description:
      "一個完整的全端 Web 應用，包含前端 React、後端 Spring Boot 和 Docker 部署",
    status: "進行中",
    statusColor: "warning",
    image:
      "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React", icon: FaReact, color: "info" },
      { name: "Spring Boot", icon: FaCode, color: "success" },
      { name: "Docker", icon: FaDatabase, color: "primary" },
    ],
    features: ["響應式設計", "用戶認證系統", "RESTful API", "Docker 容器化"],
    github: "https://github.com/xiuger0x0/VPS-Project",
    demo: "#",
    startDate: "2024-01",
    category: "全端開發",
  },
  {
    id: "airsoft-manager",
    title: "Airsoft 管理系統",
    description: "專為 Airsoft 愛好者設計的裝備管理和戰術規劃應用",
    status: "規劃中",
    statusColor: "info",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React", icon: FaReact, color: "info" },
      { name: "Node.js", icon: FaNodeJs, color: "success" },
      { name: "MongoDB", icon: FaDatabase, color: "primary" },
    ],
    features: ["裝備庫存管理", "戰術地圖規劃", "團隊協作功能", "數據統計分析"],
    github: "#",
    demo: "#",
    startDate: "2024-03",
    category: "專案管理",
  },
  {
    id: "mobile-app",
    title: "行動應用開發",
    description: "跨平台行動應用，提供便捷的生活服務功能",
    status: "已完成",
    statusColor: "success",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React Native", icon: FaMobile, color: "info" },
      { name: "Firebase", icon: FaDatabase, color: "warning" },
    ],
    features: ["原生性能", "離線功能", "推送通知", "社交分享"],
    github: "#",
    demo: "#",
    startDate: "2023-08",
    category: "行動開發",
  },
  {
    id: "portfolio-website",
    title: "個人作品集網站",
    description: "展示個人技能和專案的現代化作品集網站",
    status: "已完成",
    statusColor: "success",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React", icon: FaReact, color: "info" },
      { name: "TypeScript", icon: FaCode, color: "primary" },
    ],
    features: ["響應式設計", "動畫效果", "SEO 優化", "快速載入"],
    github: "#",
    demo: "#",
    startDate: "2023-05",
    category: "前端開發",
  },
];

// 專案分類
const PROJECT_CATEGORIES = [
  { id: "all", name: "全部專案", count: PROJECTS_DATA.length },
  {
    id: "全端開發",
    name: "全端開發",
    count: PROJECTS_DATA.filter((p) => p.category === "全端開發").length,
  },
  {
    id: "前端開發",
    name: "前端開發",
    count: PROJECTS_DATA.filter((p) => p.category === "前端開發").length,
  },
  {
    id: "行動開發",
    name: "行動開發",
    count: PROJECTS_DATA.filter((p) => p.category === "行動開發").length,
  },
  {
    id: "專案管理",
    name: "專案管理",
    count: PROJECTS_DATA.filter((p) => p.category === "專案管理").length,
  },
];

export const ProjectPage: React.FC = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // 根據分類過濾專案
  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  // 滾動到指定專案
  const scrollToProject = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const projectWidth = container.scrollWidth / filteredProjects.length;
      container.scrollTo({
        left: projectWidth * index,
        behavior: "smooth",
      });
      setCurrentProjectIndex(index);
    }
  };

  // 處理滾動事件
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const projectWidth = container.scrollWidth / filteredProjects.length;
      const currentIndex = Math.round(container.scrollLeft / projectWidth);
      setCurrentProjectIndex(currentIndex);
    }
  };

  // 左右導航
  const scrollLeft = () => {
    const newIndex = Math.max(0, currentProjectIndex - 1);
    scrollToProject(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(
      filteredProjects.length - 1,
      currentProjectIndex + 1
    );
    scrollToProject(newIndex);
  };

  return (
    <>
      <Helmet>
        <title>{appName} | 專案作品</title>
        <meta
          name="description"
          content="探索我的技術專案，從全端開發到行動應用，展現創新與技術的完美結合"
        />
      </Helmet>

      <Box bg="bg.canvas" minH="100vh">
        {/* Hero Section */}
        <Container maxW="7xl" py={12}>
          <VStack gap={8} align="stretch">
            <Box textAlign="center">
              <Heading
                size="3xl"
                bgGradient="linear(to-r, primary.500, secondary.500)"
                bgClip="text"
                mb={4}
              >
                專案作品
              </Heading>
              <Text fontSize="lg" color="fg.muted" maxW="2xl" mx="auto">
                用代碼編織夢想，用技術創造價值。每個專案都是一次探索，每行代碼都承載著創新的可能。
              </Text>
            </Box>

            {/* 分類導航 */}
            <Box>
              <HStack justify="center" wrap="wrap" gap={3}>
                {PROJECT_CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      activeCategory === category.id ? "solid" : "outline"
                    }
                    colorPalette={
                      activeCategory === category.id ? "primary" : "neutral"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Container>

        {/* 橫向捲軸專案展示 */}
        <Box position="relative" py={8}>
          {/* 左右導航按鈕 */}
          <Button
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            colorPalette="neutral"
            variant="solid"
            size="lg"
            borderRadius="full"
            onClick={scrollLeft}
            disabled={currentProjectIndex === 0}
          >
            <Icon>
              <FaChevronLeft />
            </Icon>
          </Button>

          <Button
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            colorPalette="neutral"
            variant="solid"
            size="lg"
            borderRadius="full"
            onClick={scrollRight}
            disabled={currentProjectIndex === filteredProjects.length - 1}
          >
            <Icon>
              <FaChevronRight />
            </Icon>
          </Button>

          {/* 專案捲軸容器 */}
          <Box
            ref={scrollContainerRef}
            display="flex"
            overflowX="auto"
            overflowY="hidden"
            gap={6}
            px={8}
            py={4}
            css={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            onScroll={handleScroll}
          >
            {filteredProjects.map((project, index) => (
              <Box
                key={project.id}
                minW="400px"
                maxW="400px"
                css={{ scrollSnapAlign: "center" }}
              >
                <Card.Root
                  key={index}
                  h="full"
                  shadow="lg"
                  _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                  transition="all 0.3s"
                >
                  <Card.Body p={0}>
                    {/* 專案圖片 */}
                    <Box position="relative" overflow="hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        w="full"
                        h="200px"
                        objectFit="cover"
                      />
                      <Box position="absolute" top={3} right={3}>
                        <Badge colorPalette={project.statusColor} size="sm">
                          {project.status}
                        </Badge>
                      </Box>
                    </Box>

                    {/* 專案內容 */}
                    <VStack gap={4} p={6} align="stretch">
                      <Box>
                        <Heading size="lg" color="fg" mb={2}>
                          {project.title}
                        </Heading>
                        <Text color="fg.muted" fontSize="sm" lineHeight="tall">
                          {project.description}
                        </Text>
                      </Box>

                      {/* 技術標籤 */}
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="fg"
                          mb={2}
                        >
                          技術棧
                        </Text>
                        <HStack wrap="wrap" gap={2}>
                          {project.technologies.map((tech, techIndex) => (
                            <HStack key={techIndex} gap={1}>
                              <Icon color={`${tech.color}.500`} boxSize={4}>
                                <tech.icon />
                              </Icon>
                              <Text fontSize="xs" color="fg.muted">
                                {tech.name}
                              </Text>
                            </HStack>
                          ))}
                        </HStack>
                      </Box>

                      {/* 功能特色 */}
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="fg"
                          mb={2}
                        >
                          主要功能
                        </Text>
                        <VStack gap={1} align="stretch">
                          {project.features
                            .slice(0, 3)
                            .map((feature, featureIndex) => (
                              <Text
                                key={featureIndex}
                                fontSize="xs"
                                color="fg.muted"
                              >
                                • {feature}
                              </Text>
                            ))}
                        </VStack>
                      </Box>

                      {/* 操作按鈕 */}
                      <HStack gap={3} pt={2}>
                        <Button
                          asChild
                          variant="outline"
                          colorPalette="neutral"
                          size="sm"
                          flex={1}
                        >
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon mr={2}>
                              <FaGithub />
                            </Icon>
                            源碼
                          </Link>
                        </Button>
                        <Button
                          asChild
                          colorPalette="primary"
                          size="sm"
                          flex={1}
                        >
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon mr={2}>
                              <FaExternalLinkAlt />
                            </Icon>
                            預覽
                          </Link>
                        </Button>
                      </HStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </Box>
            ))}
          </Box>

          {/* 快速導航點 */}
          <HStack justify="center" mt={6} gap={2}>
            {filteredProjects.map((_, index) => (
              <Box
                key={index}
                w={3}
                h={3}
                borderRadius="full"
                bg={
                  index === currentProjectIndex ? "primary.500" : "neutral.300"
                }
                cursor="pointer"
                transition="all 0.2s"
                onClick={() => scrollToProject(index)}
                _hover={{
                  bg:
                    index === currentProjectIndex
                      ? "primary.600"
                      : "neutral.400",
                }}
              />
            ))}
          </HStack>
        </Box>

        {/* 專案統計 */}
        <Container maxW="7xl" py={12}>
          <Box textAlign="center">
            <Heading size="lg" mb={8} color="fg">
              專案成果
            </Heading>
            <HStack justify="center" gap={12} wrap="wrap">
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="primary.500">
                  {PROJECTS_DATA.length}
                </Text>
                <Text color="fg.muted">總專案數</Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="success.500">
                  {PROJECTS_DATA.filter((p) => p.status === "已完成").length}
                </Text>
                <Text color="fg.muted">已完成</Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="warning.500">
                  {PROJECTS_DATA.filter((p) => p.status === "進行中").length}
                </Text>
                <Text color="fg.muted">進行中</Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="info.500">
                  {PROJECTS_DATA.filter((p) => p.status === "規劃中").length}
                </Text>
                <Text color="fg.muted">規劃中</Text>
              </VStack>
            </HStack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectPage;
