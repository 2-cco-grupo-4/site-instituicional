import axios from "axios";

const api = axios.create({
  baseURL: "http://52.45.6.243:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
