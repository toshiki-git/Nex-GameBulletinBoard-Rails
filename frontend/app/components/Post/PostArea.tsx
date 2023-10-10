"use client";
import React, { useRef, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { BsFillImageFill } from "react-icons/bs";
import postAreaCSS from "./PostArea.module.scss";
import useGetMe from "@/app/hooks/UserMe";
import axios from "@/lib/axios";

const PostArea: React.FC = () => {
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

      axios.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
    <div className={`${postAreaCSS.postArea} bg-overlay p-4 rounded-md`}>
      <div className="text-xl text-foreground mb-4">投稿</div>
      <div className="flex-1 rounded-md p-1 mb-2 text-foreground placeholder-focus">
        <Textarea
          minRows={1}
          placeholder="#ハッシュタグ"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <Textarea
          placeholder="投稿内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-3 ml-2 flex justify-between items-center">
        <div className="flex items-center">
          <Button
            onClick={handleImageUpload}
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="画像をアップロード"
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

        <Button color="primary" onClick={handlePost}>
          投稿
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default PostArea;
