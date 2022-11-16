import React, {useEffect, useState} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.css';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Feed = ({username}) => {
  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchingPosts = async () => {
      const res = username 
      ? await axios.get(`http://localhost:8081/api/posts/profile/${username}`)
      : await axios.get(`http://localhost:8081/api/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchingPosts();
  }, [username])
  // 


  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {
          posts.map(post => (
            <Post key={post._id} post={post} />
          ))
        }
      </div>
    </div>
  )
}

export default Feed