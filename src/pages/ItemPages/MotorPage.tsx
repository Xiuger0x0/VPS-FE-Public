import CaptionItemCarousel from "@/components/ItemCarousel";
import {
  AspectRatio,
  Box,
  Card,
  Heading,
  HStack,
  List,
  Text,
  chakra,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { glassmorphismStyle } from "@/styles/glassmorphism";

const ChakraIframe = chakra("iframe");

const MotorPage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t: tCommon } = useTranslation("common");
  const { t: tMotor } = useTranslation("motorPage");

  return (
    <>
      <Helmet>
        <title>
          {appName} | {tCommon("page_title_motor")}
        </title>
      </Helmet>

      {/* 影片嵌入 */}
      <AspectRatio maxH="560px" ratio={{ base: 1, md: 16 / 9 }} mb={4}>
        <ChakraIframe
          title="msx 125 grom"
          src="https://www.youtube.com/embed/RuLVv4tA1Vg?si=l6rk0-4Oyncl_-uI"
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
            <Heading size="2xl">{tCommon("page_title_motor")}</Heading>
          </Card.Header>
          <Card.Body>
            <Text>{tMotor("introductionText")}</Text>
          </Card.Body>
        </Card.Root>

        {/* 詳細資訊卡片 */}
        <Card.Root size="sm" {...glassmorphismStyle} mb={6}>
          <Card.Header>
            <Heading size="xl">{tMotor("detailsTitle")}</Heading>
          </Card.Header>
          <Card.Body>
            <HStack align="start">
              <Card.Root size="sm" w="full" {...glassmorphismStyle}>
                <Card.Body>
                  <List.Root ps="5">
                    <List.Item>{tMotor("advantage1")}</List.Item>
                    <List.Item>{tMotor("advantage2")}</List.Item>
                    <List.Item>{tMotor("advantage3")}</List.Item>
                    <List.Item>{tMotor("advantage4")}</List.Item>
                    <List.Item>{tMotor("advantage5")}</List.Item>
                    <List.Item>{tMotor("advantage6")}</List.Item>
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
              title: tMotor("carousel.0.title"),
              text: tMotor("carousel.0.text"),
              image: "/images/motor_1.jpg",
            },
            {
              title: tMotor("carousel.1.title"),
              text: tMotor("carousel.1.text"),
              image: "/images/motor_2.jpg",
            },
            {
              title: tMotor("carousel.2.title"),
              text: tMotor("carousel.2.text"),
              image: "/images/motor_3.jpg",
            },
          ]}
        />
      </Box>
    </>
  );
};

export default MotorPage;
