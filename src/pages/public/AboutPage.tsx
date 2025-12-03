import { Box, Container, Heading, Text, SimpleGrid, VStack, Flex } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { FaBuilding, FaSchool } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { Timeline } from "@chakra-ui/react";

// 興趣愛好資料
const INTERESTS_DATA = [
  { title: "攝影作品", desc: "捕捉生活中的美好瞬間" },
  { title: "程式專案", desc: "用代碼創造無限可能" },
  { title: "戶外探險", desc: "在自然中尋找靈感" },
  { title: "音樂創作", desc: "用旋律表達內心世界" },
  { title: "閱讀筆記", desc: "在書海中汲取智慧" },
  { title: "旅行足跡", desc: "用腳步丈量世界" },
];

// 生活照片資料
const LIFE_PHOTOS_DATA = [
  { id: 1, alt: "生活照 1", placeholder: "生活照 1" },
  { id: 2, alt: "生活照 2", placeholder: "生活照 2" },
  { id: 3, alt: "生活照 3", placeholder: "生活照 3" },
  { id: 4, alt: "生活照 4", placeholder: "生活照 4" },
];

export const AboutPage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t: tCommon } = useTranslation("common");
  const { t: tAbout } = useTranslation("aboutPage");

  return (
    <>
      <Helmet>
        <title>{`${appName} | ${tCommon("page_title_about")}`}</title>
      </Helmet>

      <Box bg="#0f0f0f" minH="100vh" color="white" py={20}>
        <Container maxW="6xl">
          {/* Header Section */}
          <VStack gap={6} mb={24} textAlign="center">
            <Heading size="4xl" letterSpacing="widest" fontWeight="bold">
              ABOUT ME
            </Heading>
            <Text color="gray.400" fontSize="xl" maxW="2xl" fontStyle="italic">
              "{tAbout("philosophy")}"
            </Text>
          </VStack>

          {/* Timeline Section */}
          <Box mb={24}>
            <Heading size="xl" mb={12} letterSpacing="wide" color="#FF6600">
              JOURNEY
            </Heading>
            <Box maxW="3xl" mx="auto">
              <Timeline.Root>
                <Timeline.Item>
                  <Timeline.Connector>
                    <Box bg="#FF6600" p={2} borderRadius="full" color="white">
                        <FaPersonMilitaryRifle size={16} />
                    </Box>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {tAbout("timeline.military")}
                      </Text>
                    </Timeline.Title>
                    <Timeline.Description color="gray.400" mt={1}>
                      April 2017 - April 2021
                    </Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                  <Timeline.Connector>
                    <Box bg="#00FFFF" p={2} borderRadius="full" color="black">
                        <FaBuilding size={16} />
                    </Box>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {tAbout("timeline.training")}
                      </Text>
                    </Timeline.Title>
                    <Timeline.Description color="gray.400" mt={1}>
                      June 2022 ~ October 2022
                    </Timeline.Description>
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      {tAbout("timeline.trainingDetail")}
                    </Text>
                  </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                  <Timeline.Connector>
                    <Box bg="#003366" p={2} borderRadius="full" color="white">
                        <FaSchool size={16} />
                    </Box>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {tAbout("timeline.university")}
                      </Text>
                    </Timeline.Title>
                    <Timeline.Description color="gray.400" mt={1}>
                      June 2023 ~ {tAbout("timeline.now")}
                    </Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline.Root>
            </Box>
          </Box>

          {/* Life Photos Section */}
          <Box mb={24}>
            <Heading size="xl" mb={12} letterSpacing="wide" color="#00FFFF">
              LIFE
            </Heading>
            <Flex direction={{ base: "column", lg: "row" }} gap={8}>
              {/* Main Photo */}
              <Box
                flex="1"
                h="500px"
                bg="whiteAlpha.50"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                position="relative"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500">Personal Photo</Text>
              </Box>

              {/* Grid Photos */}
              <Box flex="1">
                <SimpleGrid columns={2} gap={4} h="500px">
                  {LIFE_PHOTOS_DATA.map((photo) => (
                    <Box
                      key={photo.id}
                      bg="whiteAlpha.50"
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="whiteAlpha.200"
                      position="relative"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transition="all 0.3s"
                      _hover={{ borderColor: "#00FFFF", bg: "whiteAlpha.100" }}
                    >
                      <Text color="gray.500" fontSize="sm">{photo.placeholder}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Flex>
          </Box>

          {/* Interests Section */}
          <Box>
            <Heading size="xl" mb={12} letterSpacing="wide" color="#003366">
              INTERESTS
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {INTERESTS_DATA.map((item, index) => (
                <Box
                  key={index}
                  h="200px"
                  bg="whiteAlpha.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  p={6}
                  transition="all 0.3s"
                  _hover={{
                    borderColor: "#003366",
                    transform: "translateY(-5px)",
                    boxShadow: "0 0 20px rgba(0, 51, 102, 0.3)",
                    bg: "whiteAlpha.100"
                  }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <Heading size="md" mb={2} color="white">
                    {item.title}
                  </Heading>
                  <Text color="gray.400" fontSize="sm">
                    {item.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
