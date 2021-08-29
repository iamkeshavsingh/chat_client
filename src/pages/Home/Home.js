import React from 'react'
import Menu from '../../components/Menu/Menu'
import Message from '../../components/Message/Message'

import './Home.css'

function Home() {
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <h3>Your Converstions</h3>
                    <Menu />
                    <Menu />
                    <Menu />
                    <Menu />
                </div>
            </div>
            <div className="messageBox">
                <div className="boxWrapper">
                    <div className="boxTop">
                        <Message mine />
                        <Message />
                        <Message mine />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className="boxBottom">
                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Write Here..." className="chatInput"></textarea>
                        <button className="submitButton">Send</button>
                    </div>
                </div>
            </div>
            <div className="online">
                <div className="onlineWrapper">
                    <h4>Online Friends</h4>
                    <Menu />
                </div>
            </div>
        </div>
    )
}

export default Home
