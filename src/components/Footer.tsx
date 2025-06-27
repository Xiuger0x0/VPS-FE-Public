import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Link,
  IconButton,
  Separator,
  SimpleGrid,
  Heading,
  Badge,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaCode,
  FaRocket,
} from "react-icons/fa";
import { VisitorStats } from "@/pages/layouts/MasterLayout";

const Footer = ({ visitorStats }: { visitorStats: VisitorStats | null }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "導航",
      links: [
        { name: "首頁", href: "/" },
        { name: "關於我", href: "/about" },
        { name: "專案", href: "/project" },
        { name: "服務", href: "/service" },
      ],
    },
    {
      title: "專案",
      links: [
        { name: "物品展示", href: "/item" },
        { name: "Airsoft 管理", href: "/airsoft" },
        { name: "技術文檔", href: "/project" },
      ],
    },
    {
      title: "技術棧",
      links: [
        { name: "React + TypeScript", href: "#" },
        { name: "Kotlin + Spring Boot", href: "#" },
        { name: "Docker + MySQL", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/xiuger0x0", label: "GitHub" },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@xiuger0x0",
      label: "YouTube",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/yourprofile",
      label: "LinkedIn",
    },
    { icon: FaEnvelope, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <Box as="footer" bg="bg" borderTop="1px solid" borderColor="border">
      <Container maxW="7xl" py={12}>
        <VStack gap={8} align="stretch">
          {/* 主要內容區 */}
          <SimpleGrid columns={[1, 2, 4]} gap={8}>
            {/* 品牌介紹 */}
            <VStack align="start" gap={4}>
              <Heading size="md" color="fg">
                VPS Project
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                全端開發者的技術分享平台，專注於現代化 Web
                應用開發和創新解決方案。
              </Text>
              <HStack gap={2}>
                <Badge colorPalette="primary" size="sm">
                  <FaCode size={10} style={{ marginRight: 4 }} />
                  全端開發
                </Badge>
                <Badge colorPalette="secondary" size="sm">
                  <FaRocket size={10} style={{ marginRight: 4 }} />
                  創新技術
                </Badge>
              </HStack>
            </VStack>

            {/* 導航連結 */}
            {footerLinks.map((section) => (
              <VStack key={section.title} align="start" gap={3}>
                <Heading size="sm" color="fg">
                  {section.title}
                </Heading>
                <VStack align="start" gap={2}>
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      color="fg.muted"
                      fontSize="sm"
                      _hover={{
                        color: "primary",
                        textDecoration: "none",
                        transform: "translateX(4px)",
                      }}
                      transition="all 0.2s"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>

          <Separator />

          {/* 底部區域 */}
          <HStack justify="space-between" wrap="wrap" gap={4}>
            {/* 版權信息 */}
            <VStack align="start" gap={1}>
              <Text fontSize="sm" color="fg.muted">
                © {currentYear} VPS Project. All rights reserved.
              </Text>
              <HStack gap={1} fontSize="sm" color="fg.muted">
                <Text>Made with</Text>
                <FaHeart color="red" size={12} />
                <Text>using React + Kotlin</Text>
              </HStack>
            </VStack>

            {/* 社交連結和統計 */}
            <VStack align="end" gap={3}>
              {/* 訪客統計 */}
              {visitorStats && (
                <HStack gap={2}>
                  <Text fontSize="sm" color="fg.muted">
                    當前在線:
                  </Text>
                  <Badge colorPalette="success" size="sm">
                    {visitorStats.data[0].activeUsers}
                  </Badge>
                </HStack>
              )}

              {/* 社交連結 */}
              <HStack gap={2}>
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton
                      colorPalette="neutral"
                      variant="ghost"
                      size="sm"
                      aria-label={social.label}
                      _hover={{
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.2s"
                    >
                      <social.icon />
                    </IconButton>
                  </Link>
                ))}
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
