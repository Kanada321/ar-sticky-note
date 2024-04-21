import React from 'react';
import {useLogout} from "@/hooks/useAuth";

const UserPage: React.FC = () => {

    const logout = useLogout()

    const onLogout = () => {
        logout.mutate()
    }

    return (
        <div>
            <h1>User Page</h1>
            <p>This is a page only for logged-in users.</p>
            <button type="button" onClick={onLogout}>ログアウト</button>
        </div>
    );
}

export default UserPage;
