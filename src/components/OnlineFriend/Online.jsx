import React from 'react'

import './Online.css'

function Online({ id, name, socketId }) {
    return (
        <div >
            <div className="menu">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default Online
