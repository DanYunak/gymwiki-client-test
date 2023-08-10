import { FormDataType, ProductType } from '../../../entities/Product/model/types';
import { instance } from '../../../shared/api/axiosInstance';

export type AxiosResponse = {
    data: ProductType
}

export const createProductAPI: (formData: FormDataType) => Promise<AxiosResponse> = (formData: FormDataType) => {
    return instance.post('/products/create', formData)
}