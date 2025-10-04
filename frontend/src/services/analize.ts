import { AxiosInstance } from "@/lib/axios/axiosInstance"

export const analizeImage = (imageData: FormData) => {
    return AxiosInstance.post('/analize', imageData)
}