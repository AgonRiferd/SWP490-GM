import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://egts.azurewebsites.net/api',
});

export default axiosInstance;