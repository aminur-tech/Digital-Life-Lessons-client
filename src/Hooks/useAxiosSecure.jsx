import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "https://zab-shift-server.vercel.app"
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = user?.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                const statusCode = error?.response?.status;

                if (statusCode === 401 || statusCode === 403) {
                    // Logout and redirect
                    logOut().then(() => {
                        navigate('/login');
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [user, navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
