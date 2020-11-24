// @flow
import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { TVChartContainer } from '../../components/TVChartContainer/index';
import CardContainer from './CardContainer';

const IndustryCharts = () => {
    const [symbol, setSymbol] = useState('TECHNOLOGY');

    return (
        <React.Fragment>
            {/* <Row>
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
                            </form>
                        </div>
                        <h4 className="page-title">Trading Lab</h4>
                    </div>
                </Col>
            </Row> */}

            <Row>
                <Col xl={3} lg={4}>
                    <CardContainer />
                </Col>
                <Col xl={9} lg={8}>
                    <TVChartContainer style={{ maxHeight: '800px', width: '80%' }} symbol={symbol} />
                </Col>
            </Row>

            <Row>
                <Col xl={4} lg={6}>
                    {/* <ViewsChart /> */}
                </Col>
                <Col xl={4} lg={6}>
                    {/* <BrowsersChart /> */}
                </Col>
                <Col xl={4} lg={12}>
                    {/* <OsChart /> */}
                </Col>
            </Row>

            <Row>
                <Col xl={4} lg={6}>
                    {/* <Channels /> */}
                </Col>
                <Col xl={4} lg={6}>
                    {/* <Social /> */}
                </Col>
                <Col xl={4} lg={6}>
                    {/* <Engagement /> */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default IndustryCharts;
