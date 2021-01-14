import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import { render } from 'react-dom';
import {logoutUser} from '../../redux/auth/actions'


const Logout = () => {
    const [reloadCount, SetCount] = useState(1);

    const handleCookie = () => {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
      }

    const reloaded = () => {
        handleCookie()
        localStorage.removeItem('access_token');
        window.location.reload(true);
        if (reloadCount === 1) {
            SetCount(2);
        }
    };

    useEffect(()=> {
        logoutUser()
    })

    useEffect(() => {
        reloaded();
    }, []);

    return <h1></h1>;
};

export default connect(null, {logoutUser})(Logout);
