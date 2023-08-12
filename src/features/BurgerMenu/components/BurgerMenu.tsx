import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Close } from '../../../entities/Close/components/Close'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSelector } from 'react-redux'
import { getIsLoggedIn, getUsername } from '../../User/model/userSelectors';
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../User/model/userActions'
import './BurgerMenu.scss'
import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FilterAlt from '@mui/icons-material/FilterAlt'
import { actions as productsActions } from '../../../widgets/Products/model/productsActions'
import { Add } from '@mui/icons-material'
import { getUsernameWithoutDomain } from '../../../widgets/NavMenu/lib/helpers/getUsernameWithoutDomain';

type PropsType = {
    closeMenu: () => void
    handleLoginWindow: () => void
}

export const BurgerMenu: FC<PropsType> = ({ closeMenu, handleLoginWindow }) => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(getIsLoggedIn)
    const username = useSelector(getUsername)

    const logout = () => {
        dispatch(actions.logout())
        closeMenu()
    }

    const openCart = () => {
        dispatch(productsActions.setIsCartOpen(true))
        closeMenu()
    }

    const openWishList = () => {
        dispatch(productsActions.setIsWishListOpen(true))
        closeMenu()
    }

    const openFilter = () => {
        dispatch(productsActions.setIsFilterWindowOpen(true))
        closeMenu()
    }

    const openCreateWindow = () => {
        dispatch(productsActions.setIsCreateWindowOpen(true))
        closeMenu()
    }

    const openLoginWindow = () => {
        handleLoginWindow()
        closeMenu()
    }

    return (
        <div className='menu'>
            <div onClick={closeMenu} style={{ color: '#fff' }}>
                <Close />
            </div>
            {isLoggedIn && username !== '' &&
                <div className='user__name'>{getUsernameWithoutDomain(username)}</div>
            }
            <div className='nav__auth_burger'>
                {!isLoggedIn &&
                    <div className='nav__login' onClick={openLoginWindow}>
                        <PersonIcon />
                    </div>
                }
                {isLoggedIn &&
                    <div className='nav__logout' onClick={logout}>
                        <LogoutIcon />
                    </div>
                }
            </div>
            <div className='store__actions'>
                <NavLink className='nav__link nav__link_store' to='/' onClick={closeMenu}>Store</NavLink>
                <div className='btn__actions'>
                    <Button variant='contained' size='large' onClick={openCart}>
                        <ShoppingCartIcon />
                    </Button>
                    <Button variant='contained' size='large' onClick={openWishList}>
                        <FavoriteIcon />
                    </Button>
                    <Button variant='contained' size='large' onClick={openFilter}>
                        <FilterAlt />
                    </Button>
                    <Button variant='contained' size='large' onClick={openCreateWindow}>
                        <Add />
                    </Button>
                </div>
            </div>
            <div className='exercises__actions'>
                <NavLink className='nav__link' to='/exercises' onClick={closeMenu}>Exercises</NavLink>
            </div>
        </div>
    )
}