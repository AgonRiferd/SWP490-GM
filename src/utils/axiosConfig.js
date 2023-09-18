import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://egts1.azurewebsites.net/api',
});

export default axiosInstance;