import { Box, Center, Text } from "@chakra-ui/react";

export const LandingFooter = () => {
  return (
    <Box
      as="footer"
      position="absolute"
      bottom={0}
      left={0}
      w="full"
      py={4}
      bg="transparent"
    >
      <Center>
        <Text fontSize="xs" color="gray.500">
          © 2025 XIUGER.
        </Text>
      </Center>
    </Box>
  );
};
