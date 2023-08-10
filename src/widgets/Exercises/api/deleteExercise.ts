import { ExerciseType } from '../../../entities/Exercise/model/types'
import { instance } from '../../../shared/api/axiosInstance'

export type AxiosResponse = {
    data: ExerciseType
}

export const deleteExerciseAPI: (exerciseId: number) => Promise<AxiosResponse> = (exerciseId: number) => {
    return instance.delete(`/exercises/delete/${exerciseId}`)
}