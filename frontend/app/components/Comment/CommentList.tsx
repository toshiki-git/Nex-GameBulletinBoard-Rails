"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { CommentDataType } from "@/lib/types";
import CommentDisplay from "./CommnetDisplay";
import { Card, CardBody } from "@nextui-org/react";

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        alert("コメントの取得に失敗しました。もう一度お試しください。");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (comments.length === 0) {
    return (
      <Card className="mt-3">
        <CardBody>
          <p>コメントはまだありません。</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      {comments.map((comment) => (
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
