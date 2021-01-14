/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import ColorNavbar from 'components/Navbars/ColorNavbar.js';
import api from '../../utils/api';
import { useCookies } from "react-cookie";
import {fetchUser} from '../../actions'

function LoginPage() {
  ///cookies
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', "user", "express:sess", "express:sess.sig"]);
  const [myCookie, setMyCookie] = useState('')
  ///form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const updateUser = () => {
    setUser({
      email: email,
      password: password,
    });
    console.log(user);
  };

  //update Email date
  const handleEmailFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };
  //update Password date
  const handlePasswordFocus = (e) => {
    setFocus(e.target.name);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(value);
  };

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('login-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
      document.body.classList.remove('full-screen');
    };
  });

  const handleCookie = (cookie) => {
    setCookie("access_token", cookie, {
      path: "/"
    });
  }
  const deleteCookies = () => {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
  }

  const login = (ev) => {
    deleteCookies()
    localStorage.removeItem('access_token')
    console.log(user);
    console.log(user.password);
    console.log(user.confirmPassword);
    ev.preventDefault();
    try {
      api.post('/auth/login', user).then((response) => {
        // if (cookies) {
        //   window.location.href = `${process.env.REACT_APP_REDIRECT_URI}?token=${cookies}`;
        // }
        if (response.data) {
          if(response.data.cookie) {
            console.log(response.data.cookie);
            const cookie = response.data.cookie
            const setCookie = handleCookie(cookie)
            setMyCookie(cookie)
            fetchUser(cookie)
            window.location.href = `${process.env.REACT_APP_REDIRECT_URI}?access_token=${cookies}`;
        } else {
          alert('Password or Email entered does not match')
        }
          
          } else {
            alert('Sign-up error. Please try again!');
          }
        });
      } catch (e) {
        console.log(e);
      }
    
  };

  useEffect(() => {
    updateUser();
  }, [email, password]);

  return (
    <>
      <ColorNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              'url(' + require('assets/img/sections/bruno-abatti.jpg') + ')',
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Welcome</CardTitle>
                  <div className="social">
                    <Button
                      className="btn-just-icon mr-1"
                      color="facebook"
                      href="/auth/facebook"
                    >
                      <i className="fa fa-facebook" />
                    </Button>
                    <Button
                      className="btn-just-icon mr-1"
                      color="google"
                      href="/auth/google"
                    >
                      <i className="fa fa-google" />
                    </Button>
                    <Button
                      className="btn-just-icon"
                      color="twitter"
                      href="/auth/twitter"
                    >
                      <i className="fa fa-twitter" />
                    </Button>
                  </div>
                  <Form className="register-form" onSubmit={login}>
                    <label>Email</label>
                    <Input
                      className="no-border"
                      placeholder="Email"
                      type="email"
                      onChange={handleEmailChange}
                      onFocus={handleEmailFocus}
                    />
                    <label>Password</label>
                    <Input
                      className="no-border"
                      placeholder="Password"
                      type="password"
                      onChange={handlePasswordChange}
                      onFocus={handlePasswordFocus}
                    />
                    <Button
                      block
                      className="btn-round"
                      color="danger"
                      type="submit"
                      value="Log In"
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="demo-footer text-center">
              <h6>
                Don't have an acocunt? <a href="/register">{'  '} Register</a>
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
