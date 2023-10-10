import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts/", {
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
  }, []);

  if (isLoading) return <p>ローディング中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/community/${post.post_id}`} key={post.post_id}>
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
