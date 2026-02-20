import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

api.interceptors.request.use((config) => {
  // Verifique se o nome no localStorage é exatamente '@LawSys:token'
  const token = localStorage.getItem('@LawSys:token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;