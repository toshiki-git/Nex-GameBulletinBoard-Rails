"use client";
import React, { useState } from "react";
import PostArea from "@/app/components/Post/PostArea";
import PostList from "../components/Post/PostList";
import { PostType } from "@/lib/types";

const Home = () => {
  const [newPost, setNewPost] = useState<PostType | undefined>(); // 修正された行

  return (
    <div>
      <PostArea onNewPost={setNewPost} />
      <PostList newPost={newPost} />
    </div>
  );
};

export default Home;
