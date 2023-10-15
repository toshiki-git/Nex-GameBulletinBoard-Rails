"use client";
import React from "react";
import ContentSearch from "@/app/components/Search/ContentSearch";
import SearchIcon from "@/app/components/Search/SearchIcon";
import { PostType } from "@/lib/types";
import SearchPostList from "../components/Post/SearchPostList";

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
      {showResults ? <SearchPostList posts={searchResults} /> : null}
    </div>
  );
};

export default Search;
