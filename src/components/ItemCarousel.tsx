import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const defaultSettings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface ItemCarouselProps {
  cards: { title: string; text: string; image: string }[];
  settings?: typeof defaultSettings;
}

export default function ItemCarousel({
  cards,
  settings = defaultSettings,
}: ItemCarouselProps) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // 輪播 按鈕位置
  const top = useBreakpointValue({ base: "90%", md: "95%" });
  const side = useBreakpointValue({ base: "30%", md: "20px" });

  // 輪播容器高度
  const height = useBreakpointValue({ base: "300px", md: "600px" });

  // 文字區塊的垂直位置設定
  const captionTop = useBreakpointValue({ base: "80%", md: "80%", lg: "80%" });

  return (
    <Box
      position={"relative"}
      height={height}
      width={{ base: "95vw", md: "80vw" }}
      overflow={"hidden"}
    >
      {/* 前一張 按鈕 */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      {/* 下一張 按鈕 */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Container height={height}>
              <Stack
                position="absolute"
                transform="translate(0, -50%)"
                top={captionTop} // 動態 RWD 高度控制
              >
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
