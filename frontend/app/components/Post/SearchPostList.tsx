"use client";
import React, { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";
import axios from "@/lib/axios";
import { Pagination } from "@nextui-org/react";

interface SearchPostListProps {
  query: string;
}

const SearchPostList: React.FC<SearchPostListProps> = ({ query }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsCount, setPostsCount] = useState<number>(1);
  const pagination = 10;

  useEffect(() => {
    setCurrentPage(1);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `posts/search?query=${query}&page=${currentPage}`
        );
        setPosts(response.data.posts);
        setPostsCount(response.data.total_posts);
      } catch (error) {
        console.error("An error occurred while fetching the posts:", error);
      }
    };

    // Fetch posts when page or query changes
    if (query) {
      fetchPosts();
    } else {
      setPosts([]); // Clear posts if query is empty
    }
  }, [query]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `posts/search?query=${query}&page=${currentPage}`
        );
        setPosts(response.data.posts);
        setPostsCount(response.data.total_posts);
      } catch (error) {
        console.error("An error occurred while fetching the posts:", error);
      }
    };

    // Fetch posts when page or query changes
    if (query) {
      fetchPosts();
    } else {
      setPosts([]); // Clear posts if query is empty
    }
  }, [currentPage]);

  return (
    <div>
      {posts?.map((post) => (
        <Link href={`/community/${post.id}`} key={post.id}>
          <PostDisplay
            content={post.content}
            hashtags={post.hashtags}
            image={post.image_url}
            userId={post.user_id}
          />
        </Link>
      ))}
      {
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
      }
    </div>
  );
};

export default SearchPostList;
