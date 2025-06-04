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
    <Flex direction="column" minH="100vh">
      <Toaster />
      <Header />

      <Box
        w={{ base: "full", md: "80vw" }}
        mx="auto"
        flex="1"
        px={{ base: 2, md: 0 }}
        mt={14}
        py={2}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>

      <Footer visitorStats={visitorStats} />
    </Flex>
  );
};
