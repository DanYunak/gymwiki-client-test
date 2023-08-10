import { Button } from '@mui/material'
import { FC } from 'react'
import { ExerciseType } from '../../../entities/Exercise'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Exercises/model/exercisesActions'
import './DeleteExercise.scss'

type PropsType = {
    onSubmit: () => void
    exercise: ExerciseType | null
}

export const DeleteExercise: FC<PropsType> = ({ onSubmit, exercise }) => {
    const dispatch = useAppDispatch()

    const handleBackClick = () => {
        dispatch(actions.setDeleteExerciseWindow(false))
    }

    return (
        <div className='delete__exercise_window'>
            <span>Are you sure you want to delete this exercise?</span>
            <div className='btn__actions'>
                <Button className='back' variant='contained' color='error' onClick={handleBackClick}>Back</Button>
                <Button className='delete' variant='contained' startIcon={<DeleteIcon />} onClick={onSubmit}>
                    Delete
                </Button>
            </div>
        </div>
    )
}