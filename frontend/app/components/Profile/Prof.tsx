"use client";
import React from "react";
import useGetMe from "@/app/hooks/UserMe";
import ProfItem from "./ProfItem";

const Prof = () => {
  const { userData } = useGetMe();
  return (
    <div>
      <ProfItem user={userData} />
    </div>
  );
};

export default Prof;
