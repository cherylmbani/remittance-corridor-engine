import React from "react";
import RateList from "../components/lists/RateList";
import RateForm from "../components/forms/RateForm";

function RatesPage() {
    const [refresh, setRefresh] = React.useState(false);

    const handleRateCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <RateList key={refresh} />
            <RateForm onRateCreated={handleRateCreated} />
        </div>
    );
}

export default RatesPage;