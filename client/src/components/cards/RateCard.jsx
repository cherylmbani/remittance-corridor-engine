import React, { useState } from "react";

function RateCard({ rate, onDelete, onEdit }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="rate-card" style={{
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
                    <h3 style={{ margin: 0 }}>Rate #{rate.id}</h3>
                    <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                        Exchange Rate: {rate.rate}
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
                        <p><strong>ID:</strong> {rate.id}</p>
                        <p><strong>Exchange Rate:</strong> {rate.rate}</p>
                        <p><strong>Corridor ID:</strong> {rate.corridor_id}</p>
                        
                        {/* Display corridor info if available */}
                        {rate.corridor_info && (
                            <p><strong>Corridor:</strong> {rate.corridor_info}</p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div style={{ 
                        display: "flex", 
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}>
                        <button
                            onClick={() => onEdit(rate)}
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
                                if (window.confirm(`Delete Rate #${rate.id}?`)) {
                                    onDelete(rate.id);
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

export default RateCard;