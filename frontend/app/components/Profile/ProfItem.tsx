import React from "react";
import { SlCalender } from "react-icons/sl";
import ProfCSS from "./Prof.module.scss";
import { UserDataType } from "@/lib/types";
import { Avatar } from "@nextui-org/react";
import MyPostList from "../Post/MyPostList";

type ProfItemProps = {
  user: UserDataType;
};

function formatDate(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}

const ProfItem: React.FC<ProfItemProps> = ({ user }) => (
  <div className={`${ProfCSS.profArea}`}>
    <div className="flex flex-col  space-y-4 pb-4 border-b-1 pt-20">
      <div className="h-20">
        <Avatar className="w-20 h-20 text-large" src={user.image_url} />
      </div>

      <div className="items-center">
        <div className="text-xl font-bold">{user.username}</div>
        <div className="text-sm text-slate-400">{user.email}</div>
      </div>
      <div className="flex items-center">
        <SlCalender size={15} /> &nbsp;
        <div className="text-sm">
          {formatDate(user.created_at)}からNexを利用しています
        </div>
      </div>
      <p className="pt-10">過去の投稿</p>
    </div>
    <MyPostList />
  </div>
);

export default ProfItem;
