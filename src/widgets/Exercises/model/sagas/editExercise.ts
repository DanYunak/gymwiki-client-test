import { call, put, takeEvery } from '@redux-saga/core/effects'
import { AxiosResponse } from '../../api/createExercise'
import { editExerciseAPI } from '../../api/editExercise'
import { EDIT_EXERCISE, EDIT_EXERCISE_ERROR } from '../../consts'
import { FormDataType } from '../../types'
import { actions } from '../exercisesActions'
import { actions as appActions } from '../../../../app/model/appActions'

type ActionType = {
    formData: FormDataType
    exerciseId: number
}

function* editExercise(action: ActionType | any) {
    try {
        yield call(editExerciseAPI, action.formData, action.exerciseId)
        yield put(appActions.setIsLoading(true))
        yield put(actions.getAllExercises())
        yield put(actions.setEditExerciseWindow(false))
        yield put(appActions.setIsLoading(false))
    } catch {
        yield put({ type: EDIT_EXERCISE_ERROR, error: 'Error fetching edit exercise' })
    }
}

export function* watchEditExercise() {
    yield takeEvery(EDIT_EXERCISE, editExercise)
}