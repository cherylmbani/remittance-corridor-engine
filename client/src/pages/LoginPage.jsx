import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5555/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Login failed");
            }

            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/countries");
            
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleDemoAccess = () => {
        // Create a demo user object
        const demoUser = {
            id: 999,
            first_name: "Demo",
            last_name: "User",
            email: "demo@example.com",
            isDemo: true
        };
        
        localStorage.setItem("user", JSON.stringify(demoUser));
        navigate("/countries");
        alert("Entering Demo Mode. All features available!");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
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
                
                {error && <div style={{ color: "red" }}>{error}</div>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            
            {/* Demo Access Button */}
            <div style={{ marginTop: "30px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
                <h3>Quick Access</h3>
                <button onClick={handleDemoAccess}>
                    🚀 Skip Login & Enter Demo Mode
                </button>
                <p style={{ fontSize: "0.9em", color: "#666" }}>
                    (For interview/testing - all features available)
                </p>
            </div>
        </div>
    );
}

export default LoginPage;