import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Chatonline from '../../components/chatonline/Chatonline';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar'; 
import { AuthContext } from '../../context/AuthContext';
import './Messenger.css';

import {io} from 'socket.io-client';

const Messenger = () => {

  const scrollRef = useRef();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState("");
  const [newMessages, setNewMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // console.log(currentChat);
  // console.log(messages)
  useEffect(() => {})
  const {user} = useContext(AuthContext);
  const socket = useRef(io("ws://localhost:8900"))
  const {countMessage, setCountMessage} = useContext(AuthContext);
  console.log(countMessage)
  // socket
  useEffect(() => {
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
      setCountMessage(countMessage+1);
    })
  },[arrivalMessage])

  useEffect(() => {
    if(currentChat){
      setCountMessage(0);
      console.log(currentChat);
    }
  }, [currentChat])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
    setMessages(prev=>[...prev, arrivalMessage]);
    // setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", users =>{
      setOnlineUsers(user?.followings.filter(f => users.some(u => u.userId === f)));
    })
  }, [user])

  useEffect(() => {
    const getConversation = async() => {
      const res = await axios.get(`http://localhost:8081/api/conversation/${user?._id}`);
      setConversations(res.data);
    } 
    getConversation();
  }, [user?._id])

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(`http://localhost:8081/api/message/${currentChat?._id}`);
      setMessages(res.data);
    }
    getMessage();
  }, [user,currentChat])

    const handleSubmit = async(e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessages
    }
    const receiveId = currentChat.members.find(member => member !== user._id);
    
    socket.current.emit("sendMessage",{
      senderId: user._id,
      receiveId: receiveId,
      text: newMessages,
    })
    try {
      const res = await axios.post(`http://localhost:8081/api/message/`, message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])


  return (
    <>
      {
        user ?
        <>
          <Topbar />
          <div className="messenger">
              <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input type="text" className="chatMenuInput" placeholder="Search for friends" />
                  {
                    conversations.map((c)=>(
                      <div key={c._id} onClick={() => setCurrentChat(c)} >
                        <Conversation className={`${c._id === currentChat?._id ? 'hide' : ""}`} conversation={c} currentUser={user} />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="chatBox">
                <div className="chatBoxWrapper">
                  {
                    currentChat ?
                    <>  
                      <div className="chatBoxTop">
                        {
                          messages.map(message => (
                            <div key={message._id} ref = {scrollRef}>
                              <Message message={message} own={message.sender === user._id} /> 
                            </div>             
                          ))
                        }
                      </div>
                      <div className="chatBoxBottom">
                        <textarea 
                          onChange={(e)=> setNewMessages(e.target.value)}
                          className="chatMessageInput" 
                          value={newMessages}
                          placeholder="write something...">
                        </textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                      </div>
                    </> : 
                    <span className="noConvertsationtext">Mở cuộc hội thoại để trò chuyện</span>

                  }
                </div>
              </div>
              <div className="chatOnline">
                <div className="chatOnlineWrapper">
                  <Chatonline onlineUsers={onlineUsers} currentUser={user._id} setCurrentChat={setCurrentChat} currentChat={currentChat} />
                </div>
              </div>
          </div>
        </> : <Navigate to="/" />
      }
    </>
  )
}

export default Messenger