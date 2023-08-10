import CloseIcon from '@mui/icons-material/Close'
import { FC } from 'react'
import './Close.scss'

export const Close: FC = () => {
    return (
        <div className='close'>
            <CloseIcon />
        </div>
    )
}