import React, { useState } from 'react';

function Signup({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
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
        fetch('/api/users', {
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
            <h3>Sign Up</h3>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
