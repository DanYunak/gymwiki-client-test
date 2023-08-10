import { call, put, takeEvery } from '@redux-saga/core/effects'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { LOGIN, LOGIN_ERROR } from '../../../User/consts'
import { actions } from '../../../User/model/userActions'
import { AxiosResponse, loginAPI } from '../../api/login'
import { FormDataType } from '../types'
import { actions as appActions } from '../../../../app/model/appActions'

type ActionType = {
    formData: FormDataType
}

function* login(action: ActionType | any) {
    try {
        const res: AxiosResponse = yield call(loginAPI, action.formData)
        Cookies.set('userId', res.data.user.id, { expires: 7 })
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        yield put(actions.setIsLoggedIn(true))
        yield put(actions.setUsername(res.data.user.email))
        yield put(appActions.setIsLoginWindowOpen(false))
        message.success('You have successfully logged in')
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            message.error('Incorrect email or password')
        } else {
            yield put({ type: LOGIN_ERROR, error: 'Error fetching login' })
        }
    }
}

export function* watchLogin() {
    yield takeEvery(LOGIN, login)
}