import axios from 'axios';
import React,{useState, useEffect} from 'react';
import './Chatonline.css';

const Chatonline = ({onlineUsers, currentUser, setCurrentChat, currentChat}) => {
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    useEffect(() => {
        const getOnlFriend = async () => {
            const res = await axios.get(`http://localhost:8081/api/user/friends/${currentUser}`)
            setFriends(res.data)
        }
        getOnlFriend();
    }, [currentUser]);

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers?.includes(friend._id)));
    }, [friends,onlineUsers]);

    const handleClick = async(user) => {
      const userClick = await axios.get(`http://localhost:8081/api/user?userId=${user._id}`)
      
      // conversation ? tim kiem : them cuoc hoi thoai conversation moi 
      const conversation = await axios.get(`http://localhost:8081/api/conversation/${userClick.data._id}`);
      
      
      const members = {
        senderId: currentUser,
        receiveId: user._id
      }
      try {
        const res = conversation.data.length ? 
          await axios.get(`http://localhost:8081/api/conversation/find/${currentUser}/${user._id}`)
          :
          await axios.post(`http://localhost:8081/api/conversation`, members);
        setCurrentChat(res.data);
      } catch (error) {
       console.log(error)
      }
    }

  return (
    <div className="chatOnline">
      {
         onlineFriends.map(online =>(
            <div key={online._id} className="chatOnlineFriend" onClick={() => handleClick(online)}>
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={online.profilePicture ? `${PK}person/${online.profilePicture}`: "./assets/person/noAvatar.png"} alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{online.username}</span>    
            </div>
         ))
      }
     
    </div>
  )
}

export default Chatonline