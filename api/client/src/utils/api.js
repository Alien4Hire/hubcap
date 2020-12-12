import Axios from 'axios';

let config = {
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 4000,
    headers: { 'X-Custom-Header': 'Hubcap' },
};

const api = Axios.create(config);

api.interceptors.request.use((existingConfig) => {
    if (localStorage.getItem('token')) {
        existingConfig.headers.Authorization = 'token ' + localStorage.token;
    }
    return existingConfig;
});

export default api;
