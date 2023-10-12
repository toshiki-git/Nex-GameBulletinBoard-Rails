import React from "react";
import { BsSearch } from "react-icons/bs";
import SearchCSS from "./Search.module.scss";

const SearchIcon = () => {
  return (
    <div
      className={`${SearchCSS.searchIcon} flex items-center text-4xl font-bold text-foreground mt-6 mb-4`}
    >
      <BsSearch className="mr-2" /> 検索
    </div>
  );
};

export default SearchIcon;
