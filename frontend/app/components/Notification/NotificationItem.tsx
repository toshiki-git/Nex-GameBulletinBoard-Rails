import { Avatar } from "@nextui-org/react";
import NotificationCSS from "./Notification.module.scss";
import { UserDataType } from "@/lib/types"; // 適切なパスに置き換えてください

interface NotificationProps {
  image_url: string;
  content: string;
}

const NotificationItem: React.FC<NotificationProps> = ({
  image_url,
  content,
}) => {
  return (
    <div
      className={`${NotificationCSS.notificationItem} mb-2 p-4 bg-overlay rounded-sm hover:bg-primary transition-opacity duration-300 border-b border-foreground`}
    >
      <div className="flex items-center">
        <Avatar
          className="my-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 transform"
          src={image_url}
          size="md"
        />

        <div className="ml-4 text-foreground">{content}</div>
      </div>
    </div>
  );
};

export default NotificationItem;
