import { glassmorphismStyle } from "@/styles/glassmorphism";
import {
  Box,
  Link,
  Image,
  Text,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { LuRocket, LuPenTool, LuStar } from "react-icons/lu";

import Slider from "react-slick";

// 設定 Slick 的選項
const sliderSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 768, // 小於 768px 時
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// 項目資料集中定義（如：links、圖片等非語系內容）
const projectMetaList = [
  {
    id: "A_personalWebsite",
    image:
      "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=900&q=60",
    link: "#A",
  },
  {
    id: "B_travelAlbum",
    image:
      "https://images.unsplash.com/photo-1438183972690-6d4658e3290e?auto=format&fit=crop&w=2274&q=80",
    link: "#B",
  },
  {
    id: "C_travelAlbum",
    image:
      "https://images.unsplash.com/photo-1438183972690-6d4658e3290e?auto=format&fit=crop&w=2274&q=80",
    link: "#B",
  },
  {
    id: "D_travelAlbum",
    image:
      "https://images.unsplash.com/photo-1438183972690-6d4658e3290e?auto=format&fit=crop&w=2274&q=80",
    link: "#B",
  },
];

// 取得單個 project 的時間軸資料
const getProjectTimelineSteps = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, options?: any) => string,
  projectId: string,
  image: string,
  link: string
) => [
  {
    icon: <LuRocket />,
    title: t(`projects.${projectId}.timeline.start.title`),
    description: t(`projects.${projectId}.timeline.start.description`),
    period: t(`projects.${projectId}.timeline.start.period`),
  },
  {
    icon: <LuPenTool />,
    title: t(`projects.${projectId}.timeline.draft.title`),
    description: t(`projects.${projectId}.timeline.draft.description`),
    period: t(`projects.${projectId}.timeline.draft.period`),
  },
  {
    icon: <LuStar />,
    title: t(`projects.${projectId}.timeline.launch.title`),
    description: t(`projects.${projectId}.timeline.launch.description`),
    period: t(`projects.${projectId}.timeline.launch.period`),
    image,
    link,
  },
];

export const ProjectPage: React.FC = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t: tCommon } = useTranslation("common");
  const { t: tProjectPage } = useTranslation("projectPage");

  return (
    <>
      <Helmet>
        <title>
          {appName} | {tCommon("page_title_project")}
        </title>
      </Helmet>

      <Box maxW="100vw" overflow="hidden">
        <Slider {...sliderSettings}>
          {projectMetaList.map(({ id, image, link }) => (
            <Box key={id} px={2}>
              <TimelineRoot
                minH="80vh"
                maxW="900px"
                mx="auto"
                p={4}
                pr={6}
                {...glassmorphismStyle}
              >
                {getProjectTimelineSteps(tProjectPage, id, image, link).map(
                  (project, index) => (
                    <TimelineItem key={index}>
                      <TimelineConnector>{project.icon}</TimelineConnector>
                      <TimelineContent>
                        <TimelineTitle textStyle="sm">
                          {project.title}
                        </TimelineTitle>
                        <TimelineDescription>
                          {project.period && (
                            <Text mb={1} fontSize="sm" color="gray.500">
                              {project.period}
                            </Text>
                          )}
                          <Text mb={2}>{project.description}</Text>

                          {index === 2 && project.image && (
                            <Box mb={2} borderRadius="md" overflow="hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                aspectRatio={4 / 2}
                              />
                            </Box>
                          )}
                          {index === 2 && project.link && (
                            <Link
                              href={project.link}
                              color="teal.500"
                              target="_blank"
                              rel="noopener noreferrer"
                              fontWeight="bold"
                            >
                              {tProjectPage("viewProject")}
                            </Link>
                          )}
                        </TimelineDescription>
                      </TimelineContent>
                    </TimelineItem>
                  )
                )}
              </TimelineRoot>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default ProjectPage;
