/** @format */

import React from 'react';

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

function RegisterPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

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

  const google = () => {};

  const register = (ev) => {
    ev.preventDefault();
    api.post('/auth/register', user).then((result) => {
      localStorage.setItem('token', result.data.token);
      window.location.href = 'localhost:3000';
    });
  };

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
                      value={user.email}
                      onChange={(ev) =>
                        setUser({ ...user, email: ev.target.value })
                      }
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      value={user.password}
                      onChange={(ev) =>
                        setUser({ ...user, password: ev.target.value })
                      }
                    />
                    <Input placeholder="Confirm Password" type="password" />
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
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
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

export default RegisterPage;
