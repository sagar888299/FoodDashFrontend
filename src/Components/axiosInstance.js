import axios from 'axios';
import { logout } from './AuthSilce';
import { useSelector } from 'react-redux';
import { openModal } from './ModalSlice';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useSelector(state => state.auth.accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useSelector(state => state.auth.refreshToken);

      try {
        const response = await axios.post(`https://${baseURL}/api/refresh-token`, { refreshToken });
        const newAccessToken = response.data.accessToken;
        
        dispatch(setTokens({ accessToken: newAccessToken, refreshToken }));

        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
         dispatch(logout());
         openModal("Login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
