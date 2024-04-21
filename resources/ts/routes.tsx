import { createBrowserRouter, redirect } from 'react-router-dom'
import { useAuthUser } from '@/hooks/useAuth'
import TopPage from '@/pages/Top'
import LoginPage from '@/pages/Login'
import UserPage from '@/pages/UserPage';

/**
 * ログイン済みのみアクセス可能
 */
const guardLoader = async () => {
    const user = await useAuthUser()
    return true;
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
        element: <TopPage />, // Top page, accessible to everyone
    },
    {
        path: 'login',
        element: <LoginPage />,
        loader: guestLoader
    }, {
        path: 'user',
        element: <UserPage />,
        loader: guardLoader
    }
])
