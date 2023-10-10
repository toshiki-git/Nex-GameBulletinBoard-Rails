"use client";
import React from "react";
import useGetMe from "@/app/hooks/UserMe";

const test = () => {
  const { userData } = useGetMe();
  console.log(userData);
  return <div>page</div>;
};

export default test;
