import { Badge, Box, Flex, HStack, Text, Timeline } from "@chakra-ui/react";

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { glassmorphismStyle } from "@/styles/glassmorphism";
// import {
//   TimelineConnector,
//   TimelineContent,
//   TimelineDescription,
//   TimelineItem,
//   TimelineRoot,
//   TimelineTitle,
// } from "@/components/ui/timeline";
import { FaBuilding, FaSchool } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { Blockquote } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

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
                <Timeline.Root maxW="600px">
                  <Timeline.Item>
                    <Timeline.Connector>
                      <FaPersonMilitaryRifle />
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title textStyle="sm">
                        <Badge
                          whiteSpace="normal"
                          wordBreak="break-word"
                          maxW="full"
                        >
                          {tAbout("timeline.military")}
                        </Badge>
                      </Timeline.Title>
                      <Timeline.Description>
                        April 2017 - April 2021
                      </Timeline.Description>
                    </Timeline.Content>
                  </Timeline.Item>

                  <Timeline.Item>
                    <Timeline.Connector>
                      <FaBuilding />
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title textStyle="sm">
                        <Badge
                          whiteSpace="normal"
                          wordBreak="break-word"
                          maxW="full"
                        >
                          {tAbout("timeline.training")}
                        </Badge>
                      </Timeline.Title>
                      <Timeline.Description>
                        June 2022 ~ October 2022
                      </Timeline.Description>
                      <Text fontSize={"xs"}>
                        {tAbout("timeline.trainingDetail")}
                      </Text>
                    </Timeline.Content>
                  </Timeline.Item>

                  <Timeline.Item>
                    <Timeline.Connector>
                      <FaSchool />
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title textStyle="sm">
                        <Badge
                          whiteSpace="normal"
                          wordBreak="break-word"
                          maxW="full"
                        >
                          {tAbout("timeline.university")}
                        </Badge>
                      </Timeline.Title>
                      <Timeline.Description>
                        June 2023 ~ {tAbout("timeline.now")}
                      </Timeline.Description>
                    </Timeline.Content>
                  </Timeline.Item>
                </Timeline.Root>

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
