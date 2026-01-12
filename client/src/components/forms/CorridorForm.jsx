import React, { useState, useEffect } from "react";

function CorridorForm({ onCorridorCreated }) {
    const [fromCountry, setFromCountry] = useState("");
    const [toCountry, setToCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/countries")
            .then(res => res.json())
            .then(setCountries)
            .catch(err => setError("Failed to load countries"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!fromCountry || !toCountry) {
            setError("Select both countries");
            setLoading(false);
            return;
        }

        if (fromCountry === toCountry) {
            setError("Countries cannot be same");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5555/corridors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    from_country: parseInt(fromCountry),
                    to_country: parseInt(toCountry)
                })
            });

            if (!response.ok) throw new Error("Failed to create corridor");

            const newCorridor = await response.json();
            
            setFromCountry("");
            setToCountry("");
            
            if (onCorridorCreated) onCorridorCreated(newCorridor);
            
            alert("Corridor created!");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Create New Corridor</h3>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>From Country:</label>
                    <select
                        value={fromCountry}
                        onChange={(e) => setFromCountry(e.target.value)}
                        required
                    >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                            <option key={`from-${country.id}`} value={country.id}>
                                {country.name} ({country.code})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label>To Country:</label>
                    <select
                        value={toCountry}
                        onChange={(e) => setToCountry(e.target.value)}
                        required
                    >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                            <option key={`to-${country.id}`} value={country.id}>
                                {country.name} ({country.code})
                            </option>
                        ))}
                    </select>
                </div>
                
                {error && <div style={{ color: "red" }}>Error: {error}</div>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Corridor"}
                </button>
            </form>
        </div>
    );
}

export default CorridorForm;