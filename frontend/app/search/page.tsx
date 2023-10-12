"use client";
import React from "react";
import ContentSearch from "@/app/components/Search/ContentSearch";
import PostList from "@/app/components/Post/PostList";
import SearchIcon from "@/app/components/Search/SearchIcon";
import { PostType } from "@/lib/types";

const Search = () => {
  const [showResults, setShowResults] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<PostType[]>([]);

  return (
    <div>
      <SearchIcon />
      <ContentSearch
        setShowResults={setShowResults}
        setSearchResults={setSearchResults}
      />
      {showResults ? <PostList results={searchResults} /> : null}
    </div>
  );
};

export default Search;
