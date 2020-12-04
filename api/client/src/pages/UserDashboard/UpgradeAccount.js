import React from 'react';

import { Container, Row, Col, Card, CardBody, Button, Form, Input, Label } from 'reactstrap';

//  datetime, headline, image, source, summary, url
const ProfilePage = ({ news }) => {
    const records = news;

    return (
        <div className="update-account">
            <style>@import url('https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300&display=swap');</style>
            <Card className="account-card">
                <CardBody className="account-body">
                    <Row className="account-title">
                        <Col>
                            <h1 className="account-title-one">Account</h1>
                        </Col>
                    </Row>
                    <Row className="row-2-left">
                        <Col>
                            <h4 className="memberbilling">MEMBERSHIP &#x26; BILLING</h4>
                            <Button className="btn-edit">Cancel Membership</Button>
                        </Col>
                    </Row>
                    <Row className="row-2-right padding-bottom">
                        <Col className="Col-2-right">
                            <Row className="group-one">
                                <Col className="left-text">
                                    <div className="email-display spacing">Jaymaynard84@gmail.com</div>
                                    <div className="password-display spacing">Password: ****************</div>
                                </Col>
                                <Col className="right-text padding-top">
                                    <a href="/" className="change-email spacing move-right">
                                        Change Email
                                    </a>
                                    <div></div>
                                    <a href="/" className="change-password spacing move-right">
                                        Change Password
                                    </a>
                                </Col>
                            </Row>
                            <Row className="group-one">
                                <Col className="left-text">
                                    <div className="payment-info spacing left-text">Stripe</div>
                                </Col>
                                <Col className="right-text padding-top">
                                    <a href="/" className="manage-payment spacing move-right">
                                        Manage payment info
                                    </a>
                                    <div></div>
                                    <a href="/" className="billing-details spacing move-right">
                                        Billing Details
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="right-text padding-top">
                                    <a href="/" className="spacing move-right">
                                        Upcoming Features
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col></Col>
                    </Row>
                    <Row className="top-border space-below">
                        <Col className="left-text right-border">
                            <h4 className="plan-details">PLAN DETAILS</h4>
                        </Col>
                        <Col className="left-border">
                            <Row>
                                <Col className="left-text">
                                    <div className="payment-info spacing left-text move-left">Basic(plantype)</div>
                                </Col>
                                <Col className="right-text padding-top">
                                    <a href="/pages/pricing" className="billing-details spacing move-right">
                                        Change Plan
                                    </a>
                                    <div></div>
                                    <a href="/" className="billing-details spacing move-right">
                                        Sign Out
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="right-border">
                            <h4 className="profile-form">PROFILE</h4>
                        </Col>
                        <Col className="profile-form">
                            <Form className="col-md-12">
                                <Row className="block">
                                    <Label className="website-label float-left">Website:</Label>
                                    <Input type="text" className="small-text"></Input>
                                </Row>
                                <Row className="block">
                                    <Label className="website-label float-left">Twitter:</Label>
                                    <Input type="text" className="small-text"></Input>
                                </Row>
                                <Row className="block">
                                    <Label className="website-label float-left">Youtube Channel link:</Label>
                                    <Input type="text" className="small-text"></Input>
                                </Row>
                                <Row className="block">
                                    <Label className="website-label float-left">Company:</Label>
                                    <Input type="text" className="small-text"></Input>
                                </Row>
                                <Row className="block">
                                    <Label className="website-label float-left">About Me:</Label>
                                    <Input type="textarea" className="large-text"></Input>
                                </Row>
                                <div className="padding-small"></div>
                                <Button className="save-button">Save</Button>
                            </Form>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProfilePage;
