import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Top</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/user">User</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
