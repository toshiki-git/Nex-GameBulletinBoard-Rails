import React from "react";
import postAreaCSS from "./PostArea.module.scss";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Image,
  User,
} from "@nextui-org/react";
import useGetUser from "@/app/hooks/UseGetUser";

interface PostProps {
  content: string;
  hashtags: string;
  image?: string;
  userId: number;
}

const PostDisplay: React.FC<PostProps> = ({
  content,
  hashtags,
  image,
  userId,
}) => {
  const { userData } = useGetUser({ id: userId });
  return (
    <Card
      className={`${postAreaCSS.postDisplay} bg-overlay p-5 rounded-md mt-4`}
    >
      <CardHeader className="flex flex-wrap">
        <User
          name={userData.username}
          classNames={{
            wrapper: "pl-3",
            description: "text-primary",
          }}
          description={userData.email}
          avatarProps={{
            src: userData.image_url,
            name: "",
          }}
        />
      </CardHeader>
      <CardBody>
        <div className="text-primary mb-2 text-md font-semibold">
          <p>{hashtags}</p>
        </div>

        <div className="mb-2 text-foreground">
          <p>{content}</p>
        </div>
        {image && (
          <Image
            isZoomed
            width={300}
            height={200}
            className="mt-5"
            alt="投稿画像"
            src={image}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default PostDisplay;
