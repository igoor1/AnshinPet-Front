import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

setAuthToken();

export default api;
