import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export const AirsoftLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
