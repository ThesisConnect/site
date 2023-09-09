import axios from 'axios';

const axiosBaseurl = axios.create({
  baseURL: 'https://backend-production-a1af.up.railway.app/',
  withCredentials: true,
});

export default axiosBaseurl;
