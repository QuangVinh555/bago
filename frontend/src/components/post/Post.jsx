import React, {useContext, useState} from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import {io} from 'socket.io-client'; 

const Post = ({post}) => {

  const PK = process.env.REACT_APP_PUBLIC_FOLDER;
  // const user = Users.filter(user => user.id === post.userId);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setLiked] = useState(false);

  const socket = useRef(io("ws://localhost:8900"))

  const [user, setUser] = useState({});
  useEffect(()=> {
    const fetchingData = async () => {
      const res = await axios.get(`http://localhost:8081/api/user?userId=${post.userId}`);
      setUser(res.data)
    }
    fetchingData();
  }, [post.userId])

  const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
      setLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes] )

  
  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:8081/api/posts/${post._id}/like`, {userId: currentUser._id});
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setLiked(!isLiked);
    if(!isLiked) {
      socket.current.emit('like', {
        senderId: currentUser._id,
        receiveId: post.userId
      })
    }
  } 

  // 3 cham
  const [movert, setMovert] = useState(false);
  // post id
  const handlePost = async(post) => {
    try { 
      if(post.userId === currentUser._id){
        await axios.delete(`http://localhost:8081/api/posts/${post._id}`);
        alert('Bạn xóa bài viết thành công');
        window.location.reload();
      }else{
        alert('Bạn không thể xóa bài viết của người khác');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to = {`/profile/${user.username}`}>
                <img className="postProfileImg" src = {user.profilePicture ? PK+"/person/" + user.profilePicture : '/assets/person/noAvatar.png'} alt="" />
              </Link>
                <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon className="postMovertIcon" onClick={()=>setMovert(!movert)} />
              {
                movert && <div className="post-delete">
                  <h4 onClick={()=>handlePost(post)}>Xóa bài viết</h4>
                </div>
              }
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={`${PK}${post?.img}`} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src="/assets/likefb.png" onClick={handleLike} alt="" />
              <img className="likeIcon" src="/assets/heartfb.png" onClick={handleLike} alt="" />
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post