"use client";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import NotificationCSS from "./Notification.module.scss";

interface NotificationProps {
  content: string;
  avatarSrc: string;
}

const NotificationItem: React.FC<NotificationProps> = ({
  content,
  avatarSrc,
}) => (
  <div
    className={`${NotificationCSS.notificationItem} mb-2 p-4 bg-overlay rounded-sm hover:bg-primary transition-opacity duration-300 border-b border-foreground`}
  >
    <div className="flex items-center">
      <Link href="/profile">
        <Avatar
          className="my-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 transform"
          src={avatarSrc}
          size="md"
        />
      </Link>
      <Link href="/###">
        <div className="ml-4 text-foreground">{content}</div>
      </Link>
    </div>
  </div>
);

export default NotificationItem;
