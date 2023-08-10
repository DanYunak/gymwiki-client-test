import { instance } from '../../../shared/api/axiosInstance'

type AxiosResponse = {
    data: {
        acknowledged: boolean
        deletedCount: number
    }
}

export const logoutAPI: () => Promise<AxiosResponse> = () => {
    return instance.post('/logout')
}