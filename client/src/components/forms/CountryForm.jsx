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

        // Validation
        if (!name.trim() || !code.trim()) {
            setError("Name and code are required");
            setLoading(false);
            return;
        }

        if (code.length > 3) {
            setError("Country code should be 2-3 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5555/countries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim(),
                    code: code.trim().toUpperCase()
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create country");
            }

            const newCountry = await response.json();
            
            // Clear form
            setName("");
            setCode("");
            
            // Notify parent
            if (onCountryCreated) {
                onCountryCreated(newCountry);
            }
            
            alert("Country created successfully!");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            background: "#f9f9f9"
        }}>
            <h3>Add New Country</h3>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Country Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Rwanda"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Country Code:
                    </label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g., RW"
                        maxLength="3"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                        required
                    />
                </div>
                
                {error && (
                    <div style={{
                        color: "red",
                        marginBottom: "15px",
                        padding: "10px",
                        background: "#ffe6e6",
                        borderRadius: "4px"
                    }}>
                        Error: {error}
                    </div>
                )}
                
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        background: loading ? "#ccc" : "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontSize: "16px"
                    }}
                >
                    {loading ? "Creating..." : "Create Country"}
                </button>
            </form>
        </div>
    );
}

export default CountryForm;