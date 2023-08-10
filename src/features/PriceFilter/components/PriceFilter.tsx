import { Button, Slider } from '@mui/material'
import { FC, useState } from 'react'
import './PriceFilter.scss'
import axios from 'axios'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'

type PropsType = {
    closeWindow: () => void
}

export const PriceFilter: FC<PropsType> = ({ closeWindow }) => {
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(500)
    const [value, setValue] = useState<number[]>([1, 500])
    
    const dispatch = useAppDispatch()

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const apply = async () => {
        const [minPrice, maxPrice] = value as number[]
        const res = await axios.get(`http://localhost:5000/api/products/priceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`)

        dispatch(actions.setAllProducts(res.data))
        closeWindow()
    }

    return (
        <div className='price__filter'>
            <span>Price</span>
            <Slider
                style={{ width: '300px' }}
                value={value}
                onChange={handleChange}
                valueLabelDisplay='auto'
                min={minPrice}
                max={maxPrice}
            />
            <Button variant='contained' onClick={apply}>Apply</Button>
        </div>
    )
}