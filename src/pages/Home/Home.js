import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu/Menu'
import Message from '../../components/Message/Message'

import useUserContext from '../../hooks/useUserContext'

import './Home.css'

function Home() {

    var { user } = useUserContext();
    const [conversations, setConversation] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // get All the channels for this particular user
        axios.get('http://localhost:5000/channel/' + user._id)
            .then(response => {
                var channels = response.data;
                var conver = channels.map(channel => {
                    return {
                        id: channel._id,
                        name: channel.user1 === user.name ? channel.user2 : channel.user1
                    };
                });
                setConversation(conver)
            })
    }, [user]);

    function fetchMessages(id) {
        axios.get('http://localhost:5000/message/' + id)
            .then(response => {
                let messages = response.data;
                messages = messages.map(message => {
                    return {
                        text: message.text,
                        mine: message.senderId === user._id
                    };
                });
                setMessages(messages)
            })
    }

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <h3>Your Converstions</h3>
                    {conversations.map(conversation => <Menu action={fetchMessages} {...conversation} />)}
                </div>
            </div>
            <div className="messageBox">
                <div className="boxWrapper">
                    <div className="boxTop">
                        {messages.map(message => <Message {...message} />)}
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
