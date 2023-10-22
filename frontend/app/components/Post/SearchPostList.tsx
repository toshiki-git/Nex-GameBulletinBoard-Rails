"use client";
import React, { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import Link from "next/link";
import { PostType } from "@/lib/types";
import axios from "@/lib/axios";
import { Card, CardBody, Pagination, Spinner } from "@nextui-org/react";
import postAreaCSS from "./PostArea.module.scss";

interface SearchPostListProps {
  query: string;
}

const SearchPostList: React.FC<SearchPostListProps> = ({ query }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsCount, setPostsCount] = useState<number>(1);
  const pagination = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setCurrentPage(1);
      try {
        const response = await axios.get(
          `posts/search?query=${query}&page=${currentPage}`
        );
        setPosts(response.data.posts);
        setPostsCount(response.data.total_posts);
      } catch (error) {
        setError("データの取得に失敗しました。");
        console.error("An error occurred while fetching the posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [query]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `posts/search?query=${query}&page=${currentPage}`
        );
        setPosts(response.data.posts);
        setPostsCount(response.data.total_posts);
      } catch (error) {
        setError("データの取得に失敗しました。");
        console.error("An error occurred while fetching the posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [currentPage]);

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  if (error) return <p>{error}</p>;

  if (posts.length === 0 && query) {
    return (
      <Card className={`${postAreaCSS.postDisplay} mt-3`}>
        <CardBody>
          <p>「{query}」の検索結果は見つかりませんでした。</p>
        </CardBody>
      </Card>
    );
  } else if (posts.length === 0) {
    return (
      <Card className="mt-3">
        <CardBody>
          <p>ハッシュタグや内容で検索できます。</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
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
