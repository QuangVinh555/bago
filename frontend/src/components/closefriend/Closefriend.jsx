import React from 'react';
import './Closefriend.css';

const Closefriend = ({user}) => {
  const PK = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src = {user.profilePicture ? `${PK}person/${user.profilePicture}` : '/assets/person/noAvatar.png'} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default Closefriend