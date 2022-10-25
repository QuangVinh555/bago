import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import './Message.css';
import {format} from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';

const Message = ({message,own}) => {

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" alt="" src="/assets/person/noAvatar.png" />
            <p className="messageText">{message.text}</p>
        </div>

        <div className="messageBottom">
            <p>{format(message.createdAt)}</p>
        </div>
    </div>
  )
}

export default Message