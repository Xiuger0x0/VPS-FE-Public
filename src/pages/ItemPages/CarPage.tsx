import { glassmorphismStyle } from "@/styles/glassmorphism";
import {
  Box,
  Text,
  Card,
  Heading,
  HStack,
  List,
  AspectRatio,
  chakra,
} from "@chakra-ui/react";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import CaptionItemCarousel from "@/components/ItemCarousel";

const ChakraIframe = chakra("iframe");

const CarPage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t: tCommon } = useTranslation("common");
  const { t: tCar } = useTranslation("carPage");

  return (
    <>
      <Helmet>
        <title>
          {appName} | {t("page_title_car")}
        </title>
      </Helmet>

      {/* 影片嵌入 */}
      <AspectRatio maxH="560px" ratio={{ base: 1, md: 16 / 9 }}>
        <ChakraIframe
          title="msx 125 grom"
          src="https://www.youtube.com/embed/0r1v2g3h4i5j"
          allowFullScreen
          borderRadius="md"
          w="100%"
          h="100%"
        />
      </AspectRatio>

      <Box my={6}>
        {/* 簡介卡片 */}
        <Card.Root size="sm" {...glassmorphismStyle} mb={6}>
          <Card.Header>
            <Heading size="2xl">{tCommon("page_title_car")}</Heading>
          </Card.Header>
          <Card.Body>
            <Text>{tCar("introductionText")}</Text>
          </Card.Body>
        </Card.Root>

        {/* 詳細資訊卡片 */}
        <Card.Root size="sm" {...glassmorphismStyle} mb={6}>
          <Card.Header>
            <Heading size="xl">{tCar("detailsTitle")}</Heading>
          </Card.Header>
          <Card.Body>
            <HStack align="start">
              <Card.Root size="sm" w="full" {...glassmorphismStyle}>
                <Card.Body>
                  <List.Root ps="5">
                    <List.Item>{tCar("advantage1")}</List.Item>
                    <List.Item>{tCar("advantage2")}</List.Item>
                    <List.Item>{tCar("advantage3")}</List.Item>
                    <List.Item>{tCar("advantage4")}</List.Item>
                    <List.Item>{tCar("advantage5")}</List.Item>
                    <List.Item>{tCar("advantage6")}</List.Item>
                  </List.Root>
                </Card.Body>
              </Card.Root>
            </HStack>
          </Card.Body>
        </Card.Root>

        {/* 輪播 */}
        <CaptionItemCarousel
          cards={[
            {
              title: tCar("carousel.0.title"),
              text: tCar("carousel.0.text"),
              image: "/images/.jpg",
            },
            {
              title: tCar("carousel.1.title"),
              text: tCar("carousel.1.text"),
              image: "/images/.jpg",
            },
            {
              title: tCar("carousel.2.title"),
              text: tCar("carousel.2.text"),
              image: "/images/.jpg",
            },
          ]}
        />
      </Box>
    </>
  );
};

export default CarPage;
