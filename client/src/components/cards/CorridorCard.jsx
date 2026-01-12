import React, { useState } from "react";

function CorridorCard({ corridor, onDelete, onEdit }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="corridor-card" style={{
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
                    <h3 style={{ margin: 0 }}>Corridor #{corridor.id}</h3>
                    <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                        Country {corridor.from_country} → Country {corridor.to_country}
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
                        <p><strong>ID:</strong> {corridor.id}</p>
                        <p><strong>From Country ID:</strong> {corridor.from_country}</p>
                        <p><strong>To Country ID:</strong> {corridor.to_country}</p>
                        
                        {/* Display country names if available */}
                        {corridor.from_country_name && (
                            <p><strong>From Country:</strong> {corridor.from_country_name}</p>
                        )}
                        {corridor.to_country_name && (
                            <p><strong>To Country:</strong> {corridor.to_country_name}</p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div style={{ 
                        display: "flex", 
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}>
                        <button
                            onClick={() => onEdit(corridor)}
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
                                if (window.confirm(`Delete Corridor #${corridor.id}?`)) {
                                    onDelete(corridor.id);
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

export default CorridorCard;