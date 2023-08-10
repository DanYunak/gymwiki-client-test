import { Button } from '@mui/material'
import { Form, Input, InputNumber, Select } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'
import { Close } from '../../../entities/Close/components/Close'
import { categoryOptions } from '../../../entities/Product/model/categoryOptions'
import './CreateProduct.scss'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'

type PropsType = {
    onSubmit: (formData: any) => void
}

export const CreateProduct: FC<PropsType> = ({ onSubmit }) => {
    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    const createProductSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),

        price: Yup.number()
            .min(1, `Price can't be less than 1`)
            .required('Required'),

        category: Yup.string().required('Required'),
        img: Yup.string().required('Required')
    })

    const closeWindow = () => {
        dispatch(actions.setIsCreateWindowOpen(false))
    }

    return (
        <div className='create__product_window'>
            <div onClick={closeWindow}>
                <Close />
            </div>
            <Formik initialValues={{ name: '', price: 1, img: '', category: '' }} onSubmit={onSubmit} validationSchema={createProductSchema}>
                {formik =>
                    <Form style={{ color: '#fff' }} form={form} layout='vertical' onSubmitCapture={formik.handleSubmit}>
                        <div className='name'>
                            <Form.Item name='name' label='Name'>
                                <Input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                                <ErrorMessage name='name' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='price'>
                            <Form.Item name='price' label='Price'>
                                <InputNumber name='price' type='number'
                                    onChange={v => {
                                        if (v !== null && v >= 1) {
                                            formik.setFieldValue('price', v)
                                        } else {
                                            return
                                        }
                                    }
                                    }
                                    onBlur={formik.handleBlur} value={formik.values.price} />
                                    <ErrorMessage name='price' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='category'>
                            <Form.Item name='category' label='Category'>
                                <Select onChange={v => formik.setFieldValue('category', v)}
                                    showSearch
                                    value={formik.values.category}
                                    placeholder='Select a category'
                                    optionFilterProp='children'
                                    style={{ width: 200 }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={categoryOptions}
                                />
                                <ErrorMessage name='category' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='image'>
                            <Form.Item name='image' label='Image'>
                                <Input name='img' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.img} />
                                <ErrorMessage name='img' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='btn__actions'>
                            <Button variant='contained' type='submit'>Save</Button>
                        </div>
                    </Form>}
            </Formik>
        </div>
    )
}