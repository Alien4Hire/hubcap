// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import TitleWidget from '../../components/TradingLab/TitleWidget';

const Statistics = () => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={6}>
                    <TitleWidget
                        icon="mdi mdi-account-multiple"
                        description="Number of Customers"
                        title="Customers"
                        stats="36,254"
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '5.27%',
                            time: 'Since last month',
                        }}></TitleWidget>
                </Col>

                <Col lg={6}>
                    <TitleWidget
                        icon="mdi mdi-cart-plus"
                        description="Number of Orders"
                        title="Orders"
                        stats="5,543"
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '1.08%',
                            time: 'Since last month',
                        }}></TitleWidget>
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <TitleWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="Revenue"
                        stats="$6,254"
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '7.00%',
                            time: 'Since last month',
                        }}></TitleWidget>
                </Col>

                <Col lg={6}>
                    <TitleWidget
                        icon="mdi mdi-pulse"
                        description="Growth"
                        title="Growth"
                        stats="+ 30.56%"
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '4.87%%',
                            time: 'Since last month',
                        }}></TitleWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
