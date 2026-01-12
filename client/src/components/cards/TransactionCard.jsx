import React, { useState } from "react";

function TransactionCard({ transaction, onDelete, onEdit }) {
    const [showDetails, setShowDetails] = useState(false);

    // Calculate exchange rate from amounts
    const exchangeRate = transaction.amount_sent > 0 
        ? (transaction.amount_received / transaction.amount_sent).toFixed(4)
        : "N/A";

    return (
        <div className="transaction-card" style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            margin: "10px 0",
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            
            <div 
                style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                }}
                onClick={() => setShowDetails(!showDetails)}
            >
                <div>
                    <h3 style={{ margin: 0 }}>Transaction #{transaction.id}</h3>
                    <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                        ${transaction.amount_sent} → ${transaction.amount_received}
                    </p>
                </div>
                <div>
                    <span style={{ color: "#999" }}>
                        {showDetails ? "▲" : "▼"} Click for {showDetails ? "less" : "more"}
                    </span>
                </div>
            </div>

            {/* Details - Expandable */}
            {showDetails && (
                <div style={{ 
                    marginTop: "15px", 
                    paddingTop: "15px", 
                    borderTop: "1px solid #eee" 
                }}>
                    {/* All details here */}
                    <div style={{ marginBottom: "15px" }}>
                        <p><strong>ID:</strong> {transaction.id}</p>
                        <p><strong>Amount Sent:</strong> ${transaction.amount_sent}</p>
                        <p><strong>Amount Received:</strong> ${transaction.amount_received}</p>
                        <p><strong>Exchange Rate:</strong> {exchangeRate}</p>
                        <p><strong>Corridor ID:</strong> {transaction.corridor_id}</p>
                        
                        {/* Display corridor info if available */}
                        {transaction.corridor_info && (
                            <p><strong>Corridor:</strong> {transaction.corridor_info}</p>
                        )}
                        
                        {/* Display transaction date */}
                        {transaction.transaction_date && (
                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(transaction.transaction_date).toLocaleString()}
                            </p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div style={{ 
                        display: "flex", 
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}>
                        <button
                            onClick={() => onEdit(transaction)}
                            style={{
                                padding: "8px 16px",
                                background: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Edit
                        </button>
                        
                        <button
                            onClick={() => {
                                if (window.confirm(`Delete Transaction #${transaction.id}?`)) {
                                    onDelete(transaction.id);
                                }
                            }}
                            style={{
                                padding: "8px 16px",
                                background: "#f44336",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TransactionCard;