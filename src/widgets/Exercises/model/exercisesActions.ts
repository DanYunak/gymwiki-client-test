import { CREATE_EXERCISE, DELETE_EXERCISE, EDIT_EXERCISE, GET_ALL_EXERCISES, IS_FILTER_MUSCLES_OPEN, SET_ALL_EXERCISES, SET_CREATE_EXERCISE_WINDOW, SET_DELETE_EXERCISE_WINDOW, SET_EDIT_EXERCISE_WINDOW } from '../consts';
import { FormDataType } from '../types';

export const actions = {
    getAllExercises: () => ({ type: GET_ALL_EXERCISES } as const),
    setAllExercises: (exercises: any) => ({ type: SET_ALL_EXERCISES, exercises } as const),

    setCreateExerciseWindow: (boolean: boolean) => ({ type: SET_CREATE_EXERCISE_WINDOW, boolean } as const),
    setEditExerciseWindow: (boolean: boolean) => ({ type: SET_EDIT_EXERCISE_WINDOW, boolean } as const),
    setDeleteExerciseWindow: (boolean: boolean) => ({ type: SET_DELETE_EXERCISE_WINDOW, boolean } as const),
    isFilterMusclesOpen: (boolean: boolean) => ({ type: IS_FILTER_MUSCLES_OPEN, boolean } as const),

    createExercise: (formData: FormDataType) => ({ type: CREATE_EXERCISE, formData } as const),
    editExercise: (formData: FormDataType, exerciseId: number) => ({ type: EDIT_EXERCISE, formData, exerciseId } as const),
    deleteExercise: (exerciseId: number) => ({ type: DELETE_EXERCISE, exerciseId } as const)
}