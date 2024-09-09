import axiosInstance from "../axios"

export default async function login(requestBody){
    return await axiosInstance.post('/auth/users/login', requestBody)
}