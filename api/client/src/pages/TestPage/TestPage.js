import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';

import HyperDatepicker from '../../components/Datepicker';

import { API } from '../../services/api';
import { connect } from 'react-redux';
import { stockSelector, fetchWatchlists, loginUser } from '../../redux/actions';

const AnalyticsDashboardPage = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        API.getUser().then((r) => {
            // console.log(r);
            setUser(r);
        });
    }, []);
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="form-inline">
                                <div className="form-group">
                                    <HyperDatepicker />
                                </div>
                                <button className="btn btn-primary ml-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </button>
                                <button className="btn btn-primary ml-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>User Data</h4>
                    <pre>{user ? JSON.stringify(user, ' ', 2) : null}</pre>
                    <Button>Login</Button>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
};

export default connect(mapStateToProps, { loginUser, fetchWatchlists })(AnalyticsDashboardPage);
