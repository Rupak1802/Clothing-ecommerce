import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update for production
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('aura_session');
  if (userInfo) {
    const parsed = JSON.parse(userInfo);
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
