import { CircularProgress } from '@mui/material'
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { LoginWindow } from '../../features/AuthWindow/components/LoginWindow'
import { RegistrationWindow } from '../../features/AuthWindow/components/RegistrationWindow'
import { actions } from '../../features/User/model/userActions'
import { ExercisesPage } from '../../pages/Exercises/components/ExercisesPage'
import { ProductsPage } from '../../pages/Products/components/ProductsPage'
import { useAppDispatch } from '../../redux/store'
import { Header } from '../../widgets/Header'
import { getIsLoading, getIsLoginWindowOpen, getIsRegistrationWindowOpen } from '../model/appSelectors'
import './App.scss'
import { getAllProducts } from '../../widgets/Products/model/productsSelectors';
import {actions as appActions} from '../../app/model/appActions'

export const App = () => {
  const dispatch = useAppDispatch()

  const isLoginWindowOpen = useSelector(getIsLoginWindowOpen)
  const isRegistrationWindowOpen = useSelector(getIsRegistrationWindowOpen)
  const isLoading = useSelector(getIsLoading)
  const products = useSelector(getAllProducts)

  const onSubmitLogin = (formData: any) => {
    dispatch(actions.login(formData))
  }

  const onSubmitRegistration = (formData: any) => {
    dispatch(actions.register(formData))
  }

  useEffect(() => {
    if (products.length === 0) {
      dispatch(appActions.setIsLoading(true))
    } else {
      dispatch(appActions.setIsLoading(false))
    }
  }, [products])  

  return (
    <div className='app__container'>
      <div className='app'>
        {isLoading &&
          <div className='loading'>
            <CircularProgress />
          </div>
        }
        {isLoginWindowOpen && <LoginWindow onSubmit={onSubmitLogin} />}
        {isRegistrationWindowOpen && <RegistrationWindow onSubmit={onSubmitRegistration} />}
        <Header />
        <Routes>
          <Route path='/exercises' element={<ExercisesPage />} />
          <Route path='/' element={<ProductsPage />} />
        </Routes>
      </div>
    </div>
  )
}