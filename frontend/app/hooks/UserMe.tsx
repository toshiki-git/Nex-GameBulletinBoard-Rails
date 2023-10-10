import { useState, useEffect } from "react";
import { UserType } from "@/lib/types";
import axios from "@/lib/axios";

const useGetMe = () => {
  const [userData, setUserData] = useState<UserType>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me");
        setUserData(response.data);
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
