/** @format */

import React, { useEffect, useState } from 'react';

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
import {connect} from 'react-redux'
import {fetchUser} from '../../actions'

function RegisterPage() {
  ///cookies
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', "user", "express:sess", "express:sess.sig"]);
  const [myCookie, setMyCookie] = useState('')
  ///form state
  const [focus, setFocus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateUser = () => {
    setUser({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
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
  //update ConfirmPassword date
  const handleConfirmPasswordFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setConfirmPassword(value);
  };

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });
  //cookies

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
  ///register
  const register = (ev) => {
    deleteCookies()
    localStorage.removeItem('access_token')
    console.log(user);
    console.log(user.password);
    console.log(user.confirmPassword);
    if (user.password !== user.confirmPassword) {
      alert('Passwords Entered Must Match');
    } else {
      ev.preventDefault();
      try {
        api.post('/auth/register', user).then((response) => {
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
            alert('User with that email already exists')
          }
          
          } else {
            alert('Sign-up error. Please try again!');
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };


  useEffect(() => {
    updateUser();
  }, [email, password, confirmPassword]);

  useEffect(()=> {
    console.log(cookies)
  }, [])

  // const google = (ev) => {
  //   ev.preventDefault();
  //   try {
  //     api.get('/auth/google', user).then((result) => {
  //       if (result.data.token == undefined) {
  //         return alert('User with this email already exists');
  //       } else {
  //         localStorage.setItem('token', result.data.token);
  //         window.location.href = '/';
  //       }
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <ColorNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              'url(' + require('assets/img/sections/soroush-karimi.jpg') + ')',
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3>We've got you covered</h3>
                    <p>
                      Spend less time planning trades, try our remarkably power
                      tools. Everything you need in a single dashboard.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-map-signs" />
                  </div>
                  <div className="description">
                    <h3>Clear Directions</h3>
                    <p>
                      Efficiently plan your strategy accross stocks, crypto, and
                      forex. Quickly maximize profits and see results in real
                      time.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-user-secret" />
                  </div>
                  <div className="description">
                    <h3>We value your privacy</h3>
                    <p>
                      We do not share your strategies and trades with anyone,
                      unless you want us too.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    Register
                  </CardTitle>
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
                  <div className="division">
                    <div className="line l" />
                    <span>or</span>
                    <div className="line r" />
                  </div>
                  <Form className="register-form" onSubmit={register}>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleEmailChange}
                      onFocus={handleEmailFocus}
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={user.password}
                      minLength={10}
                      onChange={handlePasswordChange}
                      onFocus={handlePasswordFocus}
                    />
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      onChange={handleConfirmPasswordChange}
                      onFocus={handleConfirmPasswordFocus}
                    />
                    <Button
                      block
                      className="btn-round"
                      color="default"
                      type="submit"
                      value="Log In"
                    >
                      Register
                    </Button>
                  </Form>
                  <div className="login">
                    <p>
                      Already have an account?{' '}
                      <a href='/login-page' >
                        Log in
                      </a>
                      .
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="demo-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made with{' '}
              <i className="fa fa-heart heart" /> by Jason Maynard
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return {cookie: ownProps.myCookie}
}

export default connect(mapStateToProps, {fetchUser})(RegisterPage);
