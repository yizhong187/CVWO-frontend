import axios from "axios";

const API_BASE_URL = "http://localhost:8080/v2";

// Configuring Axios to automatically send cookies with each request (used for JWT authentication)
axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
