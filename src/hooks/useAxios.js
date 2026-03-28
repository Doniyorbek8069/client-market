import { useCallback, useEffect } from 'react';
import axios from 'api/axios';
import useNotification from './useNotification';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// ★★★ Bu yerda – fayl darajasida, bir marta yaratiladi ★★★
const showErrorNotification = debounce(
  (sendNotification, msg, variant = 'error') => {
    sendNotification({ msg, variant });
  },
  2500, // 2.5 soniya – kerak bo'lsa o'zgartiring
  { leading: true, trailing: false },
);

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

const useAxios = () => {
  const sendNotification = useNotification();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const region = Cookies.get('region');

  const logout = useCallback(() => {
    navigate('/login');
    localStorage.removeItem('user');
  }, [navigate]);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers['region'] = region;

        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          logout();
          return Promise.reject(error);
        }

        let errorMessage = null;

        if (error?.code === 'ERR_NETWORK') {
          errorMessage = t('common.alerts.error.noConnection');
        } else if (
          (error?.response?.status >= 500 && error?.response?.status < 600) ||
          error?.response?.status == 422
        ) {
          errorMessage =
            error?.response?.data?.message ||
            `Serverda xatolik yuz berdi ${error?.response?.status}`;
        }

        if (errorMessage) {
          showErrorNotification(sendNotification, errorMessage);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [t, logout, sendNotification]); // t va sendNotification qo'shildi

  return axiosPrivate;
};

export default useAxios;
