import { Box, Flex, VStack, Text, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { Outlet, Link as RouterLink, useLocation } from "react-router";
import { FaHome, FaEdit, FaList, FaCog, FaChartBar } from "react-icons/fa";
import { ElementType } from "react";

const SidebarItem = ({ icon: IconComponent, label, to }: { icon: ElementType; label: string; to: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ChakraLink asChild _hover={{ textDecoration: "none" }}>
      <RouterLink to={to}>
        <Flex
          align="center"
          p={3}
          borderRadius="md"
          bg={isActive ? "blue.500" : "transparent"}
          color={isActive ? "white" : "fg.muted"}
          _hover={{ bg: isActive ? "blue.600" : "bg.subtle" }}
          cursor="pointer"
          transition="all 0.2s"
        >
          <Box mr={3} as="span" display="flex" alignItems="center">
            <IconComponent />
          </Box>
          <Text fontWeight="medium">{label}</Text>
        </Flex>
      </RouterLink>
    </ChakraLink>
  );
};

export const AdminLayout = () => {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="250px" bg="bg.panel" borderRight="1px solid" borderColor="border" p={5}>
        <Heading size="md" mb={8} color="blue.500">VPS Admin</Heading>

        <VStack align="stretch" gap={1}>
          <SidebarItem icon={FaChartBar} label="Dashboard" to="/admin" />

          <Text fontSize="xs" fontWeight="bold" color="fg.muted" mt={6} mb={2} textTransform="uppercase" letterSpacing="wider">
            Content Management
          </Text>
          <SidebarItem icon={FaHome} label="Home Page" to="/admin/cms/home" />
          <SidebarItem icon={FaEdit} label="About Page" to="/admin/cms/about" />
          <SidebarItem icon={FaList} label="Projects" to="/admin/cms/projects" />
          <SidebarItem icon={FaCog} label="Services" to="/admin/cms/services" />

          <Text fontSize="xs" fontWeight="bold" color="fg.muted" mt={6} mb={2} textTransform="uppercase" letterSpacing="wider">
            System
          </Text>
          <SidebarItem icon={FaList} label="System Logs" to="/admin/logs/system" />
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="bg.canvas" p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
};
