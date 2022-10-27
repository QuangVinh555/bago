import axios from 'axios';
import {createContext, useEffect, useReducer, useState} from 'react';
import { LOCAL_STORAGE_TOKEN_NAME } from '../localStorage/localStorage';
import {AuthReducer} from './AuthReducer';
import setAuthToken from '../utils/setAuthToken'; 

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const {user, isFetching, error} = state;
    const getUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.get("http://localhost:8081/api/auth");
            if(response.data){
                dispatch({    
                    type: 'SET_AUTH',
                    payload: {
                        isFetching: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isFetching: false, user: null }
			})
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const [countMessage, setCountMessage] = useState(0);

    const [countLike, setCountLike] = useState(0);

    const AuthContextData = {
        user,
        isFetching,
        error,
        dispatch,
        countMessage,
        setCountMessage,
        countLike,
        setCountLike
    }
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;