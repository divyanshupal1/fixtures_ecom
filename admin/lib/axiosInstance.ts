import axios from "axios";

import { MODE } from "@/constants";

const axiosInstance = axios.create({
  baseURL: MODE == 'local' ? "http://localhost:8080/api/v1/" : MODE == 'demo' ? "http://localhost:3000/api/v1/" : "http://195.35.6.155:8400/api/v1/",
  withCredentials: true,
});

export default axiosInstance;