/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { BsTranslate } from "react-icons/bs";
import { t } from "i18next";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/state";

interface LinkProps {
  name: string;
  path: string;
  isDev?: boolean; // 是否為開發用連結
  children?: LinkProps[]; // 子連結
}

/**
 * name 對應 t... 用於 i18n 翻譯
 */
const Links: LinkProps[] = [
  // 可以保留但隱藏在 UI
  // { name: "元件遊樂場", path: "/playground", isDev: true },

  // {
  //   name: "page_title_airsoft",
  //   path: "/airsoft",
  //   children: [
  //     { name: "page_title_airsoft_dashboard", path: "/airsoft/dashboard" },
  //     { name: "page_title_airsoft_equipment", path: "/airsoft/equipment" },
  //   ],
  // },
  {
    name: "page_title_telecommunication",
    path: "/telecommunication",
    children: [
      {
        name: "page_title_telecommunication_dashboard",
        path: "/telecommunication/dashboard",
      },
    ],
  },
  // {
  //   name: "page_title_project",
  //   path: "/project",
  // },
  // {
  //   name: "page_title_item",
  //   path: "/item",
  //   children: [
  //     { name: "page_title_motor", path: "/item/motorcycle" },
  //     { name: "page_title_car", path: "/item/car" },
  //   ],
  // },
  // {
  //   name: "page_title_service",
  //   path: "/service",
  // },
  // {
  //   name: "page_title_about",
  //   path: "/about",
  // },
];

// 路由清單
const NavLinks = ({
  direction = "row",
  onLinkClick,
}: {
  direction?: "row" | "column";
  onLinkClick?: () => void;
}) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const showDevLink = import.meta.env.VITE_SHOW_DEV_LINK === "true";

  const filteredLinks = Links.filter((link) => showDevLink || !link.isDev);
  const getFirstLevelPath = (path: string) => path.split("/")[1];

  return (
    <Stack as="nav" align="center" flexDirection={direction}>
      {filteredLinks.map((link) =>
        link.children ? (
          <MenuRoot key={link.name}>
            <MenuTrigger>
              <Box
                p={2}
                cursor="pointer"
                borderBottom="2px solid"
                borderBottomColor={
                  getFirstLevelPath(location.pathname) ===
                  getFirstLevelPath(link.path)
                    ? "primary"
                    : "transparent"
                }
                color={
                  getFirstLevelPath(location.pathname) ===
                  getFirstLevelPath(link.path)
                    ? "primary"
                    : "inherit"
                }
                _hover={{
                  borderBottomColor: "primary",
                  color: "primary",
                }}
              >
                {t(link.name)}
              </Box>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent>
                <MenuItemGroup>
                  {link.children.map((child) => (
                    <MenuItem
                      key={child.path}
                      value={child.path}
                      onClick={() => {
                        navigate(child.path);
                        onLinkClick?.();
                      }}
                    >
                      {t(child.name)}
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
            p={2}
            cursor="pointer"
            borderBottom="2px solid"
            borderBottomColor={
              getFirstLevelPath(location.pathname) ===
              getFirstLevelPath(link.path)
                ? "primary"
                : "transparent"
            }
            color={
              getFirstLevelPath(location.pathname) ===
              getFirstLevelPath(link.path)
                ? "primary"
                : "inherit"
            }
            _hover={{
              borderBottomColor: "primary",
              color: "primary",
            }}
          >
            {t(link.name)}
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
  <IconButton variant="ghost" rounded="full" onClick={toggleLanguage}>
    <BsTranslate />
  </IconButton>
);

const UserMenu = ({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) => (
  <HStack key={user.displayName} gap="4">
    <MenuRoot>
      <MenuTrigger>
        <Avatar.Root>
          <Avatar.Fallback name={user.displayName ?? ""} />
          <Avatar.Image src={user.pictureUrl ?? ""} />
        </Avatar.Root>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup>
            <MenuItem value="displayName">
              <Text fontWeight="medium">
                {t("nickname")}：{user.displayName}
              </Text>
            </MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup>
            <MenuItem
              value="logout"
              onClick={handleLogout}
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
            >
              {t("logout")}
            </MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  </HStack>
);

function Header() {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const { t, i18n } = useTranslation();

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
      top={hideHeader ? "-80px" : "0"} // 滑動時隱藏
      left="0"
      width="100%"
      bg={useColorModeValue("gray.100", "gray.900")}
      transition="top 0.3s ease"
      zIndex="max"
      shadow={"xs"}
    >
      <Flex
        h={14}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx={4}
      >
        {/* 開關 ICON #小裝置顯示 */}
        <IconButton
          onClick={() => setOpen(!isOpen)}
          display={{ md: "none" }}
          variant={"ghost"}
        >
          {isOpen ? <MdOutlineClose /> : <FiMenu />}
        </IconButton>

        <HStack>
          {/* <Link to={"/"}>
            <Box p={5}>
              <Text fontWeight={"bold"}>Logo</Text>
            </Box>
          </Link> */}
          <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
            <NavLinks direction="row" />
          </HStack>
        </HStack>

        <Flex gap={2}>
          <Box display={{ base: "none", md: "flex" }}>
            {/* 黑暗模式切換 */}
            {/* <ColorModeButton rounded="full"></ColorModeButton> */}
            {/* 中英切換 */}
            {/* <LanguageToggleButton toggleLanguage={toggleLanguage} /> */}
          </Box>

          {user?.userEmail ? (
            <UserMenu user={user} handleLogout={handleLogout} />
          ) : (
            <Button color={"green"} variant={"surface"} onClick={handleLogin}>
              {t("login")}
            </Button>
          )}
        </Flex>
      </Flex>

      {/* 小裝置菜單 */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setOpen(e.open)}
        placement={"top"}
        lazyMount
        unmountOnExit={false} // 避免動畫還沒跑完就卸載導致撕裂
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body>
              <NavLinks direction="column" onLinkClick={() => setOpen(false)} />
              <Drawer.Footer justifyContent="space-between">
                {/* 黑暗模式切換 */}
                <ColorModeButton rounded="full"></ColorModeButton>
                {/* 中英切換 */}
                <LanguageToggleButton toggleLanguage={toggleLanguage} />
              </Drawer.Footer>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}

export default Header;
