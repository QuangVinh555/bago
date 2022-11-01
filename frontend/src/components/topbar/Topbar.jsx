import React, { useEffect, useRef } from 'react';
import './Topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { logoutCall } from '../../callApis';
import NotifyModal from '../NotifyModal/NotifyModal';

const Topbar = ({socket}) => {
    
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [searchUser, setSearchUser] = useState("");
    const [notify, setNotify] = useState([]);
    const {setCountLike} = useContext(AuthContext);

    useEffect(() => {
        socket?.on("getNotify", data => {
            setNotify(prev=>[...prev, data.senderId]);
            setCountLike(countLike + 1);
        })
    }, [socket, notify])

    // const [arraySearchUser, setArraySearchUser] = useState([])
    useEffect(() => {
        const fetchingData = async () => {
            const res = await axios.get(`http://localhost:8081/api/user/alluser`);
            res.data.forEach((user) => {
                if(searchUser){
                    if(user.username.toLowerCase().includes(searchUser)){
                        setSearchUser(user);
                        // setArraySearchUser([...arraySearchUser, user]);
                    }
                    
                }else{
                    setSearchUser("");
                }
            })
        }
        fetchingData();
    }, [searchUser]);

    const handleLogout = () => {
        logoutCall(dispatch);
    }
    const navigate = useNavigate();
    const handleMessenger = () => {
        return navigate('/messenger');
    }

    // chat count
    const {countMessage, countLike} = useContext(AuthContext);
    
    const [isShow, setShow] = useState(false);
    const handleNotifycations = () => {
        setShow(!isShow);
    }
    console.log(isShow)
    
    useEffect(() => {
        const IconBadgeElement = document.querySelectorAll('.topbarIconBadge');
        for(let i = 1; i < IconBadgeElement.length; i++){
            if(countMessage===0){
                IconBadgeElement[1]?.classList.add('none-color');
            }
            else{
                IconBadgeElement[1].classList.remove('none-color');
            }
            if(countLike===0){
                IconBadgeElement[2]?.classList.add('none-color');
            }
            else{
                IconBadgeElement[2].classList.remove('none-color');
            }
        }   
        
    },[countMessage, countLike])

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration: 'none'}}>
                <span className="logo">BAGO</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <SearchIcon className="searchIcon" />
                <input type="text" className="searchInput" placeholder="Search" onChange={(e)=>setSearchUser(e.target.value)} />
               {
                searchUser ? 
                    <Link to={`/profile/${searchUser.username}`} className="topbarLinkProfile hide">
                        <div className="topbarSearchProfile">
                            <img alt="" src={searchUser.profilePicture ? `${PK}person/${searchUser.profilePicture}` : "/assets/person/noAvatar.png"} />
                            <h4>{searchUser.username}</h4>
                        </div>
                    </Link> 

                :<>{}</>
               }
               
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <PersonIcon />
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <ChatIcon onClick={handleMessenger} />
                    <span className="topbarIconBadge">{countMessage || ""}</span>
                </div>
                <div className="topbarIconItem">
                    <NotificationsIcon onClick={handleNotifycations} />
                    <span className="topbarIconBadge">{countLike || ""}</span>
                    {
                        notify.length > 0 ? (
                            notify.map((userId,index) => (
                                <NotifyModal key={index} show={isShow ? "" : "hide"} userId={userId} setCountLike={setCountLike}/>
                            ))
                        )
                        :
                        isShow && <div className="none-notify">Không có thông báo nào ở đây!</div>

                    }
                </div>
            </div>
            <Link to = {`/profile/${currentUser.username}`} className="topbarRightProfile">
                <img src={!currentUser.profilePicture ? "/assets/person/noAvatar.png" : `/assets/person/${currentUser.profilePicture}`} alt="" className="topbarImg" />
                <div className="topbarRightModal">
                    <ul className="topbarRightUserModal">
                        <li>Cài đặt</li>
                        <li>Thông tin cá nhân</li>
                        <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Topbar