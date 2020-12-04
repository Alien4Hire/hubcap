import React from 'react';
import { Row, Col } from 'reactstrap';
import ProfilePicture from './ProfilePicture';
import UpgradeAccount from './UpgradeAccount';

const UserDashboard = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>{/* <ProfilePicture /> */}</Col>
            </Row>
            <Row>
                <Col>
                    <UpgradeAccount />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default UserDashboard;
