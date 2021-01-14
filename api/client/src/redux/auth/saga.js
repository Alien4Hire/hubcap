// // @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, putResolve, takeEvery } from 'redux-saga/effects';

import { fetchJSON } from '../../helpers/api';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
} from './actions';
import request from '../../utils/request';
//Promise actions

// import { useCookies } from "react-cookie";
const API_URL = 'http://localhost:3500';

/**
 * Sets the session
 * @param {*} user
 */
const setSession = (user) => {
    // const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    // let cookies = new Cookies();
    // if (user) cookies.set('access_token', JSON.stringify(user), { path: '/' });
    // else cookies.remove('user', { path: '/' });
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
        // console.log(responseBody, 'RESPONSE')

        // yield setSession(responseBody);

// function* login() {

//     try {
        
//         const response = yield call(fetch(`${API_URL}/api/current_user`, {
//             method: 'GET',
//             credentials: 'include',
//         }));
//         // const responseBody = yield response.json();
//         yield call(resolvePromiseActions, response)
//         yield putResolve(loginUserSuccess(response));
//     } catch (error) {
//         let message;
//         switch (error.status) {
//             case 500:
//                 message = 'Internal Server Error';
//                 break;
//             case 401:
//                 message = 'Invalid credentials';
//                 break;
//             default:
//                 message = error;
//         }
//         yield put(loginUserFailed(message));
        
//         // setSession(null);
//     }
// }

function* login() {
    try {
        
        const response = yield call(fetch, [`${API_URL}/api/current_user`], {
            method: 'GET',
            credentials: 'include',
        });
        const responseBody = yield call(({}) => response.json());

        yield put(loginUserSuccess(responseBody));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(loginUserFailed(message));
        // setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        // setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}

/**
 * Register the user
 */
// function* register({ payload: { fullname, email, password } }) {
//     const options = {
//         body: JSON.stringify({ fullname, email, password }),
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//     };

//     try {
//         const response = yield call(fetchJSON, '/users/register', options);
//         yield put(registerUserSuccess(response));
//     } catch (error) {
//         let message;
//         switch (error.status) {
//             case 500:
//                 message = 'Internal Server Error';
//                 break;
//             case 401:
//                 message = 'Invalid credentials';
//                 break;
//             default:
//                 message = error;
//         }
//         yield put(registerUserFailed(message));
//     }
// }

// /**
//  * forget password
//  */
// function* forgetPassword({ payload: { username } }) {
//     const options = {
//         body: JSON.stringify({ username }),
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//     };

//     try {
//         const response = yield call(fetchJSON, '/users/password-reset', options);
//         yield put(forgetPasswordSuccess(response.message));
//     } catch (error) {
//         let message;
//         switch (error.status) {
//             case 500:
//                 message = 'Internal Server Error';
//                 break;
//             case 401:
//                 message = 'Invalid credentials';
//                 break;
//             default:
//                 message = error;
//         }
//         yield put(forgetPasswordFailed(message));
//     }
// }

export function* watchLoginUser(): any {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser(): any {
    yield takeEvery(LOGOUT_USER, logout);
}

// export function* watchRegisterUser(): any {
//     yield takeEvery(REGISTER_USER, register);
// }

// export function* watchForgetPassword(): any {
//     yield takeEvery(FORGET_PASSWORD, forgetPassword);
// }

function* authSaga(): any {
    yield all([fork(watchLoginUser), fork(watchLogoutUser)]); //, fork(watchRegisterUser), fork(watchForgetPassword)
}//fork(watchLoginUser), 

export default authSaga;
