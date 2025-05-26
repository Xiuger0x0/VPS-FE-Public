import { Tooltip } from "@/components/ui/tooltip";
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { glassmorphismStyle } from "@/styles/glassmorphism";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@/components/ui/timeline";
import { FaBuilding, FaSchool } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { Blockquote } from "@chakra-ui/react";

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
      <Flex gap={4} flexDirection={"column"}>
        <Tooltip content={tAbout("tooltip.topImg")}>
          <HStack
            {...glassmorphismStyle}
            bgImage={"url('/images/about_fp.jpg')"}
            bgSize={"cover"}
            bgPos={"center"}
            bgRepeat={"no-repeat"}
            // bgAttachment={"fixed"} // 鎖定位置 好用!
            minH={"80vh"}
            alignItems={"flex-end"}
            shadow={"md"}
          >
            <Box
              {...glassmorphismStyle}
              p={4}
              m={4}
              mt={"250px"}
              w={{ base: "100%", md: "auto" }}
              rounded={"md"}
            >
              <Box>
                <TimelineRoot maxW="600px">
                  <TimelineItem>
                    <TimelineConnector>
                      <FaPersonMilitaryRifle />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle textStyle="sm">
                        <Badge
                          whiteSpace="normal"
                          wordBreak="break-word"
                          maxW="full"
                        >
                          {tAbout("timeline.military")}
                        </Badge>
                      </TimelineTitle>
                      <TimelineDescription>
                        April 2017 - April 2021
                      </TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineConnector>
                      <FaBuilding />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle textStyle="sm">
                        <Badge
                          whiteSpace="normal"
                          wordBreak="break-word"
                          maxW="full"
                        >
                          {tAbout("timeline.training")}
                        </Badge>
                      </TimelineTitle>
                      <TimelineDescription>
                        June 2022 ~ October 2022
                      </TimelineDescription>
                      <Text fontSize={"xs"}>
                        {tAbout("timeline.trainingDetail")}
                      </Text>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineConnector>
                      <FaSchool />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle textStyle="sm">
                        <Badge
                          whiteSpace="normal"
                          wordBreak="break-word"
                          maxW="full"
                        >
                          {tAbout("timeline.university")}
                        </Badge>
                      </TimelineTitle>
                      <TimelineDescription>
                        June 2023 ~ {tAbout("timeline.now")}
                      </TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                </TimelineRoot>

                <Blockquote.Root>
                  <Blockquote.Content>
                    <cite> {tAbout("philosophy")}</cite>
                  </Blockquote.Content>

                  <Blockquote.Caption></Blockquote.Caption>
                </Blockquote.Root>
              </Box>
            </Box>
          </HStack>
        </Tooltip>
      </Flex>
    </>
  );
};
