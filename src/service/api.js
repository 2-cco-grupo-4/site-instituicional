import axios from "axios";

const url =
  process.env.NODE_ENV == "production"
    ? "http://54.165.122.226:8080"
    : "http://localhost:8080";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    // "Accept-Encoding": "gzip, deflate, br",
  },
});

export default api;
