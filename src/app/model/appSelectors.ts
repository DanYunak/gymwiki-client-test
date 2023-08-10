import { AppStateType } from '../../redux/store'

export const getIsLoginWindowOpen = (state: AppStateType) => {
    return state.app.isLoginWindowOpen
}

export const getIsRegistrationWindowOpen = (state: AppStateType) => {
    return state.app.isRegistrationWindowOpen
}

export const getIsLoading = (state: AppStateType) => {
    return state.app.isLoading
}