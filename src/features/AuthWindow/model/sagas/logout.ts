import { call, put, takeEvery } from '@redux-saga/core/effects'
import { LOGOUT_ERROR, LOGOUT } from '../../../User/consts'
import { actions } from '../../../User/model/userActions'
import { logoutAPI } from '../../api/logout'

function* logout() {
    try {
        yield call(logoutAPI)
        localStorage.setItem('isLoggedIn', JSON.stringify(false))
        yield put(actions.setIsLoggedIn(false))
        yield put(actions.setUsername(''))
    } catch {
        yield put({ type: LOGOUT_ERROR, error: 'Error fetching logout' })
    }
}

export function* watchLogout() {
    yield takeEvery(LOGOUT, logout)
}