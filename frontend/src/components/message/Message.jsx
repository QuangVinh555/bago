import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import './Message.css';
import {format} from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';

const Message = ({message,own, currentUser}) => {

  const [isMes, setMes] = useState(false);

  const handleMessage = async(mes) => {
    try {
      if(mes.sender === currentUser._id){
        await axios.delete(`http://localhost:8081/api/message/${mes._id}`);
        alert('Xóa tin nhắn thành công')
        window.location.reload();
      }else{
        alert('Không xóa được tin nhắn không phải của bạn')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" alt="" src="/assets/person/noAvatar.png" />
            <p className="messageText" onClick={()=>setMes(!isMes)}>{message.text}</p>
            {
              isMes && <h4 onClick={()=>handleMessage(message)}>
                Xóa tin nhắn
              </h4>
            }
        </div>

        <div className="messageBottom">
            <p>{format(message.createdAt)}</p>
        </div>
    </div>
  )
}

export default Message