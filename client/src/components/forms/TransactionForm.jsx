import React, { useState, useEffect } from "react";

function TransactionForm({ onTransactionCreated }) {
    const [amountSent, setAmountSent] = useState("");
    const [corridorId, setCorridorId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!amountSent || !corridorId) {
            setError("Enter amount and corridor");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5555/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount_sent: parseFloat(amountSent),
                    amount_received: parseFloat(amountSent) * 1.1, // Simple calculation
                    corridor_id: parseInt(corridorId)
                })
            });

            if (!response.ok) throw new Error("Failed to create transaction");

            const newTransaction = await response.json();
            
            setAmountSent("");
            setCorridorId("");
            
            if (onTransactionCreated) onTransactionCreated(newTransaction);
            
            alert("Transaction created!");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Add Transaction</h3>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount Sent:</label>
                    <input
                        type="number"
                        value={amountSent}
                        onChange={(e) => setAmountSent(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Corridor ID:</label>
                    <input
                        type="number"
                        value={corridorId}
                        onChange={(e) => setCorridorId(e.target.value)}
                        required
                    />
                </div>
                
                {error && <div style={{ color: "red" }}>Error: {error}</div>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Transaction"}
                </button>
            </form>
        </div>
    );
}

export default TransactionForm;