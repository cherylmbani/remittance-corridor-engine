import React, { useEffect, useState } from "react";
import CorridorCard from "../cards/CorridorCard";

function CorridorList() {
    const [corridors, setCorridors] = useState([]);
    const [countries, setCountries] = useState([]); // To get country names
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch both corridors and countries
            const [corridorsRes, countriesRes] = await Promise.all([
                fetch("http://127.0.0.1:5555/corridors"),
                fetch("http://127.0.0.1:5555/countries")
            ]);

            if (!corridorsRes.ok || !countriesRes.ok) {
                throw new Error("Failed to fetch data");
            }

            const corridorsData = await corridorsRes.json();
            const countriesData = await countriesRes.json();

            // Add country names to corridors
            const corridorsWithNames = corridorsData.map(corridor => ({
                ...corridor,
                from_country_name: getCountryName(countriesData, corridor.from_country),
                to_country_name: getCountryName(countriesData, corridor.to_country)
            }));

            setCorridors(corridorsWithNames);
            setCountries(countriesData);
            setLoading(false);
            
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.log("Fetch error", err);
        }
    };

    // Helper to get country name by ID
    const getCountryName = (countriesList, countryId) => {
        const country = countriesList.find(c => c.id === countryId);
        return country ? country.name : `Country ${countryId}`;
    };

    // Delete function
    const handleDelete = async (corridorId) => {
        if (!window.confirm("Are you sure you want to delete this corridor?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5555/corridors/${corridorId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete corridor");
            }

            // Remove from local state
            setCorridors(corridors.filter(corridor => corridor.id !== corridorId));
            alert("Corridor deleted successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // Edit function
    const handleEdit = async (corridor) => {
        // Get list of country IDs for dropdown
        const countryOptions = countries.map(c => `${c.id}: ${c.name}`).join("\n");
        
        const newFromCountry = prompt(
            `Enter new FROM country ID:\n\nAvailable countries:\n${countryOptions}`,
            corridor.from_country
        );
        if (newFromCountry === null) return;

        const newToCountry = prompt(
            `Enter new TO country ID:\n\nAvailable countries:\n${countryOptions}`,
            corridor.to_country
        );
        if (newToCountry === null) return;

        if (!newFromCountry.trim() || !newToCountry.trim()) {
            alert("Both country IDs are required!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5555/corridors/${corridor.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from_country: parseInt(newFromCountry),
                    to_country: parseInt(newToCountry)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update corridor");
            }

            const updatedCorridor = await response.json();
            
            // Update in local state with country names
            const updatedWithNames = {
                ...updatedCorridor,
                from_country_name: getCountryName(countries, updatedCorridor.from_country),
                to_country_name: getCountryName(countries, updatedCorridor.to_country)
            };
            
            setCorridors(corridors.map(c => 
                c.id === corridor.id ? updatedWithNames : c
            ));
            
            alert("Corridor updated successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) return <div>Loading corridors...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="corridor-heading">
                List of Corridors ({corridors.length})
                <button 
                    onClick={fetchData}
                    style={{
                        marginLeft: "15px",
                        padding: "5px 10px",
                        fontSize: "0.8em"
                    }}
                >
                    Refresh
                </button>
            </h1>
            
            <div className="corridor-list">
                {corridors.length === 0 ? (
                    <p>No corridors found. Create your first corridor!</p>
                ) : (
                    corridors.map(corridor => (
                        <CorridorCard 
                            key={corridor.id}
                            corridor={corridor}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default CorridorList;