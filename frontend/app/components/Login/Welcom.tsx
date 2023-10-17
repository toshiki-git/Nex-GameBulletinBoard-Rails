"use client";
import React from "react";
import { Image } from "@nextui-org/react";
const Welcom = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <Image width={120} height={120} alt="Nex Icon" src="/nex.png" />
      </div>
      <div className="flex-grow">
        <div className="text-3xl font-bold text-foregrand ">
          Nex: ゲーム専用掲示板へようこそ
        </div>
      </div>
    </div>
  );
};

export default Welcom;
