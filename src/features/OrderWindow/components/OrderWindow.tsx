import { Button } from '@mui/material'
import { Form, Input, message } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Close } from '../../../entities/Close/components/Close'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'
import './OrderWindow.scss'
import { cartActions } from '../../CartWindow/model/cartActions'

export const OrderWindow = () => {
    const [form] = Form.useForm()

    const dispatch = useAppDispatch()

    const close = () => {
        localStorage.setItem('isOrderWindowOpen', JSON.stringify(false))
        dispatch(actions.setIsOrderWindowOpen(false))
    }

    const onSubmit = () => {
        dispatch(cartActions.clearCart())
        close()
    }

    const orderSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),

        phoneNumber: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),

        email: Yup.string()
            .email('Invalid email')
            .min(2, 'Too Short!')
            .required('Required'),

        city: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),

        postOffice: Yup.string().required('Required'),

    })

    const { TextArea } = Input

    return (
        <div className='order__window'>
            <div onClick={close}>
                <Close />
            </div>
            <Formik initialValues={{ name: '', phoneNumber: '', email: '', city: '', postOffice: '', comment: '' }}
                onSubmit={onSubmit} validationSchema={orderSchema}>
                {formik =>
                    <Form style={{ color: '#fff' }} form={form} layout='vertical' onSubmitCapture={formik.handleSubmit}>
                        <div className='name'>
                            <Form.Item name='name' label='Name'>
                                <Input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                                <ErrorMessage name='name' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='phone__number'>
                            <Form.Item name='phoneNumber' label='Phone number'>
                                <Input name='phoneNumber' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNumber} />
                                <ErrorMessage name='phoneNumber' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='email'>
                            <Form.Item name='email' label='Email'>
                                <Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                <ErrorMessage name='email' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='city'>
                            <Form.Item name='city' label='City'>
                                <Input name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
                                <ErrorMessage name='city' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='post__office'>
                            <Form.Item name='postOffice' label='Post office'>
                                <Input name='postOffice' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.postOffice} />
                                <ErrorMessage name='postOffice' component='div' className='error__message' />
                            </Form.Item>
                        </div>
                        <div className='comment'>
                            <Form.Item name='comment' label='Comment to the order'>
                                <TextArea name='comment' placeholder='Comment' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.comment} />
                            </Form.Item>
                        </div>
                        <div className='btn__actions'>
                            <Button variant='contained' type='submit'>Order</Button>
                        </div>
                    </Form>
                }
            </Formik>
        </div>
    )
}