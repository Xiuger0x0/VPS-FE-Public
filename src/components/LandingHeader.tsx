import { Box, Flex, HStack, Text, Link, IconButton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { FaGithub, FaInstagram } from "react-icons/fa";

export const LandingHeader = () => {
  return (
    <Box
      as="header"
      position="absolute"
      top={0}
      left={0}
      w="full"
      zIndex={10}
      py={8}
      px={8}
      bg="transparent"
    >
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        {/* Brand Logo */}
        <RouterLink to="/">
          <HStack gap={2}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="widest"
              color="white"
            >
              [X] XIUGER
            </Text>
          </HStack>
        </RouterLink>

        {/* Right Side Actions */}
        <HStack gap={4}>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              variant="ghost"
              color="white"
              aria-label="Instagram"
              _hover={{ bg: "whiteAlpha.200", color: "#FF6600" }}
            >
              <FaInstagram size={20} />
            </IconButton>
          </Link>
          <Link
            href="https://github.com/xiuger0x0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              variant="ghost"
              color="white"
              aria-label="GitHub"
              _hover={{ bg: "whiteAlpha.200", color: "#00FFFF" }}
            >
              <FaGithub size={20} />
            </IconButton>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};
