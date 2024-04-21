import { createBrowserRouter, redirect } from 'react-router-dom'
import { useAuthUser } from '@/hooks/useAuth'
import DashboardPage from '@/pages/Dashboard'
import LoginPage from '@/pages/Login'

/**
 * ログイン済みのみアクセス可能
 */
const guardLoader = async () => {
    const user = await useAuthUser()
    return user ? true : redirect('/login')
}

/**
 * ログインしていない場合のみアクセス可能
 */
const guestLoader = async () => {
    const user = await useAuthUser()
    return user ? redirect('/') : true
}

export const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />,
      //  loader: guestLoader
    }, {
        path: '/',
        element: <DashboardPage />,
      //  loader: guardLoader
    }
])
