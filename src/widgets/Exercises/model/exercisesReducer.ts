import { ExerciseType } from '../../../entities/Exercise/model/types'
import { InferActionsTypes } from '../../../redux/store'
import { actions } from './exercisesActions'

const initialState = {
    exercises: [] as ExerciseType[],
    createExerciseWindow: false,
    editExerciseWindow: false,
    deleteExerciseWindow: false,
    isFilterMusclesOpen: false
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const exercisesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'EXERCISES/SET_ALL_EXERCISES':
            return {
                ...state,
                exercises: [...action.exercises]
            }

        case 'EXERCISES/SET_CREATE_EXERCISE_WINDOW':
            return {
                ...state,
                createExerciseWindow: action.boolean
            }

        case 'EXERCISES/SET_EDIT_EXERCISE_WINDOW':
            return {
                ...state,
                editExerciseWindow: action.boolean
            }

        case 'EXERCISES/SET_DELETE_EXERCISE_WINDOW':
            return {
                ...state,
                deleteExerciseWindow: action.boolean
            }
        
        case 'EXERCISES/IS_FILTER_MUSCLES_OPEN':
            return {
                ...state,
                isFilterMusclesOpen: action.boolean
            }

        default: return state
    }
}