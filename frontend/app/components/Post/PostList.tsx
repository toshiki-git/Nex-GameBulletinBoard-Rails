"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";

interface PostListProps {
  results?: PostType[];
}

const PostList: React.FC<PostListProps> = ({ results }) => {
  const [posts, setPosts] = useState<PostType[]>(results || []);
  const [isLoading, setIsLoading] = useState<boolean>(!results);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!results) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get("/posts/my_posts", {
            params: {
              limit: 10,
              offset: 0,
            },
          });
          setPosts(response.data);
        } catch (err) {
          setError("データの取得に失敗しました。");
          console.error("Error fetching posts:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }
  }, [results]);

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
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
