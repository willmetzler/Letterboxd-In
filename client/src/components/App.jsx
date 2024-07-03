import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { UserProvider } from './UserContext';

function App() {
    return (
        <UserProvider>
            <div>
                <Navbar />
                <div className="main-header">
                    <img id="main-logo" width={170} height={170} src="src/assets/letterboxdinlogofinal.png" />
                    <h1 id="main-title">Letterboxd In</h1>
                </div>
                <Outlet />
            </div>
        </UserProvider>
    );
}

export default App;

