import React from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import PostList from "../Post/PostList";
import ProfCSS from "./Prof.module.scss";
import { ProfileType } from "@/lib/types";

const ProfItem = ({ user, birthday }: ProfileType) => (
  <div className={`${ProfCSS.profArea}`}>
    <div className="flex flex-col  space-y-4 pb-4 border-b-1 pt-20">
      <div className="h-20">
        <img src={user.image_url} className="rounded-full h-20" />
      </div>

      <div className="items-center">
        <div className="text-xl font-bold">{user.username}</div>
        <div className="text-sm text-slate-400">@{user.username}</div>
      </div>
      <div className="flex items-center">
        <LiaBirthdayCakeSolid size={20} />
        <div className="text-sm">誕生日:{birthday}</div>
      </div>
      <p className="pt-10">過去の投稿</p>
    </div>
    <PostList />
  </div>
);

export default ProfItem;
