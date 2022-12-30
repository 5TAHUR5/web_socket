import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import ChatMessage from "./elements/ChatMessage/ChatMessage";
import JoinMessage from "./elements/JoinMessage/JoinMessage";

let stompClient =null;
const Chat = () => {

    const [receiveReaction, setReceiveReaction] = useState({
        emotion: "",
        messageId: -1
    })
    const [messages, setMessages] = useState([])
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });


    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = async () => {
        userJoin();
        await getMessages()
        stompClient.subscribe('/chat', onMessageReceived);
        stompClient.subscribe('/emotions', onEmotionReceived);
        setUserData({...userData,"connected": true});

    }

    const getMessages = async () => {
        let response = await fetch("http://localhost:8080/getMessages")
        if (response.ok) {
            const fetchMessages = await response.json()
            fetchMessages.forEach((message) => {
                messages.push(message)
            })
            setMessages(messages)
        }
    }



    const userJoin=()=>{
          let chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }


    const onEmotionReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setReceiveReaction(payloadData)
    }

    const onMessageReceived = (payload)=>{
        let payloadData = JSON.parse(payload.body);
        messages.push(payloadData)
        setMessages([...messages])
        document.getElementById("chatMessages").scrollTop
            =
            document.getElementById("chatMessages").scrollHeight
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendMessage=()=>{
            if (stompClient) {
              let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendReaction=(messageId, emotion)=>{
        if (stompClient) {
            let reaction = {
                emotion: emotion,
                messageId: messageId
            };
            console.log(reaction);
            stompClient.send("/app/reaction", {}, JSON.stringify(reaction));
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }



    return (
    <div key={"container"} className="container">
        {userData.connected?
        <div key={"chat-box"} className="chat-box">
             <div key={"chat-content"} className="chat-content">
                <ul id="chatMessages" key={"chat-messages"} className="chat-messages">
                    {messages.map((message,index)=>(
                        <div>
                            {message.status === "MESSAGE" &&
                                <ChatMessage sendReaction={sendReaction} key={index} username={userData.username} receiveReaction={receiveReaction} chatMessage={message}>
                                </ChatMessage>}
                            {message.status === "JOIN" &&
                                <JoinMessage key={index} chatMessage={message}>
                                </JoinMessage>}
                        </div>

                    ))}
                </ul>
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="type the message" value={userData.message} onChange={handleMessage} />
                    <button type="button" className="send-button" onClick={sendMessage}>
                        <span className="send-button-text">
                            &#10162;
                        </span>
                    </button>
                </div>
                 <div className="your-name">Your name: {userData.username}</div>
            </div>
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default Chat
