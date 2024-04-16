import { createBrowserRouter } from 'react-router-dom'
// @ts-ignore
import DashboardPage from '@/pages/Dashboard'
// @ts-ignore
import LoginPage from '@/pages/Login'

export const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />
    }, {
        path: '/',
        element: <DashboardPage />
    }
])
