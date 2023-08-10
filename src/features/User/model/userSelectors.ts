import { AppStateType } from '../../../redux/store'

export const getIsLoggedIn = (state: AppStateType) => {
    return state.user.isLoggedIn
}

export const getUsername = (state: AppStateType) => {
    return state.user.username
}