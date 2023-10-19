"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { UserDataType } from "@/lib/types";
import { Spinner } from "@nextui-org/react";
import OtherProfItem from "@/app/components/Profile/OtherProfItem";

const Profiles = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserDataType>({} as UserDataType);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/users/${params.id}`);
        setUser(response.data);
      } catch (err) {
        setError("データの取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading)
    return (
      <div className="mt-3 flex justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        <OtherProfItem user={user} />
      </div>
    </>
  );
};

export default Profiles;
