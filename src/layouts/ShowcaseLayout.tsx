import Header from "@/components/Header";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";

/**
 * 展示頁面專用佈局 - 無 Footer，適合大量資料展示
 */
export const ShowcaseLayout = () => {
  return (
    <Flex direction="column" minH="100vh" bg="bg.canvas">
      <Toaster />
      <Header />

      {/* 主要內容區域 - 無上邊距，讓頁面自己處理 Header 間距 */}
      <Box flex="1" minH="100vh">
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Flex>
  );
};
