"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import NotificationItem from "./NotificationItem";
import { NotificationDataType } from "@/lib/types";
import { Spinner } from "@nextui-org/react";

const NotificationList = () => {
  const [notifications, setNotifications] = useState<NotificationDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/notifications");

        const validNotifications = response.data.filter(
          (notification: { post_id: number }) => notification.post_id !== null
        );

        setNotifications(validNotifications);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the notifications!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 p-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            content={notification.content}
            image_url={notification.actor.image_url}
            user_id={notification.actor.id}
            post_id={notification.post_id}
          />
        ))
      ) : (
        <p>通知はありません。</p>
      )}
    </div>
  );
};

export default NotificationList;
