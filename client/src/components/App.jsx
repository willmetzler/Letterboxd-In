import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/get-session')
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setUser(data);
                }
            });
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        fetch('/api/logout', {
            method: 'DELETE'
        })
        .then(() => {
            setUser(null);
        });
    };

    return (
        <div>
            <Navbar user={user} onLogout={handleLogout} />
            <div className="main-header">
                <img id="main-logo" width={170} height={170} src="src/assets/letterboxdinlogofinal.png" />
                <h1 id="main-title">Letterboxd In</h1>
            </div>
            <Outlet context={{ user, handleLogin, handleLogout }} />
        </div>
    );
}

export default App;
