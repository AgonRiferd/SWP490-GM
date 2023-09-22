import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://egts2.azurewebsites.net/api',
});

export default axiosInstance;