import {
  VStack,
  Heading,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router";

export const HomePage = () => {
  const appName = import.meta.env.VITE_APP_NAME;

  const brandBlocks = [
    {
      title: "VISION",
      subtitle: "Photography & FPV",
      link: "/airsoft",
      hoverColor: "#FF6600", // Brand Orange
    },
    {
      title: "LAB",
      subtitle: "Side Projects & Tools",
      link: "/project",
      hoverColor: "#00FFFF", // Brand Cyan
    },
    {
      title: "INSIGHTS",
      subtitle: "Ventures & Blog",
      link: "/about",
      hoverColor: "#003366", // Brand Blue
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${appName} | Brand Hub`}</title>
        <meta
          name="description"
          content="XIUGER Brand Hub - Visuals, Code, Ventures."
        />
      </Helmet>

      <VStack gap={12} justify="center" align="center" w="full" h="full">
        {/* Slogan Section */}
        <VStack gap={4} textAlign="center">
          <Heading
            size="2xl"
            letterSpacing="wider"
            fontWeight="bold"
            color="white"
          >
            Visuals. Code. Ventures.
          </Heading>
        </VStack>

        {/* Navigation Cards */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 16 }}
          align="center"
          justify="center"
          w="full"
          px={4}
        >
          {brandBlocks.map((block) => (
            <LinkBox
              key={block.title}
              as="article"
              className="group"
              cursor="pointer"
              position="relative"
              w={{ base: "280px", md: "300px" }}
              h="300px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderWidth="1px"
              borderColor="whiteAlpha.300"
              borderRadius="md"
              bg="whiteAlpha.50"
              transition="all 0.3s ease"
              _hover={{
                borderColor: block.hoverColor,
                transform: "translateY(-10px)",
                boxShadow: `0 0 20px ${block.hoverColor}40`, // 40 is alpha
                bg: "whiteAlpha.100",
              }}
            >
              <VStack gap={2}>
                <Heading
                  size="xl"
                  color="white"
                  transition="color 0.3s ease"
                  _groupHover={{ color: block.hoverColor }}
                >
                  <LinkOverlay asChild>
                    <RouterLink to={block.link}>{block.title}</RouterLink>
                  </LinkOverlay>
                </Heading>
                <Text
                  fontSize="md"
                  color="gray.400"
                  letterSpacing="wide"
                  transition="color 0.3s ease"
                  _groupHover={{ color: "white" }}
                >
                  {block.subtitle}
                </Text>
              </VStack>
            </LinkBox>
          ))}
        </Flex>
      </VStack>
    </>
  );
};
