import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div>
            <nav>
                <h1>💰 Remittance Engine</h1>
                
                {user ? (
                    <div>
                        <span>Welcome, {user.first_name || user.name}!</span>
                        
                        <div>
                            <NavLink to="/countries">Countries</NavLink>
                            <NavLink to="/corridors">Corridors</NavLink>
                            <NavLink to="/rates">Rates</NavLink>
                            <NavLink to="/transactions">Transactions</NavLink>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default NavBar;