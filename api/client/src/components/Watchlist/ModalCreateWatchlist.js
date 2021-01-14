import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalWithForm extends React.Component<ModalWithFormProps, ModalWithFormState> {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    /*:: toggle: () => void */
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="header-title">Modal with Pages</h4>

                    <p className="text-muted">Examples of custom modals.</p>

                    <Button color="primary" onClick={this.toggle}>
                        Sign Up
                    </Button>

                    {/* Sign up Modal */}
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
                        <ModalBody>
                            <form className="pl-3 pr-3" action="#">
                                <div className="form-group">
                                    <label htmlFor="username">Name</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="username"
                                        required=""
                                        placeholder="Michael Zenaty"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="emailaddress">Email address</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="emailaddress"
                                        required=""
                                        placeholder="john@deo.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        required=""
                                        id="password"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">
                                            I accept <a href="/">Terms and Conditions</a>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group text-center">
                                    <button className="btn btn-primary" type="submit">
                                        Sign Up Free
                                    </button>
                                </div>
                            </form>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>
        );
    }
}