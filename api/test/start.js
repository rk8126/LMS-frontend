import axiosInstance from "../axios"

export default async function startTest(testId){
    return await axiosInstance.post(`/user/tests/${testId}/start`)
}