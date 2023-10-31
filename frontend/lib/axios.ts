import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  headers: {
    "Content-Type": "application/json",
    ...(document.cookie.includes("user_token=") && {
      Authorization: `Bearer ${
        document.cookie.split("user_token=")[1].split(";")[0]
      }`,
    }),
  },
});

export default axios;
