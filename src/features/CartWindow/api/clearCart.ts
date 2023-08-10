import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: {
        message: string
    }
}

export const clearCartAPI: (userId: any) => Promise<AxiosResponse> = (userId: any) => {
    return instance.put('/products/cart/clear', { userId })
}