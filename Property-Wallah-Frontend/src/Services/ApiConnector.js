import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (config) => {
    return axiosInstance(config);
}