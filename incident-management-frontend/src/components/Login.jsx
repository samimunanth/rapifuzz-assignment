// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api-token-auth/', { email: emailOrUsername, password });
            alert('Login successful!');
            // Redirect or update the state as needed
        } catch (error) {
            console.error(error);
            alert('Login failed!');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">                  
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="emailOrUsername" className="form-label">Email or Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="emailOrUsername"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
