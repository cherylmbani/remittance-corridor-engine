import React, { useEffect, useState } from "react";
import TransactionCard from "../cards/TransactionCard";

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [corridors, setCorridors] = useState([]); // To get corridor info
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch both transactions and corridors
            const [transactionsRes, corridorsRes] = await Promise.all([
                fetch("http://127.0.0.1:5555/transactions"),
                fetch("http://127.0.0.1:5555/corridors")
            ]);

            if (!transactionsRes.ok || !corridorsRes.ok) {
                throw new Error("Failed to fetch data");
            }

            const transactionsData = await transactionsRes.json();
            const corridorsData = await corridorsRes.json();

            // Add corridor info to transactions
            const transactionsWithInfo = transactionsData.map(transaction => ({
                ...transaction,
                corridor_info: getCorridorInfo(corridorsData, transaction.corridor_id)
            }));

            // Sort by date (newest first)
            transactionsWithInfo.sort((a, b) => 
                new Date(b.transaction_date) - new Date(a.transaction_date)
            );

            setTransactions(transactionsWithInfo);
            setCorridors(corridorsData);
            setLoading(false);
            
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.log("Fetch error", err);
        }
    };

    // Helper to get corridor info by ID
    const getCorridorInfo = (corridorsList, corridorId) => {
        const corridor = corridorsList.find(c => c.id === corridorId);
        return corridor ? `Corridor ${corridor.id} (Country ${corridor.from_country} → ${corridor.to_country})` 
                       : `Corridor ${corridorId}`;
    };

    // Delete function
    const handleDelete = async (transactionId) => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5555/transactions/${transactionId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete transaction");
            }

            // Remove from local state
            setTransactions(transactions.filter(t => t.id !== transactionId));
            alert("Transaction deleted successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    // Edit function
    const handleEdit = async (transaction) => {
        // Get list of corridor IDs for dropdown
        const corridorOptions = corridors.map(c => `${c.id}: Country ${c.from_country} → ${c.to_country}`).join("\n");
        
        const newAmountSent = prompt(
            `Enter new amount sent:`,
            transaction.amount_sent
        );
        if (newAmountSent === null) return;

        const newAmountReceived = prompt(
            `Enter new amount received:`,
            transaction.amount_received
        );
        if (newAmountReceived === null) return;

        const newCorridorId = prompt(
            `Enter new corridor ID:\n\nAvailable corridors:\n${corridorOptions}`,
            transaction.corridor_id
        );
        if (newCorridorId === null) return;

        // Validate inputs
        const amountSentNum = parseFloat(newAmountSent);
        const amountReceivedNum = parseFloat(newAmountReceived);
        
        if (isNaN(amountSentNum) || amountSentNum <= 0) {
            alert("Please enter a valid positive number for amount sent");
            return;
        }

        if (isNaN(amountReceivedNum) || amountReceivedNum <= 0) {
            alert("Please enter a valid positive number for amount received");
            return;
        }

        if (!newCorridorId.trim()) {
            alert("Corridor ID is required!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5555/transactions/${transaction.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount_sent: amountSentNum,
                    amount_received: amountReceivedNum,
                    corridor_id: parseInt(newCorridorId)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update transaction");
            }

            const updatedTransaction = await response.json();
            
            // Update in local state with corridor info
            const updatedWithInfo = {
                ...updatedTransaction,
                corridor_info: getCorridorInfo(corridors, updatedTransaction.corridor_id)
            };
            
            // Update and re-sort
            const updatedTransactions = transactions.map(t => 
                t.id === transaction.id ? updatedWithInfo : t
            );
            
            // Sort by date again
            updatedTransactions.sort((a, b) => 
                new Date(b.transaction_date) - new Date(a.transaction_date)
            );
            
            setTransactions(updatedTransactions);
            alert("Transaction updated successfully!");
            
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="transaction-heading">
                Transaction History ({transactions.length})
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
            
            <div className="transaction-list">
                {transactions.length === 0 ? (
                    <p>No transactions found. Create your first transaction!</p>
                ) : (
                    transactions.map(transaction => (
                        <TransactionCard 
                            key={transaction.id}
                            transaction={transaction}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TransactionList;