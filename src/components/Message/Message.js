import React from 'react'
import cx from 'classnames'

import './Message.css'

function Message({ mine }) {

    var mainClass = cx(
        'message',
        { 'mine': mine }
    );

    return (
        <div className={mainClass}>
            <div className="messageTop">
                <p className="initial">KY</p>
                <p className="messageText">Hello This is message</p>
            </div>
            <div className="messageBottom"></div>
        </div>
    )
}

export default Message
