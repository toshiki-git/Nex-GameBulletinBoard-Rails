import React from "react";
import { CommentDataType, UserDataType } from "@/lib/types";
import { Card, CardHeader, User, CardBody, Link } from "@nextui-org/react";
import postAreaCSS from "@/app/components/Post/PostArea.module.scss";

interface CommentDisplayProps {
  comment: CommentDataType;
  userData: UserDataType; // このプロパティは各コメントに結びついているユーザーデータです。
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({
  comment,
  userData,
}) => {
  // userDataオブジェクトから必要な情報を取得します。
  const { id, username, email, image_url } = userData;

  return (
    <Card
      className={`${postAreaCSS.postDisplay} bg-overlay p-5 rounded-md mt-4`}
    >
      <CardHeader className="flex flex-wrap">
        <Link
          href={`/profiles/${id}`}
          className="my-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 transform"
        >
          <User
            name={username}
            classNames={{
              wrapper: "pl-3",
              description: "text-primary",
              name: "text-foreground",
            }}
            description={email}
            avatarProps={{
              src: image_url,
              name: "",
            }}
          />
        </Link>
      </CardHeader>
      <CardBody>
        <div className="mb-2 text-foreground">
          <p>{comment.content}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentDisplay;
