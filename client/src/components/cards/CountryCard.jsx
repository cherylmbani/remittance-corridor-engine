// src/components/cards/CountryCard.jsx
import React, { useState } from "react";

function CountryCard({ country, onDelete, onEdit }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="country-card" style={{
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
                    <h3 style={{ margin: 0 }}>{country.name}</h3>
                    <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                        Code: {country.code}
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
                        <p><strong>ID:</strong> {country.id}</p>
                        <p><strong>Full Name:</strong> {country.name}</p>
                        <p><strong>Country Code:</strong> {country.code}</p>
                        
                        {/* Add any other fields your country has */}
                        {country.created_at && (
                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(country.created_at).toLocaleDateString()}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(country)
                            }}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete ${country.name}?`)) {
                                    onDelete(country.id);
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

export default CountryCard;