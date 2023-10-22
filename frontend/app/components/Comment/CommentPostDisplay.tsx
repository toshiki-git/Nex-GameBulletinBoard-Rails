"use client";
import { PostType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Spinner } from "@nextui-org/react";
import PostDisplay from "../Post/PostDisplay";

interface PostDisplayProps {
  postId: number;
}

const CommentPostDisplay: React.FC<PostDisplayProps> = ({ postId }) => {
  const [post, setPost] = useState<PostType>({} as PostType);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError("データの取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <PostDisplay
      content={post.content}
      hashtags={post.hashtags}
      image={post.image_url}
      userId={post.user_id}
    />
  );
};

export default CommentPostDisplay;
