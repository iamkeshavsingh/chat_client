import React from 'react'

import './Menu.css'

function Menu({ id, name, action }) {
    return (
        <div onClick={() => action(id)}>
            <div className="menu">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default Menu
