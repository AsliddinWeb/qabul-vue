// axios.js
import axios from 'axios';
// import auth from "@/stores/auth.js";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
});

// axiosClient.interceptors.request.use(config => {
//     const token = auth.state.token;
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

export default axiosClient;
