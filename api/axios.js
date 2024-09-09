import axios  from "axios";
import { cookie } from "./cookies";

function getAxios(user={}) {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    function onRequestFulfilled(request) {
        const authToken = cookie.accessToken;
        if (authToken) request.headers["authorization"] = `Bearer ${authToken}`;
        return request;
    }

    function onRequestRejected(error) {
        // Do something with request error
        // Retry code, internet connectivity check
        return Promise.reject(new Error(error?.response?.data?.msg));
    }

    function onResponseFulfilled(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response.data;
    }


    function onResponseRejected(error) {
        // Do something with response error
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return Promise.reject(error.response);
    }


    axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected, {synchronous: true })
    axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected, { synchronous: true })

    return axiosInstance
}

let axiosInstance = null

if (!axiosInstance) {
    axiosInstance = getAxios()
}
    
export default axiosInstance