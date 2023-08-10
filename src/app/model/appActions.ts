import { SET_IS_LOGIN_WINDOW_OPEN, SET_IS_REGISTRATION_WINDOW_OPEN, SET_IS_LOADING } from '../consts'

export const actions = {
    setIsLoginWindowOpen: (boolean: boolean) => ({ type: SET_IS_LOGIN_WINDOW_OPEN, boolean } as const),
    setIsRegistrationWindowOpen: (boolean: boolean) => ({ type: SET_IS_REGISTRATION_WINDOW_OPEN, boolean } as const),
    setIsLoading: (boolean: boolean) => ({ type: SET_IS_LOADING, boolean } as const)
}