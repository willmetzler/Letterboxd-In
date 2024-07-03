import React, { useState } from 'react';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    onLogin(user);
                } else {
                    alert(user.error);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login;
