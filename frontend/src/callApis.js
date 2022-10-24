import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './context/AuthAction';
import { LOCAL_STORAGE_TOKEN_NAME } from './localStorage/localStorage';

export const loginCall = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8081/api/auth/login", user);
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        dispatch(loginSuccess(res.data.user));
    } catch (error) {
        dispatch(loginFailure(error));
    }
}

export const logoutCall = (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
        type: "SET_AUTH",
        payload: {
            isFetching: false,
            user: null
        }
    })
}
