// @flow
import React, { Component, useEffect, useState, useLayoutEffect } from 'react';
import Routes from './routes/Routes';
import history from './history';

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes
// import './assets/scss/Saas.scss';

// For Dark import Saas-Dark.scss
// import './assets/scss/Saas-Dark.scss';

// For Modern import Modern.scss
import './assets/scss/Modern.scss';
// For modern dakr import Modern-Dark.scss
// import './assets/scss/Modern-Dark.scss';

// For Creative demo import Modern.scss
//import './assets/scss/Creative.scss';
// For Creative dark demo import Modern.scss
// import './assets/scss/Creative-Dark.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loadUser, initMenu, fetchWatchlists } from './redux/actions' //, setCookie


import { useCookies } from "react-cookie";


// configure fake backend
// configureFakeBackend();

type AppProps = {};

/** 
 * Main app component
 */
// class App extends Component<AppProps> {
const App = ({Auth}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const [localCookie, setLocalCookie] = useState(localStorage.getItem('access_token'))
    const dispatch = useDispatch();
    
    const fetchUserData = async () => {
        localStorage.setItem('access_token', Object.values(cookies)[0]);
        setLocalCookie(localStorage.getItem('access_token'));
        // handleCookie()
    }

    // const handleCookie = () => {
    //     document.cookie.split(";").forEach((c) => {
    //         document.cookie = c
    //         console.log(document.cookie)
    //       });
    //   }

    useLayoutEffect(() => {
        fetchUserData()
            .then(initMenu())
            .then(dispatch(loadUser()))
            
            // .then(localStorage.setItem('watchlist', Auth.watchlist))
            .then(dispatch(fetchWatchlists())) 
            // .then(console.log(Auth.watchlist))
            
    }, [])


    return <Routes cookie={Object.values(cookies)[0]}></Routes>;
    
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth.user,    
    }
}



export default connect(mapStateToProps, {loadUser, initMenu, fetchWatchlists})(App);