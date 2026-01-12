import React, {useEffect, useState}from "react";

function CountryList(){
    const [countries, setCountries]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        fetch("http://127.0.0.1:5555/countries")
        .then(res=> res.json())
        .then(data=>{
            setCountries(data)
            setLoading(false)
        })
        .catch(err =>{
            setError(err.message);
            setLoading(false);
            console.log("Fetch error", err)
        })
    }, [])
    if (loading) return <div>Loading countries...</div>;
    if (error) return <div>Error:{error}</div>;

    return(
        <div>
            <h1 className="country-heading">List of Countries {countries.length}</h1>
            <ul className="country-list">
                {countries.map(country =>{
                    return <li key={country.id} className="country-item">{country.name}</li>
                })}
            </ul>
            

        </div>
    )

}
export default CountryList;