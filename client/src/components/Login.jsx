import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                setUser(data);
                onLogin(data);
            } else {
                console.error('Login failed');
            }
        });
    };

    return (
        <>
        <h4 style={{color: '#43bbf3'}}>Log in:</h4>
        <form onSubmit={handleSubmit}>
            <input className='user-input' placeholder='Username...' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <input className='user-input' placeholder='Password...' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button className='user-button' type="submit">Login</button>
        </form>
        </>
    );
}

export default Login;