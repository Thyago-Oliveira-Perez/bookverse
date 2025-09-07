import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: add it when KeyCloak is set up
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default apiClient;