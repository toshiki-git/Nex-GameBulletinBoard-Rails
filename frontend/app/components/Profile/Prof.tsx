"use client";
import React from "react";
import useGetMe from "@/app/hooks/UserMe";
import ProfItem from "./ProfItem";

const Prof = () => {
  const { userData } = useGetMe();
  return (
    <div>
      <ProfItem user={userData} birthday="2000/01/01" />
      <div>{userData.image_url}</div>
    </div>
  );
};

export default Prof;
