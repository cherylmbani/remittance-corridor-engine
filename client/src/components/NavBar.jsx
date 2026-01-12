import React from "react";
import {NavLink} from react-router-dom


function NavBar(){

    return(
        <div>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/corridors">Countries</NavLink>
            <NavLink to="/corridors">Corridors</NavLink>
            <NavLink to="/corridors">Rates</NavLink>
            <NavLink to="/corridors">Transactions</NavLink>


        </div>
    )
}