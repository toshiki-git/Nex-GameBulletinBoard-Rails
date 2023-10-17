"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SignupLink = () => {
  return (
    <div className="mt-6 text-center">
      <p className="mb-4 text-lg">
        アカウントをお持ちでない方は、こちらから登録
      </p>
      <Link href="/signup" passHref>
        <Button
          color="success"
          radius="full"
          className="transition-transform duration-100 ease-in-out transform hover:scale-105"
        >
          アカウント作成
        </Button>
      </Link>
    </div>
  );
};

export default SignupLink;
