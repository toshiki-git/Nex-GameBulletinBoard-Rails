"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";

const SignupLink = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const reqBody = {
        email: "test@example.com",
        password: "password",
      };
      const response = await axios.post("/auth/login", reqBody);
      Cookies.set("user_token", response.data.token, { expires: 1 });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      router.push("/home");
    } catch (err: any) {
      if (err.response) {
        const serverError =
          err.response.data?.error ||
          `HTTP error! Status: ${err.response.status}`;
        console.error(serverError);
        alert(serverError);
      } else {
        console.error(err.message || "An unknown error occurred.");
        alert(err.message);
      }
    }
  };
  return (
    <div className="mt-6 text-center">
      <p className="text-lg">アカウントを作成せずに、サービスを利用</p>
      <p className="mb-4 text-sm text-warning">一部機能が制限されます</p>
      <Button
        onClick={handleLogin}
        color="warning"
        radius="full"
        className="transition-transform duration-100 ease-in-out transform hover:scale-105"
      >
        テストユーザでログイン
      </Button>
    </div>
  );
};

export default SignupLink;
