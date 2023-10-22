"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";

interface PostListProps {
  results?: PostType[];
  newPost?: PostType;
}

const PostList: React.FC<PostListProps> = ({ results, newPost }) => {
  const [posts, setPosts] = useState<PostType[]>(results || []);
  const [isLoading, setIsLoading] = useState<boolean>(!results);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!results) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get("/posts/my_posts");
          setPosts(response.data.reverse());
        } catch (err) {
          setError("データの取得に失敗しました。");
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }
  }, [results]);

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

export default PostList;
