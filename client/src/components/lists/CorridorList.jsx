import React, { useEffect, useState } from "react";

function CorridorList() {
    const [corridors, setCorridors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/corridors")
            .then(res => res.json())
            .then(data => {
                setCorridors(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
                console.log("Fetch error", err);
            });
    }, []);

    if (loading) return <div>Loading corridors...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="corridor-heading">List of Corridors ({corridors.length})</h1>
            <ul className="corridor-list">
                {corridors.map(corridor => (
                    <li key={corridor.id} className="corridor-item">
                        From Country: {corridor.from_country} → To Country: {corridor.to_country}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CorridorList;