import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export const TeleLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
