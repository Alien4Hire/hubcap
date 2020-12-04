import React from "react";

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
} from "reactstrap";

// core components
import ColorNavbar from "components/Navbars/ColorNavbar.js";

function LoginPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("full-screen");
    };
  });
  return (
    <>
      <ColorNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/sections/bruno-abatti.jpg") + ")",
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
                  <Form className="register-form">
                    <label>Email</label>
                    <Input
                      className="no-border"
                      placeholder="Email"
                      type="email"
                    />
                    <label>Password</label>
                    <Input
                      className="no-border"
                      placeholder="Password"
                      type="password"
                    />
                    <Button block className="btn-round" color="danger">
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
                Don't have an acocunt? <a href="/register">{"  "} Register</a>
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
