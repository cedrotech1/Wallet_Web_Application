import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('base', BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
