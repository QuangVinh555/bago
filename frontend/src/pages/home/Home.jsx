import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';

import './Home.css'

const Home = () => {
  const {user, socket} = useContext(AuthContext);  


  useEffect(() => {
    socket?.emit("addUser", user?._id);
  }, [socket, user])

    return (
      <>
      {
        user ? 
        <>
          <Topbar socket={socket} />
          <div className="homeContainer">
            <Sidebar />
            <Feed />
            <Rightbar />
          </div>
        </> :
        <Navigate to="/login" />
      }
      </>
    )
  }


export default Home