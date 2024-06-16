import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import RegisterPage from '../pages/RegisterPage'

function AppRouter() {
  return (
    <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} path='/dashboard'/>} />
        <Route path='/' element={<LoginPage />}/>
    </Routes>
  )
}

export default AppRouter