import React, { useEffect, useState } from "react";

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/transactions")
            .then(res => res.json())
            .then(data => {
                setTransactions(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
                console.log("Fetch error", err);
            });
    }, []);

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="transaction-heading">Transaction History ({transactions.length})</h1>
            <ul className="transaction-list">
                {transactions.map(transaction => (
                    <li key={transaction.id} className="transaction-item">
                        Sent: ${transaction.amount_sent} → Received: ${transaction.amount_received} 
                        (Corridor: {transaction.corridor_id})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionList;