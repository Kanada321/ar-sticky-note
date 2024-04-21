import React from 'react';
import {useLogout} from "@/hooks/useAuth";

const UserPage: React.FC = () => {

    console.log("UserPage１");
    const logout = useLogout()

    const onLogout = () => {
        logout.mutate()
    }

    console.log("UserPage２");
    return (
        <div>
            <h1>User Page</h1>
            <p>This is a page only for logged-in users.</p>
            <button type="button" onClick={onLogout}>ログアウト</button>
        </div>
    );
}

export default UserPage;
