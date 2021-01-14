import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { connect } from 'react-redux';

import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import SplineAreaChart from '../../pages/charts/Apex/SplineAreaChart';
//  datetime, headline, image, source, summary, url
const TabData = () => {
    const [activeTab, setActiveTab] = useState('2');

    const tabContents = [
        {
            id: '1',
            title: 'Home',
            icon: 'mdi mdi-home-variant',
            text:
                'Home - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        },
        {
            id: '2',
            title: 'Profile',
            icon: 'mdi mdi-account-circle',
            text:
                'Profile - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        },
        {
            id: '3',
            title: 'Settings',
            icon: 'mdi mdi-settings-outline',
            text:
                'Settings - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        },
    ];

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };


    return (
        <React.Fragment>
            <Row>
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mb-3">Default Tabs</h4>

                            <Nav tabs>
                                {tabContents.map((tab, index) => {
                                    return (
                                        <NavItem key={index}>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: activeTab === tab.id })}
                                                onClick={() => {
                                                    toggle(tab.id);
                                                }}>
                                                <i
                                                    className={classnames(
                                                        tab.icon,
                                                        'd-lg-none',
                                                        'd-block',
                                                        'mr-1'
                                                    )}></i>
                                                <span className="d-none d-lg-block">{tab.title}</span>
                                            </NavLink>
                                        </NavItem>
                                    );
                                })}
                            </Nav>

                            <TabContent activeTab={activeTab}>
                                {tabContents.map((tab, index) => {
                                    return (
                                        <TabPane tabId={tab.id} key={index}>
                                            <Row>
                                                <Col sm="12">
                                                    <p className="mt-3">{tab.text}</p>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    );
                                })}
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )

}

export default TabData;