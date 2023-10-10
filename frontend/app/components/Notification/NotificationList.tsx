import NotificationItem from "./NotificationItem";
import notificationsData from "./temporary_post_data.json";

const NotificationList = () => {
  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 p-4">
      {notificationsData.map((notification) => (
        <NotificationItem
          key={notification.id}
          content={notification.content}
          avatarSrc="https://avatars.githubusercontent.com/u/30373425?v=4"
        />
      ))}
    </div>
  );
};

export default NotificationList;
