import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user details from localStorage
        localStorage.removeItem('user');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="text-center mt-4">
            <h2>Are you sure you want to logout?</h2>
            <Button variant="danger" onClick={handleLogout} className="mt-3">
                Logout
            </Button>
        </div>
    );
};

export default Logout;
