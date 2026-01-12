import React, { useEffect, useState } from "react";

function RateList() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/rates")
            .then(res => res.json())
            .then(data => {
                setRates(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
                console.log("Fetch error", err);
            });
    }, []);

    if (loading) return <div>Loading rates...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="rate-heading">List of Rates ({rates.length})</h1>
            <ul className="rate-list">
                {rates.map(rate => (
                    <li key={rate.id} className="rate-item">
                        Rate: {rate.rate} (Corridor ID: {rate.corridor_id})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RateList;