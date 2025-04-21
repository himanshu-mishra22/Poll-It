
import axios from "axios";
import {BASE_URL} from './apiPaths.js';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request interceptor to add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//response interceptor
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
  window.location.href = "/login";
  }else if (error.response.status === 500) {
    console.log("Server error", error.response.data.message);

  }else if(error.code == "ECONNABORTED"){
    console.log("Request timeout", error.message);
  }
  return Promise.reject(error);
});

export default axiosInstance;