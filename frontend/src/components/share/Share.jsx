import React from 'react';
import './Share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

const Share = () => {
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;

    const {user} = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc,
        }
        console.log(newPost);
        if(file){
            let data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName
            try {
                await axios.post("http://localhost:8081/api/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.post("http://localhost:8081/api/posts", newPost);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                {
                    !user ? "" :
                    <img className="shareProfileImg" src = {user.profilePicture ? `${PK}/person/${user.profilePicture}` : "/assets/person/noAvatar.png"} alt="" />
                }
                <input className="shareInput" placeholder={`What's in your mind ${user.username}?`} onChange={(e)=>setDesc(e.target.value)} />
            </div>
            <hr className="shareHr" />
            {
                file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )
            }
            <form className="shareBottom" onSubmit={handleSubmit} id="myform">
                <label htmlFor="file" className="shareOption">
                    <PermMediaIcon htmlColor='tomato' />
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display: 'none'}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=> setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <LabelIcon htmlColor='blue' />
                    <span className="shareOptionText" >Tags</span>
                </div>
                <div className="shareOption">
                    <LocationOnIcon htmlColor='green' />
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotionsIcon htmlColor='goldenrod' />
                    <span className="shareOptionText">Feelings</span>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share