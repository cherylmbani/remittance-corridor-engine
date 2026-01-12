import React, { useState } from "react";
import CountryList from "../components/lists/CountryList";
import CountryForm from "../components/forms/CountryForm";

function CountriesPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCountryCreated = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="countries-page">
            <CountryList key={refreshKey} />
            <CountryForm onCountryCreated={handleCountryCreated} />
        </div>
    );
}

export default CountriesPage;