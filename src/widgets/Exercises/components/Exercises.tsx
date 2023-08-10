import FilterAlt from '@mui/icons-material/FilterAlt'
import { Button, Pagination } from '@mui/material'
import { message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Exercise } from '../../../entities/Exercise'
import { ExerciseType } from '../../../entities/Exercise/model/types'
import { CreateExercise } from '../../../features/CreateExercise'
import { DeleteExercise } from '../../../features/DeleteExercise/components/DeleteExercise'
import { EditExercise } from '../../../features/EditExercise'
import { FilterExercises } from '../../../features/FilterExercises'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../model/exercisesActions'
import { getAllExercises, getCreateExerciseWindow, getDeleteExerciseWindow, getEditExerciseWindow, getIsFilterMusclesOpen } from '../model/exercisesSelectors'
import { FormDataType } from '../types'
import './Exercises.scss'
import { FilterExercisesWindow } from '../../../features/FilterExercisesWindow/components/FilterExercisesWindow';


export const Exercises: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
    const [editedExercise, setEditedExercise] = useState<ExerciseType | null>(null)
    const [deletedExercise, setDeletedExercise] = useState<ExerciseType | null>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.getAllExercises())
    }, [])

    useEffect(() => {
        return () => {
            setSelectedMuscles([])
        }
    }, [])

    const exercises = useSelector(getAllExercises)
    const createExerciseWindow = useSelector(getCreateExerciseWindow)
    const editExerciseWindow = useSelector(getEditExerciseWindow)
    const deleteExerciseWindow = useSelector(getDeleteExerciseWindow)
    const isFilterMusclesOpen = useSelector(getIsFilterMusclesOpen)

    const handleFilterMuscles = (value: string, checked: boolean) => {
        if (checked) {
            setSelectedMuscles([...selectedMuscles, value])
        } else {
            setSelectedMuscles(selectedMuscles.filter(muscle => muscle !== value))
        }
        setCurrentPage(1)
    }


    const handleCreateExercise = () => {
        dispatch(actions.setCreateExerciseWindow(!createExerciseWindow))
    }

    const onSubmitCreate = (formData: FormDataType) => {
        try {
            dispatch(actions.createExercise(formData))
            message.success('Exercise successfully created')
        } catch (e) {
            console.error(e)
        }
    }

    const onSubmitEdit = (formData: FormDataType) => {
        try {
            if (editedExercise) {
                dispatch(actions.editExercise(formData, editedExercise._id))
                message.success('Exercise successfully edited')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const onSubmitDelete = () => {
        try {
            if (deletedExercise) {
                dispatch(actions.deleteExercise(deletedExercise._id))
                message.success('Exercise successfully deleted')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleEditExercise = (exercise: ExerciseType) => {
        setEditedExercise(exercise)
        dispatch(actions.setEditExerciseWindow(!editExerciseWindow))
    }

    const handleDeleteExercise = (exercise: ExerciseType) => {
        setDeletedExercise(exercise)
        dispatch(actions.setDeleteExerciseWindow(!deleteExerciseWindow))
    }

    const openFilter = () => {
        dispatch(actions.isFilterMusclesOpen(true))
    }

    const exercisesPerPage = 12

    const indexOfLastExercise = currentPage * exercisesPerPage
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage

    const filteredExercises = exercises.filter(exercise => selectedMuscles.length === 0 || exercise.primaryMuscles.some(muscle => selectedMuscles.includes(muscle)))

    const filteredExercisesCount = filteredExercises.length

    const pageCount = Math.ceil(filteredExercisesCount / exercisesPerPage)
    
    const currentExercises = filteredExercises.slice(
        (currentPage - 1) * exercisesPerPage,
        currentPage * exercisesPerPage
    );

    return (
        <div className='exercises'>
            <div className='filter__exercises'>
                <FilterExercises handleFilter={handleFilterMuscles} selectedMuscles={selectedMuscles} />
            </div>
            <div className='exercises__list'>
                {currentExercises
                    .filter((exercise: ExerciseType) => selectedMuscles.length === 0 || exercise.primaryMuscles.some(muscle => selectedMuscles.includes(muscle)))
                    .map((exercise: ExerciseType) => (
                        <Exercise
                            key={exercise._id}
                            exercise={exercise}
                            handleEditExercise={handleEditExercise}
                            handleDeleteExercise={handleDeleteExercise}
                        />
                    ))}
            </div>
            <div className='pagination'>
                <Pagination count={pageCount}
                    color='primary'
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </div>
            <div className='create__exercise'>
                <Button variant='contained' onClick={handleCreateExercise}>Create</Button>
            </div>
            <div className='open__filter_exercises'>
                <Button variant='contained' size='large' onClick={openFilter}>
                    <FilterAlt />
                </Button>
            </div>
            {createExerciseWindow &&
                <CreateExercise onSubmit={onSubmitCreate} />
            }
            {editExerciseWindow &&
                <EditExercise onSubmit={onSubmitEdit} exercise={editedExercise} />
            }
            {deleteExerciseWindow &&
                <DeleteExercise onSubmit={onSubmitDelete} exercise={deletedExercise} />
            }
            {isFilterMusclesOpen &&
                <div className='filter__exercises_window'>
                    <FilterExercisesWindow handleFilter={handleFilterMuscles} selectedMuscles={selectedMuscles} />
                </div>
            }
        </div>
    )
}