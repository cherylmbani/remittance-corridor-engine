import React from "react";
import TransactionList from "../components/lists/TransactionList";
import TransactionForm from "../components/forms/TransactionForm";

function TransactionsPage() {
    const [refresh, setRefresh] = React.useState(false);

    const handleTransactionCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <TransactionList key={refresh} />
            <TransactionForm onTransactionCreated={handleTransactionCreated} />
        </div>
    );
}

export default TransactionsPage;