import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    console.log("accessToken", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
