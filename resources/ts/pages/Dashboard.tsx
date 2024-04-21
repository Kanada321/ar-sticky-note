import React from 'react'
import { useLogout } from '@/hooks/useAuth'

const DashboardPage: React.FC = () => {
    const logout = useLogout()

    const onLogout = () => {
        logout.mutate()
    }

    return (
        <div>
            <h1>ダッシュボード</h1>
            <button type="button" onClick={onLogout}>ログアウト</button>
        </div>
    )
}

export default DashboardPage
