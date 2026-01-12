import React, { useEffect, useState } from "react";
import RateCard from "../cards/RateCard";

function RateList() {
    const [rates, setRates] = useState([]);
    const [corridors, setCorridors] = useState([]); // To get corridor info
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch both rates and corridors
            const [ratesRes, corridorsRes] = await Promise.all([
                fetch("https://remittance-corridor-engine.onrender.com/rates"),
                fetch("https://remittance-corridor-engine.onrender.com/corridors")
            ]);

            if (!ratesRes.ok || !corridorsRes.ok) {
                throw new Error("Failed to fetch data");
            }

            const ratesData = await ratesRes.json();
            const corridorsData = await corridorsRes.json();

            // Add corridor info to rates
            const ratesWithInfo = ratesData.map(rate => ({
                ...rate,
                corridor_info: getCorridorInfo(corridorsData, rate.corridor_id)
            }));

            setRates(ratesWithInfo);
            setCorridors(corridorsData);
            setLoading(false);
            
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.log("Fetch error", err);
        }
    };

    // Helper to get corridor info by ID
    const getCorridorInfo = (corridorsList, corridorId) => {
        const corridor = corridorsList.find(c => c.id === corridorId);
        return corridor ? `Corridor ${corridor.id} (${corridor.from_country} → ${corridor.to_country})` 
                       : `Corridor ${corridorId}`;
    };

    // Delete function
    const handleDelete = async (rateId) => {
        if (!window.confirm("Are you sure you want to delete this rate?")) {
            return;
        }

        try {
            const response = await fetch(`https://remittance-corridor-engine.onrender.com/rates/${rateId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete rate");
            }

            // Remove from local state
            setRates(rates.filter(rate => rate.id !== rateId));
            alert("Rate deleted successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // Edit function
    const handleEdit = async (rate) => {
        // Get list of corridor IDs for dropdown
        const corridorOptions = corridors.map(c => `${c.id}: Country ${c.from_country} → ${c.to_country}`).join("\n");
        
        const newRateValue = prompt(
            `Enter new exchange rate:`,
            rate.rate
        );
        if (newRateValue === null) return;

        const newCorridorId = prompt(
            `Enter new corridor ID:\n\nAvailable corridors:\n${corridorOptions}`,
            rate.corridor_id
        );
        if (newCorridorId === null) return;

        // Validate inputs
        const rateNumber = parseFloat(newRateValue);
        if (isNaN(rateNumber) || rateNumber <= 0) {
            alert("Please enter a valid positive number for rate");
            return;
        }

        if (!newCorridorId.trim()) {
            alert("Corridor ID is required!");
            return;
        }

        try {
            const response = await fetch(`https://remittance-corridor-engine.onrender.com/rates/${rate.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rate: rateNumber,
                    corridor_id: parseInt(newCorridorId)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update rate");
            }

            const updatedRate = await response.json();
            
            // Update in local state with corridor info
            const updatedWithInfo = {
                ...updatedRate,
                corridor_info: getCorridorInfo(corridors, updatedRate.corridor_id)
            };
            
            setRates(rates.map(r => 
                r.id === rate.id ? updatedWithInfo : r
            ));
            
            alert("Rate updated successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) return <div>Loading rates...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="rate-heading">
                List of Exchange Rates ({rates.length})
                <button 
                    onClick={fetchData}
                    style={{
                        marginLeft: "15px",
                        padding: "5px 10px",
                        fontSize: "0.8em"
                    }}
                >
                    🔄 Refresh
                </button>
            </h1>
            
            <div className="rate-list">
                {rates.length === 0 ? (
                    <p>No rates found. Create your first exchange rate!</p>
                ) : (
                    rates.map(rate => (
                        <RateCard 
                            key={rate.id}
                            rate={rate}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default RateList;