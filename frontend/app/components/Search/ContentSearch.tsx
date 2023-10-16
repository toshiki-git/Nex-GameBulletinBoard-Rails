"use client";
import React, { useState } from "react";
import SearchCSS from "./Search.module.scss";
import SearchPostList from "../Post/SearchPostList";

const ContentSearch = () => {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const handleSearch = () => {
    setActiveQuery(query);
  };

  return (
    <div>
      <div className={`${SearchCSS.content}`}>
        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
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
      <div>
        <SearchPostList query={activeQuery} />
      </div>
    </div>
  );
};

export default ContentSearch;
