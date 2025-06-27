import { Box, Flex, HStack, Text, Timeline, Badge } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { glassmorphismStyle } from "@/styles/glassmorphism";
import { FaBuilding, FaSchool } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { Blockquote } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

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
        <title>
          {appName} | {tCommon("page_title_about")}
        </title>
      </Helmet>

      {/* 全螢幕背景圖片區域 */}
      <Box position="relative" minH="100vh">
        {/* 背景圖片 */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('/images/about_fp.jpg')"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          bgAttachment="fixed"
        />

        {/* 漸變遮罩 */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-b, blackAlpha.300, blackAlpha.600, blackAlpha.800)"
        />

        {/* 內容區域 */}
        <Flex
          position="relative"
          zIndex={1}
          minH="100vh"
          alignItems="flex-end"
          p={8}
        >
          <Tooltip content={tAbout("tooltip.topImg")}>
            <Box
              {...glassmorphismStyle}
              p={8}
              borderRadius="xl"
              maxW="800px"
              w="full"
              mx="auto"
              mb={16}
            >
              {/* Timeline 區域 */}
              <Timeline.Root>
                <Timeline.Item>
                  <Timeline.Connector>
                    <FaPersonMilitaryRifle />
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>
                      <Badge
                        colorPalette="neutral"
                        size="lg"
                        whiteSpace="normal"
                        wordBreak="break-word"
                        maxW="full"
                      >
                        {tAbout("timeline.military")}
                      </Badge>
                    </Timeline.Title>
                    <Timeline.Description color="whiteAlpha.800" mt={2}>
                      April 2017 - April 2021
                    </Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                  <Timeline.Connector>
                    <FaBuilding />
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>
                      <Badge
                        colorPalette="neutral"
                        size="lg"
                        whiteSpace="normal"
                        wordBreak="break-word"
                        maxW="full"
                      >
                        {tAbout("timeline.training")}
                      </Badge>
                    </Timeline.Title>
                    <Timeline.Description color="whiteAlpha.800" mt={2}>
                      June 2022 ~ October 2022
                    </Timeline.Description>
                    <Text fontSize="sm" color="whiteAlpha.700" mt={2}>
                      {tAbout("timeline.trainingDetail")}
                    </Text>
                  </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                  <Timeline.Connector>
                    <FaSchool />
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>
                      <Badge
                        colorPalette="neutral"
                        size="lg"
                        whiteSpace="normal"
                        wordBreak="break-word"
                        maxW="full"
                      >
                        {tAbout("timeline.university")}
                      </Badge>
                    </Timeline.Title>
                    <Timeline.Description color="whiteAlpha.800" mt={2}>
                      June 2023 ~ {tAbout("timeline.now")}
                    </Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline.Root>

              {/* 個人哲學引言 */}
              <Box
                mt={8}
                pt={6}
                borderTop="1px solid"
                borderColor="whiteAlpha.300"
              >
                <Blockquote.Root>
                  <Blockquote.Content>
                    <Text
                      fontSize="lg"
                      fontStyle="italic"
                      color="whiteAlpha.900"
                      textAlign="center"
                      lineHeight="tall"
                    >
                      "{tAbout("philosophy")}"
                    </Text>
                  </Blockquote.Content>
                </Blockquote.Root>
              </Box>
            </Box>
          </Tooltip>
        </Flex>
      </Box>

      {/* 第二個區域：個人照片展示 */}
      <Box bg="bg" py={20}>
        <Box maxW="6xl" mx="auto" px={8}>
          <HStack gap={8} align="stretch">
            {/* 左側：個人照片 */}
            <Box flex="1">
              <Box
                w="full"
                h="500px"
                bg="neutral.100"
                borderRadius="2xl"
                overflow="hidden"
                position="relative"
                _dark={{ bg: "neutral.800" }}
              >
                {/* 預留照片位置 */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  textAlign="center"
                  color="neutral.400"
                >
                  <Text fontSize="sm">個人照片區域</Text>
                  <Text fontSize="xs" mt={2}>
                    [待補充照片]
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* 右側：生活照片網格 */}
            <Box flex="1">
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gap={4}
                h="500px"
              >
                {LIFE_PHOTOS_DATA.map((photo) => (
                  <Box
                    key={photo.id}
                    bg="neutral.100"
                    borderRadius="xl"
                    position="relative"
                    _dark={{ bg: "neutral.800" }}
                  >
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      textAlign="center"
                      color="neutral.400"
                    >
                      <Text fontSize="xs">{photo.placeholder}</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </HStack>
        </Box>
      </Box>

      {/* 第三個區域：興趣愛好照片展示 */}
      <Box bg="bg.subtle" py={20}>
        <Box maxW="6xl" mx="auto" px={8}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            mb={12}
            color="fg"
          >
            興趣與愛好
          </Text>

          {/* 興趣照片網格 */}
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
            {INTERESTS_DATA.map((item, index) => (
              <Box
                key={index}
                bg="bg"
                borderRadius="xl"
                overflow="hidden"
                shadow="md"
                _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                transition="all 0.3s"
              >
                <Box
                  h="200px"
                  bg="neutral.100"
                  position="relative"
                  _dark={{ bg: "neutral.800" }}
                >
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    textAlign="center"
                    color="neutral.400"
                  >
                    <Text fontSize="sm">{item.title}</Text>
                  </Box>
                </Box>
                <Box p={4}>
                  <Text fontWeight="medium" color="fg" mb={2}>
                    {item.title}
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    {item.desc}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
