"use client";
import {
  User,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";

import { GrMoreVertical } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import {
  BsFillPersonFill,
  BsMoonStarsFill,
  BsFillSunFill,
  BsBellFill,
  BsSearch,
} from "react-icons/bs";
import { IoSettingsSharp, IoGameController } from "react-icons/io5";
import { useTheme } from "next-themes";
import React from "react";

import useSwitchTheme from "@/app/utils/theme";
import Link from "next/link";
//import useGetMe from "@/hooks/UserMe";
import headerCSS from "./Header.module.scss";
import MenuTab from "./HeaderItem";
import AccoutModal from "./AccoutModal";

const headerItemList = [
  {
    id: 1,
    name: "タイムライン",
    icon: <IoGameController />,
    url: "/home",
  },
  {
    id: 2,
    name: "通知",
    icon: <BsBellFill />,
    url: "/notification",
  },
  {
    id: 3,
    name: "検索",
    icon: <BsSearch />,
    url: "/search",
  },
  {
    id: 4,
    name: "プロフィール",
    icon: <BsFillPersonFill />,
    url: "/profile",
  },
];

const HeaderItem = () => {
  const headerReactNodeList = headerItemList.map((headerItem) => (
    <MenuTab
      key={headerItem.id}
      name={headerItem.name}
      icon={headerItem.icon}
      url={headerItem.url}
    />
  ));

  return headerReactNodeList;
};

const Header = () => {
  const { theme, setTheme } = useTheme();
  //const switchTheme = useSwitchTheme();
  //const { userData } = useGetMe();
  const {
    isOpen: isAccountModalOpen,
    onOpen: openAccountModal,
    onClose: closeAccountModal,
  } = useDisclosure();

  const {
    isOpen: isLogoutModalOpen,
    onOpen: openLogoutModal,
    onClose: closeLogoutModal,
  } = useDisclosure();

  return (
    <header className={`${headerCSS.header} bg-overlay border-slate-600`}>
      <div className={headerCSS.header__items}>
        <HeaderItem />
      </div>
      <Dropdown>
        <DropdownTrigger>
          <div className={headerCSS.header__icon}>
            <div
              className={`${headerCSS.header__icon__pc} rounded-lg my-2 py-2 px-3 hover:bg-white/[.06]`}
            >
              <User
                name="Your Name1" /* {userData.display_name} */
                classNames={{
                  wrapper: "pl-3",
                  description: "text-primary",
                }}
                description="Your Name2" /* {`@${userData.username}`} */
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
              />
              <GrMoreVertical size={20} />
            </div>
            <Avatar
              className={`my-2 w-8 h-8 ${headerCSS.header__icon__sm}`}
              src="https://avatars.githubusercontent.com/u/30373425?v=4"
              size="md"
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Static Actions">
          <DropdownItem key="profile" startContent={<BsFillPersonFill />}>
            <Link href="/profile">プロフィール</Link>
          </DropdownItem>
          <DropdownItem
            onPress={openAccountModal}
            key="edit"
            startContent={<IoSettingsSharp />}
          >
            アカウント設定
          </DropdownItem>
          <DropdownItem
            key="copy"
            onClick={useSwitchTheme()}
            startContent={
              theme === "dark" ? <BsFillSunFill /> : <BsMoonStarsFill />
            }
          >
            テーマ変更
          </DropdownItem>
          <DropdownItem
            key="delete"
            onPress={openLogoutModal}
            className="text-danger"
            color="danger"
            startContent={<TbLogout2 />}
          >
            ログアウト
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <AccoutModal isOpen={isAccountModalOpen} onClose={closeAccountModal} />
    </header>
  );
};

export default Header;
