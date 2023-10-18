"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";
import { Card, CardBody, Pagination, Spinner } from "@nextui-org/react";

const PostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsCount, setPostsCount] = useState<number>(0);
  const pagination = 10;

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get(`/posts/my_posts?page=${currentPage}`);
        setPosts(response.data.posts);
        setPostsCount(response.data.total_posts);
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

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  if (error) return <p>{error}</p>;

  // Check if there are no posts and render a message
  if (posts.length === 0) {
    return (
      <Card className="mt-3">
        <CardBody>
          <p>投稿はまだありません。</p>
        </CardBody>
      </Card>
    );
  }

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

export default PostList;
