import { Flex, TabsRoot, TabsList, TabsTrigger, Box } from "@chakra-ui/react";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router";
import { FaMotorcycle, FaCar } from "react-icons/fa"; // 引入圖標
import { glassmorphismStyle } from "@/styles/glassmorphism";

const tabItems = [
  { name: "motorcycle", icon: FaMotorcycle },
  { name: "car", icon: FaCar },
];

export const ItemsLayout = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const { t } = useTranslation();
  const location = useLocation(); // 獲取當前路徑

  return (
    <>
      <Helmet>
        <title>
          {appName} | {t("page_title_item")}
        </title>
      </Helmet>
      <Flex>
        <TabsRoot
          defaultValue="a"
          variant="subtle"
          orientation="vertical"
          position="fixed"
          left={4}
          top={"50%"}
          transform={"translateY(-50%)"}
          zIndex={"max"}
        >
          <TabsList p="1" gap={1} borderColor={"gray"} {...glassmorphismStyle}>
            {tabItems.map((item, index) => {
              const isActive = location.pathname.includes(item.name); // 當前頁面是否匹配

              return (
                <TabsTrigger
                  key={index}
                  value={item.name[0]}
                  asChild
                  _hover={{ bg: "primary", color: "white" }} // Hover 效果
                  color={isActive ? "white" : "inherit"}
                  bg={isActive ? "primary" : ""}
                >
                  <Link to={item.name}>
                    <item.icon />
                  </Link>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </TabsRoot>

        <Box flex={1}>
          <Suspense>
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </>
  );
};
