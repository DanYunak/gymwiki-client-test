import { Button } from '@mui/material'
import { Form, Input, Select } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import './CreateExercise.scss'
import { musclesOptions } from '../../../shared/model/musclesOptions'
import { equipmentOptions } from '../../../shared/model/equipmentOptions'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Exercises/model/exercisesActions'
import { Close } from '../../../entities/Close/components/Close'
import * as Yup from 'yup'

type PropsType = {
    onSubmit: (formData: any) => void
}

export const CreateExercise: FC<PropsType> = ({ onSubmit }) => {
    const [selectedPrimaryMuscles, setSelectedPrimaryMuscles] = useState<string[]>([])
    const [selectedSecondaryMuscles, setSelectedSecondaryMuscles] = useState<string[]>([])

    const [form] = Form.useForm()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.setEditExerciseWindow(false))
    }, [])

    const handleCloseWindow = () => {
        dispatch(actions.setCreateExerciseWindow(false))
    }

    const handlePrimaryMuscles = (value: string[]) => {
        setSelectedPrimaryMuscles(value)
        setSelectedSecondaryMuscles(prevSelectedSecondaryMuscles => prevSelectedSecondaryMuscles.filter(muscle => !value.includes(muscle)))
    }

    const handleSecondaryMuscles = (value: string[]) => {
        setSelectedSecondaryMuscles(value)
        setSelectedPrimaryMuscles(prevSelectedPrimaryMuscles => prevSelectedPrimaryMuscles.filter(muscle => !value.includes(muscle)))
    }

    const createExerciseSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        primaryMuscles: Yup.array()
            .required('Required'),
        secondaryMuscles: Yup.array()
            .required('Required'),
        equipment: Yup.string()
            .required('Required'),
        img: Yup.string()
            .required('Required'),
    })

    return (
        <div className='create__exercise_window'>
            <Formik initialValues={{ name: '', primaryMuscles: '', secondaryMuscles: '', equipment: '', img: '' }}
                onSubmit={onSubmit}
                validationSchema={createExerciseSchema}
            >
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
                                    onChange={(value) => {
                                        handlePrimaryMuscles(value)
                                        formik.setFieldValue('primaryMuscles', value)
                                    }}
                                    showSearch
                                    value={selectedPrimaryMuscles}
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
                                    onChange={(value) => {
                                        handleSecondaryMuscles(value)
                                        formik.setFieldValue('secondaryMuscles', value)
                                    }}
                                    value={selectedSecondaryMuscles}
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
                            <Form.Item name='img' label='Image'>
                                <Input name='img' placeholder='Image URL' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.img} />
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
        </div >
    )
}