import { FC } from 'react'
import { Close } from '../../../entities/Close/components/Close'
import './FilterWindow.scss'
import { PriceFilter } from '../../PriceFilter/components/PriceFilter'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'

export const FilterWindow: FC = () => {
    const dispatch = useAppDispatch()

    const closeWindow = () => {
        dispatch(actions.setIsFilterWindowOpen(false))
    }

    return (
        <div className='filter__window'>
            <div onClick={closeWindow}>
                <Close />
            </div>
            <PriceFilter closeWindow={closeWindow} />
        </div>
    )
}