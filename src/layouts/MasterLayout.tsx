import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";

export type VisitorStats = {
  data: {
    country: string;
    activeUsers: string;
  }[];
};

export const MasterLayout = () => {
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    // 開發階段：使用靜態假資料，避免不斷打 API
    const mockData: VisitorStats = {
      data: [
        {
          country: "",
          activeUsers: "2",
        },
        {
          country: "Taiwan",
          activeUsers: "2",
        },
      ],
    };

    setVisitorStats(mockData);

    // 如果日後要恢復 fetch，只要取消註解以下程式碼即可
    /*
    fetch("/api/ga4/active-users")
      .then((response) => response.json())
      .then((data) => {
        setVisitorStats(data);
      })
      .catch((error) => {
        console.error("Error fetching visitor stats:", error);
      });
    */
  }, []);

  return (
    <Flex direction="column" minH="100vh" bg="bg.canvas">
      <Toaster />
      <Header />

      <Box
        flex="1"
        mt={16} // 配合新的 Header 高度
        minH="calc(100vh - 64px)" // 確保內容區域有足夠高度
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>

      <Footer visitorStats={visitorStats} />
    </Flex>
  );
};
