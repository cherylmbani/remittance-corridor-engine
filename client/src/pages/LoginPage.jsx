import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const response = await fetch("https://remittance-corridor-engine.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            navigate("/countries");
        } else {
            alert("Login failed");
        }
    };

    const handleSkip = () => {
        const demoUser = {
            id: 1,
            first_name: "Demo",
            email: "demo@test.com"
        };
        
        localStorage.setItem("user", JSON.stringify(demoUser));
        setUser(demoUser);
        navigate("/countries");
    };

    return (
        <div>
            <h1>Login</h1>
            
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Login</button>
            </form>
            
            <p><Link to="/signup">Sign up</Link></p>
            
            <button onClick={handleSkip}>
                Skip Login (Demo)
            </button>
        </div>
    );
}

export default LoginPage;