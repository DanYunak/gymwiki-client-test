import { AppStateType } from '../../../redux/store'

export const getAllExercises = (state: AppStateType) => {
    return state.exercisesPage.exercises
}

export const getCreateExerciseWindow = (state: AppStateType) => {
    return state.exercisesPage.createExerciseWindow
}

export const getEditExerciseWindow = (state: AppStateType) => {
    return state.exercisesPage.editExerciseWindow
}

export const getDeleteExerciseWindow = (state: AppStateType) => {
    return state.exercisesPage.deleteExerciseWindow
}

export const getIsFilterMusclesOpen = (state: AppStateType) => {
    return state.exercisesPage.isFilterMusclesOpen
}