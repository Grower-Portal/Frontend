import axios from 'axios';
import { setAuthHeader } from './auth';

axios.interceptors.request.use(
  (config) => {
    // Add the JWT token to the request headers
    setAuthHeader(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
