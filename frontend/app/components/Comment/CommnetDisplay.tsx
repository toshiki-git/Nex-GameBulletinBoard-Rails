import React from "react";
import { CommentDataType, UserDataType } from "@/lib/types";
import { Card, CardHeader, User, CardBody } from "@nextui-org/react";
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
  const { username, email, image_url } = userData;

  return (
    <Card
      className={`${postAreaCSS.postDisplay} bg-overlay p-5 rounded-md mt-4`}
    >
      <CardHeader className="flex flex-wrap">
        <User
          name={username} // 直接userDataから取得したユーザー名
          classNames={{
            wrapper: "pl-3",
            description: "text-primary",
          }}
          description={email} // ユーザーのメールアドレス
          avatarProps={{
            src: image_url, // ユーザーの画像URL
            name: "", // alt属性としてユーザー名を使用
          }}
        />
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
