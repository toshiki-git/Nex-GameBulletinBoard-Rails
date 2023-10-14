"use client";
import React, { useState } from "react";
import SearchCSS from "./Search.module.scss";
import axios from "@/lib/axios";
import { PostType } from "@/lib/types";

interface ContentSearchProps {
  setShowResults: (value: boolean) => void;
  setSearchResults: React.Dispatch<React.SetStateAction<PostType[]>>;
}

const ContentSearch: React.FC<ContentSearchProps> = ({
  setShowResults,
  setSearchResults,
}) => {
  const [content, setContent] = useState("");

  const handleSearch = async () => {
    setShowResults(false);
    const res = await axios.get(`posts/search?query=${content}`);
    setSearchResults(res.data);
    setShowResults(true);
  };

  return (
    <div className={`${SearchCSS.content}`}>
      <input
        type="text"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        placeholder="検索..."
        className={`${SearchCSS.input} p-2 border border-foreground rounded bg-overlay`}
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-primary text-white rounded-full w-20"
      >
        検索
      </button>
    </div>
  );
};

export default ContentSearch;
