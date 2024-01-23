import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/v1'
});

axiosInstance.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      "content-type": "application/json",
    };
    const token = localStorage.getItem('token')

    if(token){
        config.headers.Authorization = `Bearer ${token}`
     
    }

    return config
}, (err) => {
    return Promise.reject(err)
})

export default axiosInstance