import React from 'react';
import './Closefriend.css';

const Closefriend = ({user}) => {
  return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src = {user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default Closefriend