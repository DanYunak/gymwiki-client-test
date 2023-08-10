import { InferActionsTypes } from '../../redux/store'
import { actions } from './appActions'

const initialState = {
    isLoginWindowOpen: false,
    isRegistrationWindowOpen: false,
    isLoading: false,
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'APP/SET_IS_LOGIN_WINDOW_OPEN':
            return {
                ...state,
                isLoginWindowOpen: action.boolean
            }

        case 'APP/SET_IS_REGISTRATION_WINDOW_OPEN':
            return {
                ...state,
                isRegistrationWindowOpen: action.boolean
            }

        case 'APP/SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.boolean
            }

        default: return state
    }
}