"use client";
import React from "react";
import useGetMe from "@/app/hooks/UserMe";
import OtherProfItem from "./OtherProfItem";

const OtherProf = () => {
  const { userData } = useGetMe();
  return (
    <div>
      <OtherProfItem user={userData} />
    </div>
  );
};

export default OtherProf;
