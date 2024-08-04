import axiosClient from "axios";

const token = localStorage.getItem("token") || "";

const axios = axiosClient.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    Authorization: "Bearer " + JSON.parse(token),
  },
});

export default axios;
