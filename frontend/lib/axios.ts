import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
  baseURL: "https://nex-backend.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
