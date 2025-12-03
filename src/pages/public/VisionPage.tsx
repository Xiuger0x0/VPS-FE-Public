import { VStack, Heading, Text, LinkBox, LinkOverlay, Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router";

export const VisionPage = () => {
  const sections = [
    {
      title: "PHOTOGRAPHY",
      subtitle: "Capturing Moments",
      link: "/photography",
      color: "#FF6600", // Brand Orange
    },
    {
      title: "FPV",
      subtitle: "First Person View",
      link: "/airsoft",
      color: "#00FFFF", // Brand Cyan
    },
  ];

  return (
    <>
      <Helmet>
        <title>XIUGER | VISION</title>
      </Helmet>
      <Box bg="#0f0f0f" minH="calc(100vh - 64px)" p={8} display="flex" alignItems="center" justifyContent="center">
        <VStack gap={8} w="full" maxW="4xl">
            {sections.map((section) => (
                <LinkBox
                    key={section.title}
                    as="article"
                    w="full"
                    h="300px"
                    borderWidth="1px"
                    borderColor="whiteAlpha.300"
                    borderRadius="xl"
                    position="relative"
                    overflow="hidden"
                    transition="all 0.3s"
                    className="group"
                    _hover={{
                        borderColor: section.color,
                        transform: "scale(1.02)",
                        boxShadow: `0 0 30px ${section.color}40`,
                        bg: "whiteAlpha.100"
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="whiteAlpha.50"
                >
                    <VStack zIndex={1} gap={4}>
                        <Heading 
                            size="4xl" 
                            color="white" 
                            transition="color 0.3s"
                            _groupHover={{ color: section.color }}
                        >
                            <LinkOverlay asChild>
                                <RouterLink to={section.link}>{section.title}</RouterLink>
                            </LinkOverlay>
                        </Heading>
                        <Text 
                            color="gray.400" 
                            fontSize="2xl" 
                            letterSpacing="widest"
                            transition="color 0.3s"
                            _groupHover={{ color: "white" }}
                        >
                            {section.subtitle}
                        </Text>
                    </VStack>
                </LinkBox>
            ))}
        </VStack>
      </Box>
    </>
  );
};
