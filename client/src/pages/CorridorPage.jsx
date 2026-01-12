import React from "react";
import CorridorList from "../components/lists/CorridorList";
import CorridorForm from "../components/forms/CorridorForm";

function CorridorsPage() {
    const [refresh, setRefresh] = React.useState(false);

    const handleCorridorCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <CorridorList key={refresh} />
             <CorridorForm onCorridorCreated={handleCorridorCreated} />
        </div>
    );
}

export default CorridorsPage;