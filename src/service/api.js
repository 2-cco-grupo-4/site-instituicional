import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://picme-api.ddns.net"
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
