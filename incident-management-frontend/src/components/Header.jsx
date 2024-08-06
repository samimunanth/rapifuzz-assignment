// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-light py-3">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="text-center">                       
                        <div className="btn-group mt-3">
                            <Link to="/login" className="btn btn-outline-primary">Login</Link>
                            <Link to="/register" className="btn btn-outline-primary">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
