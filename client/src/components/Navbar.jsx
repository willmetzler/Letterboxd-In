import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
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
                <Link className='navbar' onClick={onLogout}>Log out</Link>
            ) : null}
        </div>
    );
}

export default Navbar;
