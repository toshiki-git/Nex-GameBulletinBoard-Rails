"use client";
import React, { useState } from "react";
import PostArea from "@/app/components/Post/PostArea";
import { PostType } from "@/lib/types";
import AllPostList from "../../components/Post/AllPostList";

const Home = () => {
  const [newPost, setNewPost] = useState<PostType | undefined>();

  return (
    <div>
      <PostArea onNewPost={setNewPost} />
      <AllPostList newPost={newPost} />
    </div>
  );
};

export default Home;
