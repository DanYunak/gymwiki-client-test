import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import Cookies from 'js-cookie'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { BurgerMenu } from '../../../features/BurgerMenu'
import { actions } from '../../../features/User/model/userActions'
import { getIsLoggedIn, getUsername } from '../../../features/User/model/userSelectors'
import { useAppDispatch } from '../../../redux/store'
import { actions as exercisesActions } from '../../Exercises/model/exercisesActions'
import { actions as productsActions } from '../../Products/model/productsActions'
import { getUsernameWithoutDomain } from '../lib/helpers/getUsernameWithoutDomain'
import { actions as appActions } from '../../../app/model/appActions'
import './NavMenu.scss'

export const NavMenu: FC = () => {
    const [showBurgerMenu, setShowBurgerMenu] = useState(false)

    const toggleBurgerMenu = () => {
        setShowBurgerMenu(!showBurgerMenu)
    }

    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(getIsLoggedIn)
    const username = useSelector(getUsername)

    const logout = async () => {
        try {
            dispatch(actions.logout())
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const userId = Cookies.get('userId')
        if (userId) {
            dispatch(actions.getUser(userId))
        }
    }, [])

    const handleLoginWindow = () => {
        dispatch(appActions.setIsLoginWindowOpen(true))
        localStorage.setItem('isCartOpen', JSON.stringify(false))
        dispatch(productsActions.setIsCartOpen(false))
        dispatch(productsActions.setIsOrderWindowOpen(false))
        dispatch(exercisesActions.setCreateExerciseWindow(false))
        dispatch(exercisesActions.setEditExerciseWindow(false))
        dispatch(exercisesActions.setDeleteExerciseWindow(false))
    }

    const closeMenu = () => {
        setShowBurgerMenu(false)
    }

    return (
        <nav className='nav'>
            <div className='links'>
                <NavLink className='nav__link' to='/exercises'>Exercises</NavLink>
                <NavLink className='nav__link' to='/'>Store</NavLink>
            </div>
            {isLoggedIn &&
                <div className='username'>
                    {getUsernameWithoutDomain(username)}
                </div>
            }
            <div className='nav__auth'>
                {!isLoggedIn &&
                    <div className='nav__login' onClick={handleLoginWindow}>
                        <PersonIcon />
                    </div>
                }
                {isLoggedIn &&
                    <div className='nav__logout' onClick={logout}>
                        <LogoutIcon />
                    </div>
                }
            </div>
            <div className='nav__burger_icon' onClick={toggleBurgerMenu}>
                <MenuIcon />
            </div>
            <div className={`burger__menu ${showBurgerMenu ? 'burger__menu_active' : ''}`}>
                <BurgerMenu closeMenu={closeMenu} handleLoginWindow={handleLoginWindow} />
            </div>
        </nav>
    )
}