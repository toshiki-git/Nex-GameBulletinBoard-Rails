"use client";
import { useState, useEffect } from "react";
import { UserDataType } from "@/lib/types";
import axios from "@/lib/axios";

const useGetMe = () => {
  const initialUser: UserDataType = {
    id: -1,
    username: "",
    email: "",
    password_digest: "",
    image_url: "",
    created_at: "",
  };
  const [userData, setUserData] = useState<UserDataType>(initialUser);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me");
        const modifiedData = {
          ...response.data,
          image_url: "https://avatars.githubusercontent.com/u/30373425?v=4L",
        };
        setUserData(modifiedData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to retrieve user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, isLoading, error };
};

export default useGetMe;
