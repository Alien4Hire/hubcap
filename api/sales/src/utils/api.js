import Axios from 'axios';

let config = {
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 4000,
    headers: {'X-Custom-Header': 'Hubcap'},
    withCredentials: true
}

const api = Axios.create(config);

api.interceptors.request.use( existingConfig => {
    if(localStorage.getItem('token')){
        existingConfig.headers.Authorization = 'token ' + localStorage.token
    }
    return existingConfig;
})

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.data && error.response.data.location) {
        return Promise.reject(error)
    } else {
        return Promise.reject(error)
    }
})


export default api;