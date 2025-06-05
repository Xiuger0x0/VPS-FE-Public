import {
  Flex,
  Box,
  IconButton,
  Spacer,
  Separator,
  Text,
  Link,
} from "@chakra-ui/react";
// import { FaGithub, FaYoutube } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { VisitorStats } from "@/pages/layouts/MasterLayout";

const Footer = ({ visitorStats }: { visitorStats: VisitorStats | null }) => {
  return (
    <Box as="footer" w="full" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex py={2} px={6} alignItems={"center"}>
        <Flex gap={4}></Flex>

        <Spacer />

        <Separator size="lg" color={"red"} bg={"red"} />

        <Text color={"black"}>
          {visitorStats ? visitorStats.data[0].activeUsers : ""}
        </Text>
        <Spacer />

        <Flex gap={3} alignItems={"center"}>
          <Link
            href="https://github.com/xiuger0x0"
            target="_blank"
            focusRing={"none"}
          >
            <IconButton variant="ghost" rounded="full">
              {/* <FaGithub /> */}
            </IconButton>
          </Link>

          <Separator orientation="vertical" height="4" />

          <Link
            href="https://www.youtube.com/@xiuger0x0"
            target="_blank"
            focusRing={"none"}
          >
            <IconButton variant="ghost" rounded="full">
              {/* <FaYoutube /> */}
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
