"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { PostType } from "@/lib/types";
import PostDisplay from "@/app/components/Post/PostDisplay";
import { Spinner } from "@nextui-org/react";
import CommentArea from "@/app/components/Comment/CommentArea";
import CommentDisplay from "@/app/components/Comment/CommnetDisplay";
import CommentList from "@/app/components/Comment/CommentList";

const Post = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostType>({} as PostType);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts/${params.id}`);
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
    <>
      <PostDisplay
        content={post.content}
        hashtags={post.hashtags}
        image={post.image_url}
        userId={post.user_id}
      />

      <CommentArea postId={parseInt(params.id)} />
      <CommentList postId={parseInt(params.id)} />
    </>
  );
};

export default Post;
