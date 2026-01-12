import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup({ setUser }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("https://remittance-corridor-engine.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            navigate("/countries");
        } else {
            alert("Signup failed");
        }
    };

    const handleSkip = () => {
        const demoUser = {
            id: 1,
            first_name: "Demo",
            last_name: "User",
            email: "demo@test.com",
            created_at: new Date().toISOString()
        };
        
        localStorage.setItem("user", JSON.stringify(demoUser));
        setUser(demoUser);
        navigate("/countries");
    };

    return (
        <div>
            <h1>Sign Up</h1>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Last Name:</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                
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
                
                <button type="submit">Sign Up</button>
            </form>
            
            <p><Link to="/login">Login instead</Link></p>
            
            <button onClick={handleSkip}>
                Skip Signup (Demo)
            </button>
        </div>
    );
}

export default Signup;