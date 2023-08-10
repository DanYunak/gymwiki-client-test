import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: {
        _id: number
        name: string
        primaryMuscles: string[]
        secondaryMuscles: string[]
        equipment: string
        img: string
    }
}

export const getExercisesAPI: () => Promise<AxiosResponse> = () => {
    return instance.get('/exercises')
}