"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";
import { Pagination, Spinner } from "@nextui-org/react";

interface PostListProps {
  newPost?: PostType;
}

const AllPostList: React.FC<PostListProps> = ({ newPost }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsCount, setPostsCount] = useState<number>(0);
  const pagination = 10;

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`/posts?page=${currentPage}`);
        setPosts(response.data.posts);
        setPostsCount(response.data.total_posts);
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
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
            total={Math.ceil(postsCount / pagination)}
            color="secondary"
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllPostList;
