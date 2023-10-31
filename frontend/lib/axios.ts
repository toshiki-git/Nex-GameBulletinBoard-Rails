import Axios from "axios";
import Cookies from "js-cookie";

const userToken = Cookies.get("user_token");

const axios = Axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  headers: {
    "Content-Type": "application/json",
    /* ...(userToken && {
      Authorization: `Bearer ${userToken}`,
    }), */
  },
});

export default axios;
