import axios from "axios";

const url =
  process.env.NODE_ENV == "production"
    ? "http://52.45.6.243:8080"
    : "http://localhost:8080";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
