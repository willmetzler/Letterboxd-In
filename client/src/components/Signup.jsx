import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

function Signup({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, first_name: firstName, last_name: lastName })
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                setUser(data);
                onLogin(data);
            } else {
                console.error('Sign-up failed');
            }
        });
    };

    return (
        <>
        <h4 style={{color: '#43bbf3'}}>Create an account:</h4>
        <form onSubmit={handleSubmit}>
            <input className='user-input' placeholder='Username...' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <input className='user-input' placeholder='Password...' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <input className='user-input' placeholder='First Name...' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <br></br>
            <br></br>
            <input className='user-input' placeholder='Last Name...' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <br></br>
            <br></br>
            <button className='user-button' type="submit">Sign Up</button>
        </form>
        </>
    );
}

export default Signup;

