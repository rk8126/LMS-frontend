import axiosInstance from "../axios"

export default async function submitTestQuestion({testId, questionId, answer}){
    return await axiosInstance.post(`/user/tests/${testId}/questions/${questionId}/answer`, {answer})
}