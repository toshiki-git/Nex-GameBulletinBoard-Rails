import React from "react";
import postAreaCSS from "./PostArea.module.scss";
import { Card, CardBody, CardHeader, Image, User } from "@nextui-org/react";
import useGetUser from "@/app/hooks/UseGetUser";
import Link from "next/link";

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
        <Link
          href={`/profiles/${userId}`}
          className="my-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 transform"
        >
          <User
            name={userData.username}
            classNames={{
              wrapper: "pl-3",
              description: "text-primary",
              name: "text-foreground",
            }}
            description={userData.email}
            avatarProps={{
              src: userData.image_url,
              name: "",
            }}
          />
        </Link>
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
