import { instance } from '../../../shared/api/axiosInstance'
import { CartProductType } from '../model/types'

export type AxiosResponse = {
    data: CartProductType []
}

export const getCartProductAPI: (userId: string) => Promise<AxiosResponse> = (userId: string) => {
    // @ts-ignore
    return instance.get(`/products/cart/items?userId=${userId}`)
}