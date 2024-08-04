import axiosClient from "axios";

const token = localStorage.getItem("token") || "";
const baseURL = import.meta.env.VITE_API_URL;

console.log({ baseURL });

const axios = axiosClient.create({
  baseURL: "https://dojo-docker-be-9b4ef2803ceb.herokuapp.com",
  timeout: 1000,
  headers: {
    Authorization: "Bearer " + JSON.parse(token),
  },
});

export default axios;
