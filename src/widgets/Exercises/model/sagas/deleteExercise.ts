import { call, put, takeEvery } from '@redux-saga/core/effects'
import { AxiosResponse } from '../../api/createExercise'
import { editExerciseAPI } from '../../api/editExercise'
import { EDIT_EXERCISE, EDIT_EXERCISE_ERROR, DELETE_EXERCISE_ERROR, DELETE_EXERCISE } from '../../consts';
import { FormDataType } from '../../types'
import { actions } from '../exercisesActions'
import { deleteExerciseAPI } from '../../api/deleteExercise';

type ActionType = {
    exerciseId: number
}

function* deleteExercise(action: ActionType | any) {
    try {
        yield call(deleteExerciseAPI, action.exerciseId)
        yield put(actions.setDeleteExerciseWindow(false))
        yield put(actions.getAllExercises())
    } catch {
        yield put({ type: DELETE_EXERCISE_ERROR, error: 'Error fetching delete exercise' })
    }
}

export function* watchDeleteExercise() {
    yield takeEvery(DELETE_EXERCISE, deleteExercise)
}