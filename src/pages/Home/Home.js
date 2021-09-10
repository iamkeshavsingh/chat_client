import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Menu from '../../components/Menu/Menu'
import Message from '../../components/Message/Message'
import io from 'socket.io-client';
import Online from '../../components/Online/Online'

import useUserContext from '../../hooks/useUserContext'

import './Home.css'

function Home() {

    var { user } = useUserContext();
    const [conversations, setConversation] = useState([]);
    const [messages, setMessages] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    const [activeChannel, setActiveChannel] = useState(null);
    const socket = useRef();


    useEffect(() => {
        socket.current = io('http://localhost:5000');
    }, []);

    useEffect(() => {
        // get All the channels for this particular user
        axios.get('http://localhost:5000/channel/' + user._id)
            .then(response => {
                var channels = response.data;
                var conver = channels.map(channel => {
                    return {
                        id: channel._id,
                        name: channel.user1 === user.name ? channel.user2 : channel.user1,
                        friendId: channel.channel[0] === user._id ? channel.channel[1] : channel.channel[0]
                    };
                });
                setConversation(conver)
            })
    }, [user]);

    useEffect(() => {
        socket.current.emit('addUser', {
            userId: user._id,
            name: user.name,
        });
        socket.current.on('getUsers', users => {
            setOnlineFriends(users);
        });

        socket.current.on('message', message => {
            setMessages(messages => ([
                ...messages,
                {
                    text: message.message,
                    mine: false
                }
            ]));
        })
    }, [messages, user]);

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
                setActiveChannel(id);
            })
    }


    function handleMessageSubmit() {
        // we need to send the message to our db
        axios.post('http://localhost:5000/message', {
            channelId: activeChannel,
            senderId: user._id,
            text: newMessage
        }).then(() => {
            var receiver = conversations.find(conversation => conversation.id == activeChannel)
            var socketInfo = onlineFriends.find(friend => friend.id == receiver.friendId)
            socket.current.emit('newMessage', {
                message: newMessage,
                receiverSocketId: socketInfo.socketId,
                receiverId: receiver.friendId
            });
        })
        setMessages(messages => ([
            ...messages,
            {
                text: newMessage,
                mine: true
            }
        ]));
        setNewMessage('');
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
                        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} name="message" id="message" cols="30" rows="10" placeholder="Write Here..." className="chatInput"></textarea>
                        <button onClick={handleMessageSubmit} className="submitButton">Send</button>
                    </div>
                </div>
            </div>
            <div className="online">
                <div className="onlineWrapper">
                    <h4>Online Friends</h4>
                    {onlineFriends.map(friend => <Online {...friend} />)}
                </div>
            </div>
        </div>
    )
}

export default Home
