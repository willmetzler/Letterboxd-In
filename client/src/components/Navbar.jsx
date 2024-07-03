import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Navbar() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        fetch('/api/logout', {
            method: 'DELETE'
        }).then(() => {
            setUser(null);
        });
    };

    return (
        <div>
            <Link className='navbar' to="/">Home</Link>
            &nbsp; &nbsp;
            <Link className='navbar' to="/about">About</Link>
            &nbsp; &nbsp;
            <Link className='navbar' to="/diary">Movie Diary</Link>
            &nbsp; &nbsp;
            <Link className='navbar' to="/watchlist">Watchlist</Link>
            &nbsp; &nbsp;
            <Link className='navbar' to="/contact">Contact</Link>
            &nbsp; &nbsp;
            {user ? (
                <Link className='navbar' onClick={handleLogout}>Log out</Link>
            ) : null}
        </div>
    );
}

export default Navbar;

