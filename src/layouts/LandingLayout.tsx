import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import { Toaster } from "@/components/ui/toaster";

export const LandingLayout = () => {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="#0f0f0f"
      color="white"
      overflow="hidden"
    >
      <Toaster />
      <LandingHeader />

      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        w="full"
        position="relative"
        zIndex={1}
      >
        <Outlet />
      </Flex>

      <LandingFooter />
    </Box>
  );
};
