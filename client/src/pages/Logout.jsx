import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleCancel = () => {
        navigate("/countries");
    };

    return (
        <div>
            <h1>Logout</h1>
            <p>Are you sure you want to logout?</p>
            
            <div>
                <button onClick={handleLogout}>Yes, Logout</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default LogoutPage;
