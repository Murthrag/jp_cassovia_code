import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.scss'

interface Props {

}

const Navigation: React.FC<Props> = props => {

    return (
        <nav className="navigation">
            <NavLink to="/" activeClassName="active" exact>
                Home
            </NavLink>
            <NavLink to="/locations" activeClassName="active">
                Locations
            </NavLink>
        </nav>
    )
}

export default Navigation
