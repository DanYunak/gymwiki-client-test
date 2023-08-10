import { call, put, takeEvery } from '@redux-saga/core/effects'
import { GET_ALL_EXERCISES, SET_ALL_EXERCISES_ERROR } from '../../consts'
import { getExercisesAPI, AxiosResponse } from '../../api/getExercises'
import { actions } from '../exercisesActions'
import { actions as appActions } from '../../../../app/model/appActions'

function* handleAllExercises() {
    try {
        const res: AxiosResponse = yield call(getExercisesAPI)
        yield put(appActions.setIsLoading(true))
        yield put(actions.setAllExercises(res.data))
        yield put(appActions.setIsLoading(false))
    } catch {
        yield put({ type: SET_ALL_EXERCISES_ERROR, error: 'Error fetching all exercises' })
    }
}

export function* watchHandleAllExercises() {
    yield takeEvery(GET_ALL_EXERCISES, handleAllExercises)
}