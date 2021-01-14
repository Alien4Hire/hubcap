// @flow
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
import {API} from '../services/api'

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = async () => {
    const cookies = new Cookies();

    const user = await getLoggedInUser()
    return user
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = async () => {
    // const cookies = new Cookies();
    // const user = cookies.get('user');

    // if(!user){
    //     const r = await API.getUser()
    //     if(r) cookies.set('user', JSON.stringify(r))
    //     return r
    // } else {
    //     return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
    // }
};

export { isUserAuthenticated, getLoggedInUser };
