import { createBrowserRouter, redirect } from 'react-router-dom'
import { useAuthUser } from '@/hooks/useAuth'
import TopPage from '@/pages/Top'
import DashboardPage from '@/pages/Dashboard'
import LoginPage from '@/pages/Login'
import ThreeDObjectPage from '@/pages/3DObjectPage'

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
        path: '/',
        element: <TopPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: guestLoader
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
        loader: guardLoader
    },
    {
        path: '/3d-object',
        element: <ThreeDObjectPage />,
    }
])
