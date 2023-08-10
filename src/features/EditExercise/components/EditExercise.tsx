import { Button } from '@mui/material'
import { Form, Input, Select } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { FC, useEffect } from 'react'
import { Close } from '../../../entities/Close/components/Close'
import { ExerciseType } from '../../../entities/Exercise/model/types'
import { useAppDispatch } from '../../../redux/store'
import { equipmentOptions } from '../../../shared/model/equipmentOptions'
import { musclesOptions } from '../../../shared/model/musclesOptions'
import { actions } from '../../../widgets/Exercises/model/exercisesActions'
import * as Yup from 'yup'
import './EditExercise.scss'

type PropsType = {
    onSubmit: (formData: any) => void
    exercise: ExerciseType | null
}

export const EditExercise: FC<PropsType> = ({ onSubmit, exercise }) => {
    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(actions.setCreateExerciseWindow(false))
    }, [])

    const handleCloseWindow = () => {
        dispatch(actions.setEditExerciseWindow(false))
    }

    const editExerciseSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(30, 'Too Long!'),
        primaryMuscles: Yup.array()
            .required('Required'),
        equipment: Yup.string()
            .required('Required'),
        img: Yup.string()
            .required('Required'),
    })

    return (
        <div className='edit__exercise_window'>
            <Formik initialValues={{ name: exercise?.name, primaryMuscles: exercise?.primaryMuscles, secondaryMuscles: exercise?.secondaryMuscles, equipment: exercise?.equipment, img: exercise?.img }}
                onSubmit={onSubmit} validationSchema={editExerciseSchema}>
                {formik =>
                    <Form style={{ color: '#fff' }} form={form} layout='vertical' onSubmitCapture={formik.handleSubmit}>
                        <div className='name'>
                            <Form.Item name='name' label='Name'>
                                <Input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                                <ErrorMessage name='name' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='primary__muscles'>
                            <Form.Item name='primaryMuscles' label='Primary Muscles'>
                                <Select
                                    mode='multiple'
                                    defaultValue={exercise?.primaryMuscles}
                                    onChange={(value) => formik.setFieldValue('primaryMuscles', value)}
                                    showSearch
                                    optionFilterProp='children'
                                    style={{ width: 200 }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={musclesOptions}
                                />
                                <ErrorMessage name='primaryMuscles' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='secondary__muscles'>
                            <Form.Item name='secondaryMuscles' label='Secondary Muscles'>
                                <Select
                                    mode='multiple'
                                    defaultValue={exercise?.secondaryMuscles}
                                    onChange={(value) => {
                                        formik.setFieldValue('secondaryMuscles', value)
                                    }}
                                    showSearch
                                    optionFilterProp='children'
                                    style={{ width: 200 }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={musclesOptions}
                                />
                                <ErrorMessage name='secondaryMuscles' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='equipment'>
                            <Form.Item name='equipment' label='Equipment'>
                                <Select
                                    defaultValue={exercise?.equipment}
                                    onChange={(value) => formik.setFieldValue('equipment', value)}
                                    showSearch
                                    optionFilterProp='children'
                                    style={{ width: 200 }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={equipmentOptions}
                                />
                                <ErrorMessage name='equipment' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='image'>
                            <Form.Item name='image' label='Image URL'>
                                <Input name='img' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.img} />
                                <ErrorMessage name='img' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='btn__actions'>
                            <Button variant='contained' type='submit'>Save</Button>
                        </div>
                    </Form>}
            </Formik>
            <div onClick={handleCloseWindow}>
                <Close />
            </div>
        </div>
    )
}