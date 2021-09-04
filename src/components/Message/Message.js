import React from 'react'
import cx from 'classnames'

import './Message.css'

function Message({ mine, text }) {

    var wrapperClass = cx('message', { 'mine': mine });

    return (
        <div className={wrapperClass}>
            <div className="messageTop">
                <p className="initial">{'User'}</p>
                <p className="messageText">{text}</p>
            </div>
            <div className="messageBottom"></div>
        </div>
    )
}

export default Message
