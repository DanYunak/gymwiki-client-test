import { call, put, takeEvery } from '@redux-saga/core/effects'
import { AxiosResponse, getUserAPI } from '../../api/getUser'
import { GET_USER_ERROR, GET_USER } from '../../consts'
import { actions } from '../userActions'

type ActionType = {
    userId: string
}

function* getUser(action: ActionType | any) {
    try {
        const res: AxiosResponse = yield call(getUserAPI, action.userId)
        yield put(actions.setUsername(res.data.email))
    } catch {
        yield put({ type: GET_USER_ERROR, error: 'Error fetching getting user' })
    }
}

export function* watchGetUser() {
    yield takeEvery(GET_USER, getUser)
}