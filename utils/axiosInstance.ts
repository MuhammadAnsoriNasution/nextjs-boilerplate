import axios, { AxiosError, AxiosResponse } from "axios";
import { baseUrl } from "./config";

export const axiosProtect = axios.create({
    baseURL: baseUrl
})

axiosProtect.interceptors.response.use(function (response: AxiosResponse) {
    if (response.config.url === `${baseUrl}/login` || response.config.url === `${baseUrl}/refresh-token`) {
        const auth = response.data
        axiosProtect.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;
        axiosProtect.defaults.headers.common['refresh-token'] = auth.refresh_token;
    }
    return response;
}, function (error: AxiosError) {
    const statusCode = error.response?.status
    if (statusCode === 401 || statusCode === 404) {

    }
    return Promise.reject(error);
});

export const setCredentialRequest = ({ token, refresh_token }: { token: string | null, refresh_token: string | null }) => {
    return new Promise((resolve, reject) => {
        axiosProtect.defaults.headers.common['Authorization'] = token !== null ? 'Bearer ' + token : null;
        axiosProtect.defaults.headers.common['refresh-token'] = refresh_token;
        resolve(true)
    })
}

export const axiosPublic = axios.create({
    baseURL: baseUrl
})