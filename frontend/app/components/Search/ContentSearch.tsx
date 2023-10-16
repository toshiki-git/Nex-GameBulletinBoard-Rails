"use client";
import React, { useState } from "react";
import SearchCSS from "./Search.module.scss";
import SearchPostList from "../Post/SearchPostList";
import { Button, Textarea } from "@nextui-org/react";

const ContentSearch = () => {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const handleSearch = () => {
    setActiveQuery(query);
  };

  return (
    <div>
      <div className={`${SearchCSS.content}`}>
        <Textarea
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          placeholder="検索..."
          minRows={1}
          maxRows={1}
          className={`${SearchCSS.input} `}
        />
        <Button
          onClick={handleSearch}
          color="primary"
          radius="full"
          className="transition-transform duration-100 ease-in-out transform hover:scale-105 ml-2"
        >
          検索
        </Button>
      </div>
      <div>
        <SearchPostList query={activeQuery} />
      </div>
    </div>
  );
};

export default ContentSearch;
