import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RefineThemedLayoutHeaderProps } from "@refinedev/chakra-ui";
import { useGetIdentity, useGetLocale } from "@refinedev/core";
import {
  IconLanguage,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMoon,
  IconSun,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  isSiderOpen,
  onToggleSiderClick,
  toggleSiderIcon: toggleSiderIconFromProps,
}) => {
  const { data: user } = useGetIdentity<IUser>();

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark"
  );

  const locale = useGetLocale();
  const currentLocale = locale();
  const { locales } = useRouter();

  const hasSidebarToggle = Boolean(onToggleSiderClick);

  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent={
        hasSidebarToggle
          ? { base: "flex-end", md: "space-between" }
          : "flex-end"
      }
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      {hasSidebarToggle && (
        <IconButton
          display={{ base: "none", md: "flex" }}
          backgroundColor="transparent"
          aria-label="sidebar-toggle"
          onClick={() => onToggleSiderClick?.()}
        >
          {toggleSiderIconFromProps?.(Boolean(isSiderOpen)) ??
            (isSiderOpen ? (
              <Icon as={IconLayoutSidebarLeftCollapse} boxSize={"24px"} />
            ) : (
              <Icon as={IconLayoutSidebarLeftExpand} boxSize={"24px"} />
            ))}
        </IconButton>
      )}

      <HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<IconLanguage />}
            variant="ghost"
          />
          <MenuList>
            {[...(locales ?? [])].sort().map((lang: string) => (
              <MenuItem
                key={lang}
                as={Link}
                href="/"
                locale={lang}
                color={lang === currentLocale ? "green" : undefined}
                icon={
                  <Avatar src={`/images/flags/${lang}.svg`} h={18} w={18} />
                }
              >
                {lang === "en" ? "English" : "German"}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <IconButton
          variant="ghost"
          aria-label="Toggle theme"
          onClick={toggleColorMode}
        >
          <Icon
            as={colorMode === "light" ? IconMoon : IconSun}
            w="24px"
            h="24px"
          />
        </IconButton>

        {(user?.avatar || user?.name) && (
          <HStack>
            {user?.name && (
              <Text size="sm" fontWeight="bold">
                {user.name}
              </Text>
            )}
            <Avatar size="sm" name={user?.name} src={user?.avatar} />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};
