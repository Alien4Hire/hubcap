// @flow
import {
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
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    GET_ERRORS,
    CLEAR_ERRORS,
    SET_COOKIE,
    NEW_WATCHLIST_SELECT,
    UPDATE_WATCHLIST_SELECT,
} from './constants';
import _ from 'lodash';
import { API } from '../../services/api';
import axios from 'axios';
import {tokenConfig} from '../../utils/tokenConfig';



type AuthAction = { type: string, payload: {} | string };

export const loginUser = async (dispatch) => {
    const response = API.getUser().then((r) => r)

    dispatch({ type: LOGIN_USER, payload: new Promise(response) })
    }
//Auth Actions
// export const loginUser = (payload): AuthAction => ({
//     type: LOGIN_USER,
//     payload,
// });

export const userLogin = () => async (dispatch, getState) => {
    _.chain(getState().user)
}
export const loginUserSuccess = (user: string): AuthAction => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error: string): AuthAction => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

// export const registerUser = (fullname: string, email: string, password: string): AuthAction => ({
//     type: REGISTER_USER,
//     payload: { fullname, email, password },
// });

// export const registerUserSuccess = (user: {}): AuthAction => ({
//     type: REGISTER_USER_SUCCESS,
//     payload: user,
// });

// export const registerUserFailed = (error: string): AuthAction => ({
//     type: REGISTER_USER_FAILED,
//     payload: error,
// });

// export const logoutUser = (history: any): AuthAction => ({
//     type: LOGOUT_USER,
//     payload: { history },
// });

// export const forgetPassword = (username: string): AuthAction => ({
//     type: FORGET_PASSWORD,
//     payload: { username },
// });

// export const forgetPasswordSuccess = (passwordResetStatus: string): AuthAction => ({
//     type: FORGET_PASSWORD_SUCCESS,
//     payload: passwordResetStatus,
// });

// export const forgetPasswordFailed = (error: string): AuthAction => ({
//     type: FORGET_PASSWORD_FAILED,
//     payload: error,
// });

//##//##//Actions//##//##//

//Check token & Load User
export const loadUser = () => async (dispatch: Function, getState: Function) => {
    //User Loading
    dispatch({type: USER_LOADING})
    const API_URL = 'http://localhost:3500';

    await axios
        .get(`${API_URL}/api/current_user`, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

//Update Current Watchlist
export const loadNewWatchlist = () => async (dispatch: Function, getState: Function) => {
    //User Loading
    dispatch({type: USER_LOADING})
    const API_URL = 'http://localhost:3500';

    await axios
        .get(`${API_URL}/api/selectNewWatchlist`, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_WATCHLIST_SELECT,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

//Update Current USER Watchlist 
export const updateUserWatchlist = (payload) => async (dispatch: Function, getState: Function) => {
    //User Loading
    dispatch({type: USER_LOADING})
    const API_URL = 'http://localhost:3500';

    await axios
        .get(`${API_URL}/api/updateUserWatchlist/${payload}`, tokenConfig(getState))
        .then(res => dispatch({
            type: NEW_WATCHLIST_SELECT,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

// export const setCookie = (cookie) => {
//     return {
//         type: SET_COOKIE,
//         payload: cookie
//     }
// };

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
};


//Setup config/headers and token
// Setup config/headers and token







///Errors

//Return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

//Clear Errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

