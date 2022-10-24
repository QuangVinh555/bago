import axios from 'axios';
import React, { useContext, useState, useRef } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Conversation.css';

const Conversation = ({className, conversation, currentUser, messages, currentChat}) => {
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

    // const conversationElement = document.querySelectorAll('.conversation');
    // for(let i = 0; i < conversationElement.length; i++) {
    //   console.log(conversationElement[i]);
    // }

  
  return (
    <div className={`conversation ${className}`}>
        <img src={user?.profilePicture ? `${PK}person/${user.profilePicture}` : '/assets/person/noAvatar.png'} alt="" className="conversationImg" />
        <span className="conversationName ">{!user ? "" : user.username}</span>
    </div>
  )
}

export default Conversation