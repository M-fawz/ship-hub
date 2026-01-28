import axios from 'axios';

/**
 * API Axios Instance
 * Configures the base URL and default headers for all network requests.
 */
const api = axios.create({
  // Backend Server URL - update this for production deployment
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request Interceptor
 * Automatically injects the JWT Bearer token into the Authorization header
 * if a token exists in the browser's LocalStorage.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors before they are sent
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor (Optional but Recommended)
 * Useful for handling global errors like 401 Unauthorized
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logic for auto-logout or redirecting to login can go here
      console.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default api;