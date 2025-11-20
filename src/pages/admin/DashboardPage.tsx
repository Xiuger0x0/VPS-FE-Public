import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export const DashboardPage = () => {
  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Box p={6} bg="bg.panel" borderRadius="lg" shadow="sm" border="1px solid" borderColor="border">
            <Heading size="sm" color="fg.muted" mb={2}>Total Visits</Heading>
            <Text fontSize="3xl" fontWeight="bold">12,345</Text>
        </Box>
        <Box p={6} bg="bg.panel" borderRadius="lg" shadow="sm" border="1px solid" borderColor="border">
            <Heading size="sm" color="fg.muted" mb={2}>Active Users</Heading>
            <Text fontSize="3xl" fontWeight="bold">123</Text>
        </Box>
        <Box p={6} bg="bg.panel" borderRadius="lg" shadow="sm" border="1px solid" borderColor="border">
            <Heading size="sm" color="fg.muted" mb={2}>System Status</Heading>
            <Text fontSize="3xl" fontWeight="bold" color="green.500">Healthy</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
