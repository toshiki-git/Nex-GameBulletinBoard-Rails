"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import headerCSS from "./Header.module.scss";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { BsBellFill, BsSearch, BsFillPersonFill } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";

const HamburgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`${headerCSS.header__hamburger}`}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            onPress={() => setMenuOpen(!isMenuOpen)}
            variant="light"
          >
            <GiHamburgerMenu size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="home" className="hover:bg-focus">
            <Link
              href="/home"
              className="flex items-center space-x-2 py-2 px-4"
            >
              <IoGameController className="text-foreground" />
              <span className="text-foreground font-bold">タイムライン</span>
            </Link>
          </DropdownItem>

          <DropdownItem key="notification" className="hover:bg-focus">
            <Link
              href="/notification"
              className="flex items-center space-x-2 py-2 px-4"
            >
              <BsBellFill className="text-foreground" />
              <span className="text-foreground font-bold">通知</span>
            </Link>
          </DropdownItem>

          <DropdownItem key="search" className="hover:bg-focus">
            <Link
              href="/search"
              className="flex items-center space-x-2 py-2 px-4"
            >
              <BsSearch className="text-foreground" />
              <span className="text-foreground font-bold">検索</span>
            </Link>
          </DropdownItem>

          <DropdownItem key="profile" className="hover:bg-focus">
            <Link
              href="/profile"
              className="flex items-center space-x-2 py-2 px-4"
            >
              <BsFillPersonFill className="text-foreground" />
              <span className="text-foreground font-bold">プロフィール</span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default HamburgerMenu;
