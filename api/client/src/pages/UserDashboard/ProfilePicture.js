import React from 'react';
import SimpleBar from 'simplebar-react';

import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import avatar from '../../assets/images/users/avatar-6.jpg';

//  datetime, headline, image, source, summary, url
const NewsCard = ({ news }) => {
    const records = news;

    return (
        <div className="update-profile-picture">
            <Card className="profile-card">
                <CardBody className="profile-body">
                    <Col>
                        <Row>
                            <div className="profile-head">
                                <img className="profile-Image" src={avatar} alt="img"></img>
                                <i className="mdi mdi-plus-circle-outline"></i>
                            </div>
                            <div classname="text-right">
                                <h3>Update Avatar</h3>
                            </div>
                        </Row>
                    </Col>

                    <div className="profile-text">
                        <h4 className="profile-headline" href={''}></h4>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default NewsCard;
