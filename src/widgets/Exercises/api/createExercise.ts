import { instance } from '../../../shared/api/axiosInstance'
import { ExerciseType } from '../../../entities/Exercise/model/types'
import { FormDataType } from '../types'

export type AxiosResponse = {
    data: ExerciseType
}

export const createExerciseAPI: (formData: FormDataType) => Promise<AxiosResponse> = (formData: FormDataType) => {
    return instance.post('/exercises/create', formData)
}