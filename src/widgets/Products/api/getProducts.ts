import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: [
        {
            _id: number
            name: string
            description: string
            category: string
            price: number
            img: string
        }
    ]
}

export const getProductsAPI: () => Promise<AxiosResponse> = () => {
    return instance.get('/products')
}