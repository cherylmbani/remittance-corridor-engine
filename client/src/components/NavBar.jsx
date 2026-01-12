import React from "react";
import {NavLink} from "react-router-dom";


function NavBar(){

    return(
        <div>
            <nav style={{ padding: "20px", background: "#f0f0f0" }}>
                <div style={{ display: "flex", gap: "15px" }} >
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/countries">Countries</NavLink>
                    <NavLink to="/corridors">Corridors</NavLink>
                    <NavLink to="/rates">Rates</NavLink>
                    <NavLink to="/transactions">Transactions</NavLink>
                </div>
            </nav>


        </div>
    );
}
export default NavBar;
