import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Container,
  SimpleGrid,
  Card,
  Badge,
  Link,
  Separator,
  Icon,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaRocket,
  FaHeart,
  FaStar,
  FaCompass,
} from "react-icons/fa";

export const HomePage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t } = useTranslation();

  const passions = [
    { name: "創造", color: "primary" },
    { name: "探索", color: "secondary" },
    { name: "自由", color: "info" },
    { name: "勇敢", color: "success" },
    { name: "夢想", color: "warning" },
    { name: "突破", color: "error" },
  ];

  const journeys = [
    {
      icon: FaRocket,
      title: "追逐夢想",
      description: "相信每個想法都有改變世界的可能，勇敢地將創意化為現實",
      link: "/project",
    },
    {
      icon: FaHeart,
      title: "熱愛生活",
      description: "在代碼與生活之間找到平衡，享受每一個創造的瞬間",
      link: "/about",
    },
    {
      icon: FaCompass,
      title: "自由探索",
      description: "用技術作為指南針，在數位世界中探索無限可能",
      link: "/service",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {appName} | {t("page_title_home")}
        </title>
        <meta
          name="description"
          content="一個追夢者的數位旅程，用勇氣與熱情在代碼世界中探索無限可能，將夢想化為現實"
        />
      </Helmet>

      <Box bg="bg.canvas" minH="100vh">
        <Container maxW="7xl" py={12}>
          {/* Hero Section */}
          <VStack gap={8} align="stretch">
            <Box textAlign="center" py={16}>
              <VStack gap={6}>
                <Box>
                  <Heading
                    size="4xl"
                    bgGradient="linear(to-r, primary.500, secondary.500)"
                    bgClip="text"
                    mb={4}
                  >
                    追夢者
                  </Heading>
                  <Heading size="xl" color="fg.muted" fontWeight="normal">
                    在代碼與夢想之間，尋找自由的靈魂
                  </Heading>
                </Box>

                <Text fontSize="lg" color="fg.muted" maxW="2xl" mx="auto">
                  相信每一行代碼都承載著改變世界的可能，
                  用勇氣與熱情，將想像化為現實，讓夢想在數位世界中綻放。
                </Text>

                <HStack gap={4} justify="center">
                  <Button asChild colorPalette="primary" size="lg">
                    <RouterLink to="/project">
                      <Icon mr={2}>
                        <FaStar />
                      </Icon>
                      探索旅程
                    </RouterLink>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    colorPalette="primary"
                    size="lg"
                  >
                    <RouterLink to="/about">認識我</RouterLink>
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Separator />

            {/* Passions Section */}
            <Box>
              <Heading size="lg" mb={6} textAlign="center" color="fg">
                內心的火焰
              </Heading>
              <HStack justify="center" wrap="wrap" gap={3}>
                {passions.map((passion) => (
                  <Badge
                    key={passion.name}
                    colorPalette={passion.color}
                    size="lg"
                    px={4}
                    py={2}
                  >
                    {passion.name}
                  </Badge>
                ))}
              </HStack>
            </Box>

            <Separator />

            {/* Journeys Section */}
            <Box>
              <Heading size="lg" mb={8} textAlign="center" color="fg">
                人生旅程
              </Heading>
              <SimpleGrid columns={[1, null, 3]} gap={6}>
                {journeys.map((journey) => (
                  <RouterLink key={journey.title} to={journey.link}>
                    <Card.Root
                      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                      transition="all 0.2s"
                      cursor="pointer"
                    >
                      <Card.Body textAlign="center">
                        <VStack gap={4}>
                          <Box
                            p={4}
                            bg="primary.muted"
                            borderRadius="full"
                            color="primary"
                          >
                            <Icon boxSize={8}>
                              <journey.icon />
                            </Icon>
                          </Box>
                          <Heading size="md" color="fg">
                            {journey.title}
                          </Heading>
                          <Text color="fg.muted" textAlign="center">
                            {journey.description}
                          </Text>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  </RouterLink>
                ))}
              </SimpleGrid>
            </Box>

            <Separator />

            {/* Contact Section */}
            <Box textAlign="center">
              <Heading size="lg" mb={4} color="fg">
                一起追夢
              </Heading>
              <Text fontSize="md" color="fg.muted" mb={6} maxW="xl" mx="auto">
                如果你也相信夢想的力量，歡迎與我分享你的故事，
                讓我們一起在這個數位世界中創造更多可能。
              </Text>
              <HStack justify="center" gap={6}>
                <Button asChild variant="ghost" size="lg">
                  <Link
                    href="https://github.com/xiuger0x0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon mr={2}>
                      <FaGithub />
                    </Icon>
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="mailto:contact@example.com">
                    <Icon mr={2}>
                      <FaEnvelope />
                    </Icon>
                    Email
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon mr={2}>
                      <FaLinkedin />
                    </Icon>
                    LinkedIn
                  </Link>
                </Button>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};
