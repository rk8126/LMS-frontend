import axiosInstance from "../axios"

export default async function getNextQuestion({testId}){
    return await axiosInstance.get(`/user/tests/next-question/${testId}`)
}