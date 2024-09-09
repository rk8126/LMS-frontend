import axiosInstance from "../axios"

export default async function signup(requestBody){
    return await axiosInstance.post('/auth/users/register', requestBody)
}