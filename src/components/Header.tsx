import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  HStack,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  MenuPositioner,
  IconButton,
  Stack,
  Drawer,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { IUser } from "@/interface/IUser";
import { useNavigate, useLocation, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { BsTranslate } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/state";

interface LinkProps {
  name: string;
  path: string;
  isDev?: boolean; // 是否為開發用連結
  children?: LinkProps[]; // 子連結
}

/**
 * 導航連結配置
 */
const Links: LinkProps[] = [
  {
    name: "首頁",
    path: "/",
  },
  {
    name: "關於我",
    path: "/about",
  },
  {
    name: "專案",
    path: "/project",
  },
  {
    name: "服務",
    path: "/service",
  },
  {
    name: "氣槍展示",
    path: "/item",
  },
  {
    name: "Airsoft",
    path: "/airsoft",
    children: [{ name: "管理面板", path: "/airsoft/dashboard" }],
  },
];

// 導航連結組件
const NavLinks = ({
  direction = "row",
  onLinkClick,
}: {
  direction?: "row" | "column";
  onLinkClick?: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDev = import.meta.env.DEV;

  const filteredLinks = Links.filter((link) => isDev || !link.isDev);
  const getFirstLevelPath = (path: string) => path.split("/")[1] || "";
  const currentPath = getFirstLevelPath(location.pathname);

  const isActive = (linkPath: string) => {
    if (linkPath === "/" && location.pathname === "/") return true;
    if (linkPath !== "/" && currentPath === getFirstLevelPath(linkPath))
      return true;
    return false;
  };

  return (
    <Stack as="nav" align="center" flexDirection={direction} gap={2}>
      {filteredLinks.map((link) =>
        link.children ? (
          <MenuRoot key={link.name}>
            <MenuTrigger>
              <Box
                px={4}
                py={2}
                cursor="pointer"
                borderRadius="md"
                fontWeight="medium"
                position="relative"
                color={isActive(link.path) ? "#FF6600" : "gray.300"}
                _hover={{
                  color: "#FF6600",
                  transform: "translateY(-1px)",
                  _after: {
                    width: "100%",
                    opacity: 0.5,
                  },
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-2px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isActive(link.path) ? "100%" : "0%",
                  height: "2px",
                  bg: "#FF6600",
                  borderRadius: "full",
                  opacity: isActive(link.path) ? 1 : 0,
                  transition: "all 0.3s ease",
                }}
                transition="all 0.2s"
              >
                {link.name}
              </Box>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent bg="#1a1a1a" borderColor="whiteAlpha.200" color="white">
                <MenuItemGroup>
                  {link.children.map((child) => (
                    <MenuItem
                      key={child.path}
                      value={child.path}
                      onClick={() => {
                        navigate(child.path);
                        onLinkClick?.();
                      }}
                      _hover={{ bg: "whiteAlpha.100", color: "#FF6600" }}
                      bg="transparent"
                      color="gray.300"
                      cursor="pointer"
                    >
                      {child.name}
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </MenuContent>
            </MenuPositioner>
          </MenuRoot>
        ) : (
          <Box
            key={link.path}
            onClick={() => {
              navigate(link.path);
              onLinkClick?.();
            }}
            px={4}
            py={2}
            cursor="pointer"
            borderRadius="md"
            fontWeight="medium"
            position="relative"
            color={isActive(link.path) ? "#FF6600" : "gray.300"}
            _hover={{
              color: "#FF6600",
              transform: "translateY(-1px)",
              _after: {
                width: "100%",
                opacity: 0.5,
              },
            }}
            _after={{
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: "50%",
              transform: "translateX(-50%)",
              width: isActive(link.path) ? "100%" : "0%",
              height: "2px",
              bg: "#FF6600",
              borderRadius: "full",
              opacity: isActive(link.path) ? 1 : 0,
              transition: "all 0.3s ease",
            }}
            transition="all 0.2s"
          >
            {link.name}
          </Box>
        )
      )}
    </Stack>
  );
};

const LanguageToggleButton = ({
  toggleLanguage,
}: {
  toggleLanguage: () => void;
}) => (
  <IconButton
    variant="ghost"
    size="sm"
    onClick={toggleLanguage}
    aria-label="切換語言"
    color="gray.400"
    _hover={{ color: "white", bg: "whiteAlpha.100" }}
  >
    <BsTranslate />
  </IconButton>
);

const UserMenu = ({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <HStack key={user.displayName} gap="4">
      <MenuRoot>
        <MenuTrigger>
          <Avatar.Root>
            <Avatar.Fallback name={user.displayName ?? ""} />
            <Avatar.Image src={user.pictureUrl ?? ""} />
          </Avatar.Root>
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent bg="#1a1a1a" borderColor="whiteAlpha.200" color="white">
            <MenuItemGroup>
              <MenuItem value="displayName" bg="transparent" color="gray.300" _hover={{ bg: "whiteAlpha.100" }}>
                <Text fontWeight="medium">
                  {t("nickname")}：{user.displayName}
                </Text>
              </MenuItem>
            </MenuItemGroup>
            <MenuSeparator borderColor="whiteAlpha.200" />
            <MenuItemGroup>
              <MenuItem
                value="logout"
                onClick={handleLogout}
                color="red.400"
                bg="transparent"
                _hover={{ bg: "whiteAlpha.100", color: "red.300" }}
              >
                {t("logout")}
              </MenuItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </MenuRoot>
    </HStack>
  );
};

function Header() {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const { i18n } = useTranslation();

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setHideHeader(true); // 向下滾動 -> 隱藏 Header
      } else {
        setHideHeader(false); // 向上滾動 -> 顯示 Header
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  // 登出清除 localStorage
  const handleLogout = () => {
    setUser({
      userId: null,
      displayName: null,
      pictureUrl: null,
      userEmail: null,
    });
    // 清除 token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // 或 navigate("/login")
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box
      position="fixed"
      top={hideHeader ? "-80px" : "0"}
      left="0"
      width="100%"
      bg="rgba(15, 15, 15, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      transition="top 0.3s ease"
      zIndex="max"
      shadow="sm"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
        px={6}
      >
        {/* 移動端菜單按鈕 */}
        <IconButton
          onClick={() => setOpen(!isOpen)}
          display={{ md: "none" }}
          color="white"
          variant="ghost"
          size="sm"
          aria-label="開啟菜單"
          _hover={{ bg: "whiteAlpha.100" }}
        >
          {isOpen ? <MdOutlineClose /> : <FiMenu />}
        </IconButton>

        {/* Logo 和導航 */}
        <HStack gap={8}>
          <Link to="/">
          {/* TODO 沒有作用的TEXT */}
            <Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #FF6600, #00FFFF)"
                bgClip="text"
              >
                VPS Project
              </Text>
            </Box>
          </Link>
          <Box display={{ base: "none", md: "block" }}>
            <NavLinks direction="row" />
          </Box>
        </HStack>

        {/* 右側功能區 */}
        <HStack gap={2}>
          <Box display={{ base: "none", md: "flex" }} gap={2}>
            <LanguageToggleButton toggleLanguage={toggleLanguage} />
          </Box>

          {user?.userEmail ? (
            <UserMenu user={user} handleLogout={handleLogout} />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              color="gray.300"
              _hover={{
                color: "#FF6600",
                bg: "whiteAlpha.100",
              }}
              onClick={handleLogin}
            >
              登入
            </Button>
          )}
        </HStack>
      </Flex>

      {/* 移動端菜單 */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setOpen(e.open)}
        placement="top"
        lazyMount
        unmountOnExit={false}
      >
        <Drawer.Backdrop bg="blackAlpha.800" backdropFilter="blur(5px)" />
        <Drawer.Positioner>
          <Drawer.Content bg="#0f0f0f" borderColor="whiteAlpha.200" color="white">
            <Drawer.Body py={6}>
              <NavLinks direction="column" onLinkClick={() => setOpen(false)} />
              <Drawer.Footer justifyContent="center" mt={6}>
                <HStack gap={4}>
                  <LanguageToggleButton toggleLanguage={toggleLanguage} />
                </HStack>
              </Drawer.Footer>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}

export default Header;
