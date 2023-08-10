import { FormDataType } from '../model/types'
import { instance } from '../../../shared/api/axiosInstance'

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

export const registerAPI: (formData: FormDataType) => Promise<AxiosResponse> = (formData: FormDataType) => {
    return instance.post('/registration', formData)
}