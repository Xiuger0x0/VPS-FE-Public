import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function CustomizerLayout() {
  return (
    <Box style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Outlet />
    </Box>
  );
}
