"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { BsFillImageFill } from "react-icons/bs";
import postAreaCSS from "./PostArea.module.scss";
import useGetMe from "@/app/hooks/UserMe";
import axios from "@/lib/axios";

interface PostAreaProps {
  onNewPost?: (post: any) => void;
}

const PostArea: React.FC<PostAreaProps> = ({ onNewPost }) => {
  const { userData } = useGetMe();
  const [content, setContent] = useState<string>("");
  const [hashtags, setHashtags] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imagePreviewUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : null;

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file);
  };

  const handlePost = async () => {
    // content と hashtags のバリデーション
    if (!content || !hashtags) {
      alert("投稿内容とハッシュタグは必須です。");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("post[user_id]", userData.id.toString());
      formData.append("post[content]", content);
      formData.append("post[hashtags]", hashtags);
      if (selectedImage) {
        formData.append("post[image]", selectedImage);
      }

      const response = await axios.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (onNewPost) {
        onNewPost(response.data);
      }
      alert("投稿が完了しました。");
      setContent("");
      setHashtags("");
      setSelectedImage(null);
    } catch (err: any) {
      if (err.response) {
        const serverError =
          err.response.data?.error ||
          `HTTP error! Status: ${err.response.status}`;
        console.error(serverError);
        alert(serverError);
      } else {
        console.error(err.message || "An unknown error occurred.");
        alert(err.message);
      }
    }
  };

  return (
    <Card className={`${postAreaCSS.postArea} bg-overlay p-4 rounded-md mt-5`}>
      <CardHeader className="text-xl text-foreground">投稿</CardHeader>

      <CardBody>
        <Textarea
          minRows={1}
          maxRows={2}
          label="ハッシュタグ"
          labelPlacement="outside"
          placeholder="#ハッシュタグを入力してください"
          value={hashtags}
          onValueChange={(value) => setHashtags(value)}
        />
        <Textarea
          label="投稿内容"
          labelPlacement="outside"
          placeholder="投稿内容を入力してください"
          minRows={4}
          onValueChange={(value) => setContent(value)}
          value={content}
          className="mt-4"
        />
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            onClick={handleImageUpload}
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="画像をアップロード"
            className="transition-transform duration-100 ease-in-out transform hover:scale-105"
          >
            <BsFillImageFill size={20} />
          </Button>
          {selectedImage && imagePreviewUrl && (
            <div className="flex">
              <img
                className="ml-1 rounded-md"
                src={imagePreviewUrl}
                alt="Selected preview"
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
              />
              <p className="text-foreground ml-1">
                {selectedImage.name}が選択されました。
              </p>
            </div>
          )}
        </div>

        <Button
          color="primary"
          onClick={handlePost}
          radius="full"
          className="transition-transform duration-100 ease-in-out transform hover:scale-105"
        >
          投稿
        </Button>
      </CardFooter>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </Card>
  );
};

export default PostArea;
