import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./Profile.css";
import { useParams, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const PK = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currentUser} = useContext(AuthContext);
  const [user, setUser] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchingDataUser = async () => {
      const res = await axios.get(
        `http://localhost:8081/api/user?username=${username}`
      );
      setUser(res.data);
    };
    fetchingDataUser();
  }, [username]);


  return (
    <>
      {
        currentUser ? 
        <>
          <Topbar />
          <div className="profile">
            <Sidebar />
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src={user.coverPicture ? `${PK}${user?.coverPicture}` : "/assets/person/noCover.png"}
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? `${PK}person/${user.profilePicture}`
                        : "/assets/person/noAvatar.png"
                    }
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar userId={user} />
              </div>
            </div>
          </div>
        </>
        : <Navigate to={'/login'} />
      }  

    </>
       

    
  );
};

export default Profile;
