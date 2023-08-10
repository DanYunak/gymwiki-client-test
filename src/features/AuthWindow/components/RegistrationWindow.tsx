import { FC, useState } from 'react'
import './AuthWindow.scss'
import { Close } from '../../../entities/Close/components/Close'
import { ErrorMessage, Formik } from 'formik'
import { Input } from 'antd'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Button } from '@mui/material'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../redux/store';
import { actions } from '../../../app/model/appActions'

type PropsType = {
    onSubmit: (formData: any) => void
}

export const RegistrationWindow: FC<PropsType> = ({ onSubmit }) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)

    const dispatch = useAppDispatch()

    const handlePasswordVisibility = () => {
        setIsPasswordHidden(!isPasswordHidden)
    }

    const backToLogin = () => {
        dispatch(actions.setIsRegistrationWindowOpen(false))
        dispatch(actions.setIsLoginWindowOpen(true))
    }

    const closeWindow = () => {
        dispatch(actions.setIsRegistrationWindowOpen(false))
    }

    const registrationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .min(2, 'Too Short!')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Too Short!')
            .required('Required')
    })

    return (
        <div className='auth__window'>
            <div onClick={closeWindow}>
                <Close />
            </div>
            <div className='auth__window_header'>
                <h3>Sign Up</h3>
            </div>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={registrationSchema}>
                {formik =>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='email'>
                            <label className='email__label'>Email</label>
                            <Input size='large' type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            <ErrorMessage name='email' component='div' className='error__message' />
                        </div>
                        <div className='password'>
                            <label className='password__label'>Password</label>
                            <Input size='large' name='password' type={isPasswordHidden ? 'password' : 'text'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} value={formik.values.password} />
                            <ErrorMessage name='password' component='div' className='error__message' />
                            {isPasswordHidden
                                ? <VisibilityOffIcon onClick={handlePasswordVisibility} />
                                : <VisibilityIcon onClick={handlePasswordVisibility} />}
                        </div>
                        <div className='btn__actions'>
                            <Button variant='contained' size='large' type='submit'>Sign Up</Button>
                            <Button variant='text' className='btn__register' onClick={backToLogin}>I'm already registered</Button>
                        </div>
                    </form>
                }
            </Formik>
        </div>
    )
}