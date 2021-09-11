import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.scss'

const Navigation: React.FC = () => {
    let date = new Date()
    return (
        <nav className="navigation">
            <NavLink to="/" activeClassName="active" exact>
                {date.toLocaleDateString('en-US', { weekday: 'long' })}
                , {date.getDay()} {date.getMonth()} {date.getFullYear() + " "} 
                 | { date.getHours()} : {date.getMinutes()}

            </NavLink>
            <NavLink to="/locations" activeClassName="active">
                Locations
            </NavLink>
        </nav>
    )
}

export default Navigation
