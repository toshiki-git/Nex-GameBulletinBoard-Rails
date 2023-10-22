import { Avatar, Button } from "@nextui-org/react";
import NotificationCSS from "./Notification.module.scss";
import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import axios from "@/lib/axios";
import { useState } from "react";

interface NotificationProps {
  id: number;
  image_url: string;
  content: string;
  user_id: number;
  post_id: number;
}

const NotificationItem: React.FC<NotificationProps> = ({
  id,
  image_url,
  content,
  user_id,
  post_id,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleDelete = () => {
    try {
      axios.delete(`/notifications/${id}`);
      setIsVisible(false);
    } catch {
      alert("通知の削除に失敗しました。");
    }
  };
  if (!isVisible) {
    return null;
  }
  return (
    <div style={{ position: "relative" }}>
      <Link href={`/posts/${post_id}`}>
        <div
          className={`${NotificationCSS.notificationItem} mb-2 p-4 bg-overlay rounded-sm hover:bg-primary transition-opacity duration-300 border-b border-foreground`}
        >
          <div className="flex items-center">
            <Link href={`/profiles/${user_id}`}>
              <Avatar
                className="my-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 transform"
                src={image_url}
                size="md"
              />
            </Link>

            <div className="ml-4 text-foreground">{content}</div>
          </div>
        </div>
      </Link>
      <Button
        isIconOnly
        color="danger"
        onPress={handleDelete}
        size="sm"
        radius="full"
        style={{
          position: "absolute",
          top: "5px", // 右上隅に配置
          right: "5px",
        }}
      >
        <FaTimesCircle size={25} />
      </Button>
    </div>
  );
};

export default NotificationItem;
