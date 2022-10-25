import axios from 'axios';
import React, {useRef} from 'react';
import {useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const navigate = useNavigate();
    
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if(confirmPassword.current.value !== password.current.value){
                confirmPassword.current.setCustomValidity("Mat khau khong trung khop!");
            }
            else{
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value
                }
                await axios.post("http://localhost:8081/api/auth/register", user)
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Bago</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Bago
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="text" required className="loginInput" placeholder="Username" ref={username} />
                    <input type="email" required className="loginInput" placeholder="Email" ref={email} />
                    <input type="password" required className="loginInput"  placeholder="Password" ref={password}/>
                    <input type="password" required className="loginInput" placeholder="Password Again" ref={confirmPassword} />
                    <button className="loginButton" type="submit">Sign up</button>
                    <button className="loginRegisterButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register