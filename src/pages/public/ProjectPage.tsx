import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Icon,
  Image,
  Link,
  Tabs,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaCode,
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaMobile,
} from "react-icons/fa";

// 專案資料
const PROJECTS_DATA = [
  {
    id: "vps-project",
    title: "VPS 全端專案",
    description:
      "一個完整的全端 Web 應用，包含前端 React、後端 Spring Boot 和 Docker 部署",
    status: "進行中",
    statusColor: "orange",
    image:
      "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React", icon: FaReact, color: "blue" },
      { name: "Spring Boot", icon: FaCode, color: "green" },
      { name: "Docker", icon: FaDatabase, color: "blue" },
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
    statusColor: "cyan",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React", icon: FaReact, color: "blue" },
      { name: "Node.js", icon: FaNodeJs, color: "green" },
      { name: "MongoDB", icon: FaDatabase, color: "green" },
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
    statusColor: "green",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React Native", icon: FaMobile, color: "blue" },
      { name: "Firebase", icon: FaDatabase, color: "orange" },
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
    statusColor: "green",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=60",
    technologies: [
      { name: "React", icon: FaReact, color: "blue" },
      { name: "TypeScript", icon: FaCode, color: "blue" },
    ],
    features: ["響應式設計", "動畫效果", "SEO 優化", "快速載入"],
    github: "#",
    demo: "#",
    startDate: "2023-05",
    category: "前端開發",
  },
];

export const ProjectPage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "全端開發", "前端開發", "行動開發", "專案管理"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{`${appName} | LAB`}</title>
        <meta
          name="description"
          content="XIUGER LAB - Side Projects & Tools"
        />
      </Helmet>

      <Box bg="#0f0f0f" minH="100vh" py={20}>
        <Container maxW="7xl">
          {/* Header */}
          <VStack gap={6} mb={16} align="start">
            <Heading size="4xl" letterSpacing="widest" fontWeight="bold" color="white">
              LAB
            </Heading>
            <Text color="gray.400" fontSize="xl" maxW="2xl">
              Experiments, Tools, and Side Projects.
            </Text>

            {/* Filter Tabs */}
            <Tabs.Root
              value={selectedCategory}
              onValueChange={(e) => setSelectedCategory(e.value)}
              variant="line"
              colorPalette="cyan"
            >
              <Tabs.List bg="transparent" borderBottomColor="whiteAlpha.200">
                {categories.map((cat) => (
                  <Tabs.Trigger
                    key={cat}
                    value={cat}
                    color="gray.400"
                    _selected={{ color: "#00FFFF", borderColor: "#00FFFF" }}
                    _hover={{ color: "white" }}
                  >
                    {cat}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          </VStack>

          {/* Projects Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {filteredProjects.map((project) => (
              <Box
                key={project.id}
                bg="whiteAlpha.50"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{
                  borderColor: "#00FFFF",
                  transform: "translateY(-5px)",
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
                  bg: "whiteAlpha.100",
                }}
                display="flex"
                flexDirection="column"
              >
                {/* Image */}
                <Box position="relative" h="200px" overflow="hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                  <Box position="absolute" top={4} right={4}>
                    <Badge colorPalette={project.statusColor} variant="solid">
                      {project.status}
                    </Badge>
                  </Box>
                </Box>

                {/* Content */}
                <VStack p={6} align="start" gap={4} flex="1">
                  <VStack align="start" gap={2}>
                    <Heading size="lg" color="white">
                      {project.title}
                    </Heading>
                    <Text color="gray.400" fontSize="sm" lineHeight="tall">
                      {project.description}
                    </Text>
                  </VStack>

                  {/* Tech Stack */}
                  <HStack wrap="wrap" gap={2}>
                    {project.technologies.map((tech, index) => (
                      <HStack key={index} gap={1} bg="whiteAlpha.100" px={2} py={1} borderRadius="md">
                        <Icon color={`${tech.color}.400`} boxSize={3}>
                          <tech.icon />
                        </Icon>
                        <Text fontSize="xs" color="gray.300">
                          {tech.name}
                        </Text>
                      </HStack>
                    ))}
                  </HStack>

                  {/* Actions */}
                  <HStack gap={4} w="full" pt={4} mt="auto">
                    <Button
                      asChild
                      variant="outline"
                      borderColor="whiteAlpha.300"
                      color="white"
                      size="sm"
                      flex={1}
                      _hover={{ bg: "whiteAlpha.200", borderColor: "white" }}
                    >
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon mr={2}>
                          <FaGithub />
                        </Icon>
                        Code
                      </Link>
                    </Button>
                    <Button
                      asChild
                      bg="cyan.600"
                      color="white"
                      size="sm"
                      flex={1}
                      _hover={{ bg: "cyan.500" }}
                    >
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon mr={2}>
                          <FaExternalLinkAlt />
                        </Icon>
                        Demo
                      </Link>
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Stats Section */}
          <Box mt={24} pt={12} borderTopWidth="1px" borderColor="whiteAlpha.200">
             <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} textAlign="center">
                <VStack>
                    <Text fontSize="4xl" fontWeight="bold" color="white">
                        {PROJECTS_DATA.length}
                    </Text>
                    <Text color="gray.500" fontSize="sm" letterSpacing="wider">TOTAL PROJECTS</Text>
                </VStack>
                <VStack>
                    <Text fontSize="4xl" fontWeight="bold" color="green.400">
                        {PROJECTS_DATA.filter((p) => p.status === "已完成").length}
                    </Text>
                    <Text color="gray.500" fontSize="sm" letterSpacing="wider">COMPLETED</Text>
                </VStack>
                <VStack>
                    <Text fontSize="4xl" fontWeight="bold" color="orange.400">
                        {PROJECTS_DATA.filter((p) => p.status === "進行中").length}
                    </Text>
                    <Text color="gray.500" fontSize="sm" letterSpacing="wider">IN PROGRESS</Text>
                </VStack>
                <VStack>
                    <Text fontSize="4xl" fontWeight="bold" color="cyan.400">
                        {PROJECTS_DATA.filter((p) => p.status === "規劃中").length}
                    </Text>
                    <Text color="gray.500" fontSize="sm" letterSpacing="wider">PLANNED</Text>
                </VStack>
             </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectPage;

