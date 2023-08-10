import { call, put, takeEvery } from '@redux-saga/core/effects'
import { actions } from '../../../User/model/userActions'
import { FormDataType } from '../types'
import { AxiosResponse, registerAPI } from '../../api/register'
import { REGISTER_ERROR, REGISTER } from '../../../User/consts'
import Cookies from 'js-cookie'
import { message } from 'antd'
import { actions as appActions } from '../../../../app/model/appActions'

type ActionType = {
    formData: FormDataType
}

function* register(action: ActionType | any) {
    try {
        const res: AxiosResponse = yield call(registerAPI, action.formData)
        Cookies.set('userId', res.data.user.id, { expires: 7 })
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        yield put(actions.setIsLoggedIn(true))
        yield put(actions.setUsername(res.data.user.email))
        yield put(appActions.setIsRegistrationWindowOpen(false))
        message.success('You have successfully registered')
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            message.error('User with that email already exists')
        } else {
            yield put({ type: REGISTER_ERROR, error: 'Error fetching registration' })
        }
    }
}

export function* watchRegister() {
    yield takeEvery(REGISTER, register)
}