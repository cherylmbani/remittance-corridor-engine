import React, { useState, useEffect } from "react";

function RateForm({ onRateCreated }) {
    const [rate, setRate] = useState("");
    const [corridorId, setCorridorId] = useState("");
    const [corridors, setCorridors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://remittance-corridor-engine.onrender.com/corridors")
            .then(res => res.json())
            .then(setCorridors)
            .catch(err => setError("Failed to load corridors"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!rate || !corridorId) {
            setError("Enter rate and select corridor");
            setLoading(false);
            return;
        }

        const rateNum = parseFloat(rate);
        if (isNaN(rateNum) || rateNum <= 0) {
            setError("Rate must be a positive number");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://remittance-corridor-engine.onrender.com/rates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rate: rateNum,
                    corridor_id: parseInt(corridorId)
                })
            });

            if (!response.ok) throw new Error("Failed to create rate");

            const newRate = await response.json();
            
            setRate("");
            setCorridorId("");
            
            if (onRateCreated) onRateCreated(newRate);
            
            alert("Rate created!");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Add New Exchange Rate</h3>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Exchange Rate:</label>
                    <input
                        type="number"
                        step="0.0001"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g., 0.85"
                        required
                    />
                </div>
                
                <div>
                    <label>For Corridor:</label>
                    <select
                        value={corridorId}
                        onChange={(e) => setCorridorId(e.target.value)}
                        required
                    >
                        <option value="">Select a corridor</option>
                        {corridors.map(corridor => (
                            <option key={corridor.id} value={corridor.id}>
                                Corridor {corridor.id} (Country {corridor.from_country} → {corridor.to_country})
                            </option>
                        ))}
                    </select>
                </div>
                
                {error && <div style={{ color: "red" }}>Error: {error}</div>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Rate"}
                </button>
            </form>
        </div>
    );
}

export default RateForm;