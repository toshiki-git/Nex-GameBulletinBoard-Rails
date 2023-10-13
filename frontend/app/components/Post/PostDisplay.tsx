import React from "react";
import postAreaCSS from "./PostArea.module.scss";
import { Avatar } from "@nextui-org/react";
import useGetMe from "@/app/hooks/UserMe";

interface PostProps {
  content: string;
  hashtags: string;
  image?: string;
}

const PostDisplay: React.FC<PostProps> = ({ content, hashtags, image }) => {
  const { userData } = useGetMe();
  return (
    <div
      className={`${postAreaCSS.postDisplay} bg-overlay p-4 rounded-md mt-4`}
    >
      <div className="post-header flex flex-wrap items-center pb-5">
        <div className="post-avatar pr-4">
          <Avatar src={userData.image_url} />
        </div>
        <div className="post-header-name flex flex-wrap items-center">
          <h3 className="font-bold pr-4">{userData.username}</h3>
          <span className="font-thin text-sm">{`@${userData.username}`}</span>
        </div>
      </div>
      <div className="mb-2 text-foreground">
        <p>{hashtags}</p>
      </div>

      <div className="mb-2 text-foreground">
        <p>{content}</p>
      </div>
      {image && (
        <div className="image-section mt-3">
          <img
            className="rounded-md w-72 h-48 object-cover"
            src={image}
            alt="投稿画像"
          />
        </div>
      )}
    </div>
  );
};

export default PostDisplay;
