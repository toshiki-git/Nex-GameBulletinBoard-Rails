import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
