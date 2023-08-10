import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: [
        {
            _id: string
            category: string
            img: string
            name: string
            price: number
        }
    ]
}

export const getProductsByCategoryAPI: (category: string) => Promise<AxiosResponse> = (category: string) => {
    return instance.get(`/products/${category}`)
}