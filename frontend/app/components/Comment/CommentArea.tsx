"use client";
import React, { useState } from "react";
import axios from "@/lib/axios"; // axiosを使ってHTTPリクエストを行う
import { Button, Input } from "@nextui-org/react";
import SearchCSS from "@/app/components/Search/Search.module.scss";

interface CommentAreaProps {
  postId: number; // 必要に応じて型を調整してください (例: string)
}

const CommentArea: React.FC<CommentAreaProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") {
      alert("コメントは空にできません。");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`/posts/${postId}/comments`, {
        content: comment,
      });
      setComment("");
      location.reload();
    } catch (error) {
      alert("コメントの投稿に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${SearchCSS.content} mt-3`}>
      <Input
        onValueChange={(value) => setComment(value)}
        placeholder="コメントを入力してください"
        disabled={isLoading}
        className={`${SearchCSS.input} `}
      />
      <Button
        onClick={handleCommentSubmit}
        radius="full"
        color="primary"
        disabled={isLoading}
        className="transition-transform duration-100 ease-in-out transform hover:scale-105 ml-2"
      >
        コメント
      </Button>
    </div>
  );
};

export default CommentArea;
