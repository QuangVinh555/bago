import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './Rightbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Rightbar = ({userId}) => {

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src = "/assets/gift.png" alt="" />
          <span className="birthdayText">
              <b>John Doe</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className='rightbarAd' src = "/assets/ad.png" alt="" />
        <h2 className="rightbarTitle">Online Friends</h2>
        <ul className="rightbarFriendList">
         {/* {
          user.map(user => (
            <Online key={user.id} user = {user} />
          ))
         } */}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user, dispatch} = useContext(AuthContext);
    useEffect(() => {
      const fetchingData = async () => {
        const res = await axios.get(`http://localhost:8081/api/user/friends/${userId._id}`);
        setFriends(res.data)
      }
      fetchingData();
    }, [userId._id])

    const [follower, setFollower] = useState(false);
    useEffect(() => {
      setFollower(user.followings.includes(userId?._id));
    }, [user,userId._id])
    // console.log(follower);
    const handleFollow = async() => {
      try {
        if(follower){
          await axios.put(`http://localhost:8081/api/user/${userId._id}/unfollow`, {userId: user._id});
          dispatch({type: "UNFOLLOW", payload: user._id})
        }
        else{
          await axios.put(`http://localhost:8081/api/user/${userId._id}/follow`, {userId: user._id});
          dispatch({type: "FOLLOW", payload: user._id})
        }
      } catch (error) {
        console.log(error);
      }
      setFollower(!follower);
    }
    
    return(
      <>
          {/* <button 
            className="btnRightbarFollow" 
            style={{marginTop: "30px", marginBottom: "20px"}}
            onClick={handleMessage}
          >
              Nhan tin
          </button> */}
        {/* btn follow */}
        {
          userId.username !== user.username && 
          <button 
            className="btnRightbarFollow" 
            style={{marginTop: "30px", marginBottom: "20px"}} 
            onClick={handleFollow}>
            {follower ? 'UnFollow' : 'Follow'}
            {follower ? <RemoveIcon />  : <AddIcon />} 
          </button>
        }
        {/* info */}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{userId.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{userId.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{userId.relationship}</span>
          </div>
        </div>

        {/* follow */}
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            friends.map(friend => (
              <Link to={`/profile/${friend.username}`} key={friend._id} className="rightbarProfileLink">
                <div className="rightbarFollowing">
                  <img src={friend.profilePicture ? `${PK}person/${friend.profilePicture}` : '/assets/person/noAvatar.png'} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))
          }
        </div>
      </>
    )
  }
  return (
        <div className="rightbar">
          <div className="rightbarWrapper">
          {   
            userId ? <ProfileRightbar /> : <HomeRightbar /> 
          }     
          </div>
        </div>
  )
}

export default Rightbar