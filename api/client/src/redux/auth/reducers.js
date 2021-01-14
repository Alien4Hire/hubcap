// @flow
import {
    CLEAR_ERRORS,
    GET_ERRORS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    SET_COOKIE,
    NEW_WATCHLIST_SELECT,
    UPDATE_WATCHLIST_SELECT,    
} from './constants';


import {Error} from './errorReducers'
import { getCookie, setCookie, expireCookie } from 'redux-cookie';

const INIT_STATE = {
    token: localStorage.getItem('access_token'),
    isAuthenticated: null,
    user: null,
    watchlist: 0,
    loading: false,
};



type AuthAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Auth = (state: State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {
        case USER_LOADING:
            return {...state, loading: true};
        case USER_LOADED:
            return {...state, isAuthenticated: true, loading: false, user: action.payload, watchlist: action.payload.watchlist}
        case NEW_WATCHLIST_SELECT:
            return {...state, user: action.payload, loading: false}
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case UPDATE_WATCHLIST_SELECT:
            return {...state, user: action.payload, loading: false, error: null};
        case REGISTER_USER_SUCCESS:
        localStorage.setItem('token', action.payload.token)
            return {...state, ...action.payload, isAuthenticated: true, loading: false, user: action.payload};
        case AUTH_ERROR:
        case LOGIN_USER_FAILED:
        case LOGOUT_USER:
        case REGISTER_USER_FAILED:
            localStorage.removeItem('token');
            return { ...state, token: null, user: null, isAuthenticated: false, loading: false };
        default:
            return state;
    }
};


export default Auth;
