import { InferActionsTypes } from '../../../redux/store'
import { actions } from './userActions'

const isLoggedInString = localStorage.getItem('isLoggedIn')
const isLoggedInParse = isLoggedInString ? JSON.parse(isLoggedInString) : ''

const initialState = {
    isLoggedIn: isLoggedInParse,
    username: '',
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'USER/IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.boolean
            }

        case 'USER/SET_USER_NAME':
            return {
                ...state,
                username: action.username
            }

        default: return state
    }
}