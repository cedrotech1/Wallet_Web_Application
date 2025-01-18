import axios from "axios";

const liveServerUrl: string = "https://taskforce-wallet-backend.onrender.com/api/v1/"

const instance = axios.create({
    baseURL: liveServerUrl
})

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
    },
);

export default instance;