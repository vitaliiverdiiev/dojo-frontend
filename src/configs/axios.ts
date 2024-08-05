import axiosClient from "axios";

const token = localStorage.getItem("token") || "";
const baseURI =
  import.meta.env.VITE_API_URI ||
  "https://dojo-docker-be-9b4ef2803ceb.herokuapp.com/";

console.log({ baseURI });

const axios = axiosClient.create({
  baseURL: baseURI,
  timeout: 1000,
  headers: {
    Authorization: "Bearer " + JSON.parse(token),
  },
});

export default axios;
