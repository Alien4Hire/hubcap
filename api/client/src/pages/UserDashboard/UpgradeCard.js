// @flow
import React, { useState, useToggle, useEffect } from 'react';
import { Card, CardBody, Col, Row, Input } from 'reactstrap';

const Cards = (plans) => {
    const [border, setBorder] = useState(plans.currentBorder);
    const [path, setPath] = useState('/');
    const [index, setIndex] = useState(plans.index);

    const cardSelector = () => {
        // setBorder('profile-box-two');
        // console.log(plans);
        // const planLog = plans.changeBorder(index);
        // console.log(plans.index);
        // setBorder(planLog);
        // plans.setSelectedPlan(index);
        // console.log(plans.selectedPlan);
        plans.changeBorder(index);

        console.log(plans.currentBorder);
    };

    // const selectChange = () => {
    //     console.log(plans);
    // };

    // useEffect(() => {
    //     selectChange();
    // });

    return (
        <React.Fragment>
            <Card className={border} onClick={cardSelector}>
                <Row>
                    <Col className="float-left max-width-plan">
                        <div className="plan-selector">Current Plan:</div>
                        <div className="center-text plan-font">{plans.plan}</div>
                    </Col>
                    <Col className="float-right padding-plan-top">
                        <Row>
                            <Col className="max-plan-width">
                                <p className="plan-description">{plans.description}</p>
                            </Col>
                            <Col>
                                <div className="plan-price">${plans.price} / month</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    );
};

export default Cards;
