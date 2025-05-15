import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN_KEY = "accessToken";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // other configurations
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    console.log("getData", token);
    return config;
  },
  (error) => {
    console.log("error", error);
    // Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    if (error.response && [401, 403].includes(error.response.status)) {
      // localStorage.removeItem(ACCESS_TOKEN_KEY);
      // window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
