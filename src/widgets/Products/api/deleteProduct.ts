import { ProductType } from '../../../entities/Product/model/types'
import { instance } from '../../../shared/api/axiosInstance';

export type AxiosResponse = {
    data: ProductType
}

export const deleteProductAPI: (productId: string) => Promise<AxiosResponse> = (productId: string) => {
    return instance.delete(`/products/delete/${productId}`)
}