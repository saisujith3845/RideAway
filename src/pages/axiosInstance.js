import axios from 'axios';

// Set up axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api', // Replace with your API base URL
});

// Request interceptor to add token to every request
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;