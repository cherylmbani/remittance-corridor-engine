import React, {useEffect, useState} from "react";
import CountryCard from "../cards/CountryCard";

function CountryList(){
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch countries on component mount
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        setLoading(true);
        fetch("http://127.0.0.1:5555/countries")
        .then(res => res.json())
        .then(data => {
            setCountries(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
            console.log("Fetch error", err);
        });
    };

    // Delete function
    const handleDelete = async (countryId) => {
        if (!window.confirm("Are you sure you want to delete this country?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5555/countries/${countryId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete country");
            }

            // Remove from local state
            setCountries(countries.filter(country => country.id !== countryId));
            alert("Country deleted successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // Edit function - NOW WITH PROMPTS!
    const handleEdit = async (country) => {
        const newName = prompt("Enter new country name:", country.name);
        if (newName === null) return; // User cancelled
        
        const newCode = prompt("Enter new country code:", country.code);
        if (newCode === null) return; // User cancelled

        if (!newName.trim() || !newCode.trim()) {
            alert("Name and code are required!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5555/countries/${country.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newName,
                    code: newCode.toUpperCase()
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update country");
            }

            const updatedCountry = await response.json();
            
            // Update in local state
            setCountries(countries.map(c => 
                c.id === country.id ? updatedCountry : c
            ));
            
            alert("Country updated successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) return <div>Loading countries...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="country-heading">
                List of Countries ({countries.length})
                <button 
                    onClick={fetchCountries}
                    style={{
                        marginLeft: "15px",
                        padding: "5px 10px",
                        fontSize: "0.8em"
                    }}
                >
                    Refresh
                </button>
            </h1>
            
            <div className="country-list">
                {countries.length === 0 ? (
                    <p>No countries found. Add your first country!</p>
                ) : (
                    countries.map(country => (
                        <CountryCard 
                            key={country.id}
                            country={country}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default CountryList;