"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";

interface PostListProps {
  newPost?: PostType;
}

const AllPostList: React.FC<PostListProps> = ({ newPost }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("/posts/");
        setPosts(response.data.reverse());
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

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

export default AllPostList;
