import React from "react";
import { BsBellFill } from "react-icons/bs";
import NotificationCSS from "./Notification.module.scss";

const NotificationIcon = () => {
  return (
    <div
      className={`${NotificationCSS.notificationIcon} flex items-center text-4xl font-bold text-foreground mt-6 mb-4`}
    >
      <BsBellFill className="mr-2" /> 通知
    </div>
  );
};

export default NotificationIcon;
