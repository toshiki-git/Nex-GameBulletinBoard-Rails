"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";

const PostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get("/posts/my_posts");
        setPosts(response.data.reverse());
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  if (isLoading) return <p>ローディング中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/community/${post.id}`} key={post.id}>
          <PostDisplay
            content={post.content}
            hashtags={post.hashtags}
            image={post.image_url}
            userId={post.user_id}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
