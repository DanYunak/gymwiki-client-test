import { call, put, takeEvery } from '@redux-saga/core/effects'
import { createExerciseAPI } from '../../api/createExercise'
import { CREATE_EXERCISE, CREATE_EXERCISE_ERROR } from '../../consts'
import { FormDataType } from '../../types'
import { actions } from '../exercisesActions'
import { actions as appActions } from '../../../../app/model/appActions'

type ActionType = {
    formData: FormDataType
}

function* createExercise(action: ActionType | any) {
    try {
        yield call(createExerciseAPI, action.formData)
        yield put(appActions.setIsLoading(true))
        yield put(actions.getAllExercises())
        yield put(actions.setCreateExerciseWindow(false))
        yield put(appActions.setIsLoading(false))
    } catch {
        yield put({ type: CREATE_EXERCISE_ERROR, error: 'Error fetching create exercise' })
    }
}

export function* watchCreateExercise() {
    yield takeEvery(CREATE_EXERCISE, createExercise)
}