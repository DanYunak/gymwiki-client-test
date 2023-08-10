import { instance } from '../../../shared/api/axiosInstance'
import { FormDataType } from '../model/types'

export type AxiosResponse = {
    data: {
        accessToken: string
        refreshToken: string
        user: {
            email: string
            id: string
        }
    }
}

export const loginAPI: (formData: FormDataType) => Promise<AxiosResponse> = (formData: FormDataType) => {
    return instance.post('/login', formData)
}