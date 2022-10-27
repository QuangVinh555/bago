import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NotifyModal.css';

const NotifyModal = ({show, userId}) => {
    
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;
    const [notification, setNotification] = useState([])
        useEffect(() =>{
            const getNotify = async () => {
                const res = await axios.get(`http://localhost:8081/api/user?userId=${userId}`);
                setNotification(prev => [...prev, res.data])
            }
            getNotify();
        }, [userId])
    
        console.log(notification);
  return (
        <>
            {
                notification.map((c,index)=>(
                    <div key={index} className={`notify-modal ${show}`}>
                        <div className="notify-modal-like">
                            <img alt="" src= {c.profilePicture ? `${PK}person/${c.profilePicture}` : "/assets/person/noAvatar.png"}/>
                            <h4>{c.username}</h4>
                            <p>Da thich bai viet cua ban</p>
                            {/* <div>
                                <span>1 phut truoc</span>
                            </div> */}
                        </div>
                    </div> 
                ))
            }
        </>
  )
}

export default NotifyModal