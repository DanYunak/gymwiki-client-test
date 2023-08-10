import { IS_LOGGED_IN, LOGIN, LOGOUT, REGISTER, SET_USER_ID, SET_USER_NAME, GET_USER, LOGIN_ERROR } from '../consts';
import { FormDataType } from '../../AuthWindow/model/types'

export const actions = {
    setIsLoggedIn: (boolean: boolean) => ({ type: IS_LOGGED_IN, boolean } as const),
    setUsername: (username: string) => ({ type: SET_USER_NAME, username } as const),

    getUser: (userId: string) => ({ type: GET_USER, userId } as const),

    login: (formData: FormDataType) => ({ type: LOGIN, formData } as const),
    register: (formData: FormDataType) => ({ type: REGISTER, formData } as const),
    logout: () => ({ type: LOGOUT } as const),
}