import axios from 'axios';
import React, { useContext, useState, useRef } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Conversation.css';

const Conversation = ({className, conversation, currentUser}) => {
  const PK = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log("Current Chat: ", currentChat?._id);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find(friend => friend !== currentUser._id)
    const getUser = async() => {
      const res = await axios.get(`http://localhost:8081/api/user?userId=${friendId}`);
      setUser(res.data);
    }
    getUser();
  }, [conversation, currentUser]);


  
  return (
    <div className={`conversation ${className}`}>
        <img src={user?.profilePicture ? `${PK}person/${user.profilePicture}` : '/assets/person/noAvatar.png'} alt="" className="conversationImg" />
        <span className="conversationName ">{!user ? "" : user.username}</span>
    </div>
  )
}

export default Conversation