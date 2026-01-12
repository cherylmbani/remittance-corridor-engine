import React, { useState } from "react";

function CountryForm({ onCountryCreated }) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://127.0.0.1:5555/countries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: name.trim(), 
                    code: code.trim().toUpperCase() 
                })
            });

            if (!response.ok) throw new Error("Failed to create country");

            const newCountry = await response.json();
            
            setName("");
            setCode("");
            
            if (onCountryCreated) onCountryCreated(newCountry);
            
            alert("Country created!");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Add New Country</h3>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Code:</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength="3"
                        required
                    />
                </div>
                
                {error && <div style={{ color: "red" }}>Error: {error}</div>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Country"}
                </button>
            </form>
        </div>
    );
}

export default CountryForm;