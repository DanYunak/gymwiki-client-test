import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { NavMenu } from '../../NavMenu/components/NavMenu'
import './Header.scss'

export const Header: FC = () => {
    return (
        <header className='header'>
            <div className='logo'>
                <FitnessCenterIcon style={{ color: '#fff', fontSize: 50 }} />
                <span>WIKI</span>
            </div>
            <NavMenu />
        </header>
    )
}