"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import NotificationItem from "./NotificationItem";
import { NotificationDataType } from "@/lib/types";

const NotificationList = () => {
  // 状態に通知のリストを保持します。
  const [notifications, setNotifications] = useState<NotificationDataType[]>(
    []
  );

  useEffect(() => {
    // この関数は、APIから通知を取得します。
    const fetchNotifications = async () => {
      try {
        // あなたのAPIエンドポイントに変更してください。
        const response = await axios.get("/notifications");

        setNotifications(response.data);
      } catch (error) {
        console.error("There was an error fetching the notifications!", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 p-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          content={notification.content}
          image_url={notification.actor.image_url}
          user_id={notification.actor.id}
          post_id={notification.post_id}
        />
      ))}
    </div>
  );
};

export default NotificationList;
