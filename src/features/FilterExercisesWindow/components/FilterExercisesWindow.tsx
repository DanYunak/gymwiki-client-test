import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import './FilterExercisesWindow.scss'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Exercises/model/exercisesActions'
import { Close } from '../../../entities/Close/components/Close'

type PropsType = {
    handleFilter: (value: string, checked: boolean) => void
    selectedMuscles: string[]
}

export const FilterExercisesWindow: FC<PropsType> = ({ handleFilter, selectedMuscles }) => {
    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        handleFilter(e.target.value, checked)
    }

    const closeFilter = () => {
        dispatch(actions.isFilterMusclesOpen(false))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div onClick={closeFilter}>
                <Close />
            </div>
            <FormGroup style={{ color: 'white' }} className='form__group'>
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Biceps' checked={selectedMuscles.includes('Biceps')} />} label='Biceps' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Calves' checked={selectedMuscles.includes('Calves')} />} label='Calves' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Chest' checked={selectedMuscles.includes('Chest')} />} label='Chest' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Forearms' checked={selectedMuscles.includes('Forearms')} />} label='Forearms' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Glutes' checked={selectedMuscles.includes('Glutes')} />} label='Glutes' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Hamstrings' checked={selectedMuscles.includes('Hamstrings')} />} label='Hamstrings' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Lats' checked={selectedMuscles.includes('Lats')} />} label='Lats' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Lower Back' checked={selectedMuscles.includes('Lower Back')} />} label='Lower Back' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Quadriceps' checked={selectedMuscles.includes('Quadriceps')} />} label='Quadriceps' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Shoulders' checked={selectedMuscles.includes('Shoulders')} />} label='Shoulders' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Traps' checked={selectedMuscles.includes('Traps')} />} label='Traps' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Triceps' checked={selectedMuscles.includes('Triceps')} />} label='Triceps' />
                <FormControlLabel control={<Checkbox onChange={handleChange} sx={{ color: 'white' }} value='Upper Back' checked={selectedMuscles.includes('Upper Back')} />} label='Upper Back' />
            </FormGroup>
            <Button variant='contained' onClick={closeFilter}>Apply</Button>
        </div>
    )
}