import axios from "axios";
import { API_URL } from "../../config";

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use((config) => {
    return config.data;
}, (async (error) => {
    const originalRequest = error.config;
    if (+error.response?.status === 401 && error.config && !error.response.data?.details?.isRetry) {
        try {
            const response = await api.get('/user/refresh', { params: { isRetry: true } });
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            return Promise.reject('Authorization required');
        }
    } else {
        return Promise.reject(error);
    }
}))

export default api;