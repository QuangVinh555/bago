import React, {useRef, useContext, useEffect} from 'react';
import './Login.css';
import { loginCall } from '../../callApis';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch)  
    }
    useEffect(() => {
        if(user){
            return navigate('/');
        }
    })
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Fakebook</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Fakebook
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="email" className="loginInput" placeholder="Email" ref={email} />
                    <input type="password" className="loginInput"  placeholder="Password" ref={password} />
                    <button className="loginButton">Sign up</button>
                    <span className="loginForgot">Forgot password?</span>
                    <Link to="/register" style={{textAlign: 'center'}}>
                        <button className="loginRegisterButton">Create a new Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login