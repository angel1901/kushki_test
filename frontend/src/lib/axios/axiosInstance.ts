import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let processedError;
        if (error instanceof Error) {
            processedError = error;
        } else if (typeof error === 'string') {
            processedError = new Error(error);
        } else {
            processedError = new Error(JSON.stringify(error));
        }
        return Promise.reject(processedError);
    }
);