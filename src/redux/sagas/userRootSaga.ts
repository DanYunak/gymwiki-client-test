import { all } from '@redux-saga/core/effects'
import { watchLogin } from '../../features/AuthWindow/model/sagas/login'
import { watchLogout } from '../../features/AuthWindow/model/sagas/logout'
import { watchRegister } from '../../features/AuthWindow/model/sagas/register'
import { watchGetUser } from '../../features/User/model/sagas/getUser'

export function* userRootSaga() {
    yield all([
        watchLogin(),
        watchRegister(),
        watchLogout(),
        watchGetUser()
    ])
}