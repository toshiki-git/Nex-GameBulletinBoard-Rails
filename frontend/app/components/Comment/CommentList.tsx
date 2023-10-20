"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { CommentDataType } from "@/lib/types";
import CommentDisplay from "./CommnetDisplay";

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentDataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`);
        // コメントデータがユーザーデータを含むようになったため、
        // レスポンスから直接コメントをセットできるようになりました。
        setComments(response.data);
        setError(null);
      } catch (error) {
        setError("コメントの取得に失敗しました。もう一度お試しください。");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]); // postIdが変更されたときにコメントを再取得します。

  if (isLoading) {
    return <div>読み込み中...</div>; // または他のローディングインジケーター
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        // 各CommentDisplayには、それぞれのコメントに紐づくユーザー情報が含まれます。
        <CommentDisplay
          key={comment.id}
          comment={comment}
          userData={comment.user}
        />
      ))}
    </div>
  );
};

export default CommentList;
