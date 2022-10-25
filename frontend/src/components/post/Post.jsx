import React, {useContext, useState} from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({post}) => {

  const PK = process.env.REACT_APP_PUBLIC_FOLDER;
  // const user = Users.filter(user => user.id === post.userId);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setLiked] = useState(false);

  const {countLike, setCountLike} = useContext(AuthContext);

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
    setCountLike(countLike + 1);
    setLiked(!isLiked);
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
              <MoreVertIcon />
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