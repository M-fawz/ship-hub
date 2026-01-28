import axios from 'axios';

const api = axios.create({
  // حط هنا عنوان السيرفر بتاعك (الـ Backend)
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// إضافة التوكن (Token) تلقائياً لو المستخدم مسجل دخول
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;