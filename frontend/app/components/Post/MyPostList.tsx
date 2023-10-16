"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";
import { Pagination } from "@nextui-org/react";

const PostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get(`/posts/my_posts?page=${currentPage}`);
        setPosts(response.data);
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyPosts();
    window.scrollTo(0, 0);
  }, [currentPage]);

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
      <div className="flex flex-col gap-5 justify-center items-center mt-4">
        <div className="flex justify-center w-full">
          <Pagination
            showControls
            total={10}
            color="secondary"
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PostList;
