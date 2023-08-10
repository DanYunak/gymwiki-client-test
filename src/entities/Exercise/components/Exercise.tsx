import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { FC } from 'react'
import { ExerciseType } from '../model/types'
import './Exercise.scss'

type PropsType = {
    exercise: ExerciseType
    handleEditExercise: (exercise: ExerciseType) => void
    handleDeleteExercise: (exercise: ExerciseType) => void
}

export const Exercise: FC<PropsType> = ({ exercise, handleEditExercise, handleDeleteExercise }) => {
    const handleEditClick = () => {
        handleEditExercise(exercise)
    }

    const handleDeleteClick = () => {
        handleDeleteExercise(exercise)
    }

    return (
        <div className='exercise'>
            <div className='exercise__img'>
                <img src={exercise.img} height='130' width='200' />
            </div>
            <div className='exercise__name'>{exercise.name}</div>
            <div className='exercise__info'>
                <div className='exercise__muscle'>Muscle Targeted: {exercise.primaryMuscles.join(', ')}</div>
                <div className='exercise__equipment'>Equipment Type: {exercise.equipment}</div>
            </div>
            <div className='exercise__edit'>
                <ModeEditIcon onClick={handleEditClick} className='exercise__edit_icon' />
            </div>
            <div className='exercise__delete'>
                <DeleteIcon onClick={handleDeleteClick} className='exercise__delete_icon' />
            </div>
        </div>
    )
}   