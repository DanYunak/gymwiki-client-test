import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: {
        message: string
    }
}

export const addToCartAPI: (userId: string, productId: number) => Promise<AxiosResponse> =
    (userId: string, productId: number) => {
        return instance.post('/products/cart/add', { userId, productId })
    }