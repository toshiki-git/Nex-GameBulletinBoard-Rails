"use client";
import React, { useState } from "react";
import axios from "@/lib/axios";
import { Button, Input } from "@nextui-org/react";
import SearchCSS from "@/app/components/Search/Search.module.scss";

interface CommentAreaProps {
  postId: number;
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
    } catch (err: any) {
      if (err.response) {
        const serverError =
          err.response.data?.error ||
          `HTTP error! Status: ${err.response.status}`;
        alert(serverError);
      } else {
        alert(err.message);
      }
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
