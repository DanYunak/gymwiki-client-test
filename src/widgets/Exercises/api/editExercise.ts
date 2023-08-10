import { ExerciseType } from '../../../entities/Exercise/model/types'
import { FormDataType } from '../types'
import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: ExerciseType
}

export const editExerciseAPI: (formData: FormDataType, exerciseId: number) => Promise<AxiosResponse> = (formData: FormDataType, exerciseId: number) => {
    return instance.put(`/exercises/edit/${exerciseId}`, formData)
}