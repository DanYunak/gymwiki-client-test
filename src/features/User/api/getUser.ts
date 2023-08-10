import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: {
        _id: string
        email: string
        password: string
    }
}

export const getUserAPI: (userId: string) => Promise<AxiosResponse> = (userId: string) => {
    return instance.get(`/user?userId=${userId}`)
}