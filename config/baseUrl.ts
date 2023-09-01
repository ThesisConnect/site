import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-production-a1af.up.railway.app/',
});

export default instance;
