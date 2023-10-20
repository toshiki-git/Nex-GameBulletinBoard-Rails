"use client";
import React, { useState } from "react";
import axios from "@/lib/axios"; // axiosを使ってHTTPリクエストを行う
import { Button, Textarea } from "@nextui-org/react";

interface CommentAreaProps {
  postId: number; // 必要に応じて型を調整してください (例: string)
}

const CommentArea: React.FC<CommentAreaProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCommentSubmit = async () => {
    // コメントが空の場合は送信しない
    if (comment.trim() === "") {
      setError("コメントは空にできません。");
      return;
    }

    setIsLoading(true);

    try {
      // ここにAPIエンドポイントとコメントデータをPOSTするコードを記述
      // このURLはバックエンドの設定によります。適切なエンドポイントURLに変更してください。
      const response = await axios.post(`/posts/${postId}/comments`, {
        content: comment, // コメントの内容
      });

      // 必要に応じてレスポンス処理を追加（例：成功メッセージの表示）
      console.log(response.data);

      // コメント欄をクリア
      setComment("");

      setError(null); // エラー状態をリセット
    } catch (error) {
      // エラー処理
      setError("コメントの投稿に失敗しました。もう一度お試しください。");
      console.error(error); // または適切なエラーハンドリング
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <div>{error}</div>} {/* エラーメッセージがあれば表示 */}
      <Textarea
        onValueChange={(value) => setComment(value)}
        placeholder="コメントを入力してください"
        disabled={isLoading} // ローディング中は入力不可
      />
      <Button
        onClick={handleCommentSubmit}
        color="primary"
        disabled={isLoading} // ローディング中はボタンを無効化
      >
        {isLoading ? "送信中..." : "コメント"}
      </Button>
    </div>
  );
};

export default CommentArea;
