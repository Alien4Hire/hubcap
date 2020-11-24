// @flow
import React from 'react';
import { CardBody, Row, Col, Button, Container, Card } from 'reactstrap';
import style from './style.css';
import { useState } from 'react';
import ExternalImage from 'react-external-image';
// type TitleWidgetProps = {
//     ticker: string,
//     name: string,
//     icon: string,
//     currentPrice: Number,
//     change: string,
//     dateUpdated: string,
//     trend: PropTypes.object,
// };

const TitleWidget = ({ ticker, close, name, dailyChange, changePrice, logo, arrow, color, date }) => {
    // const reloadContent = () => {
    //     this.setState({ loading: true });
    //     setTimeout(() => {
    //         this.setState({ loading: false });
    //     }, 500 + 300 * (Math.random() * 5));
    // };
    const eImg = () => <ExternalImage src={logo} />;

    return (
        <React.Fragment>
            <Card className="Title-card">
                <CardBody>
                    <table className="ticker-info">
                        <div className="top-left">
                            <Col>
                                <div className="company-title-section">
                                    <div className="company-name-container">
                                        <div className="image-wrap">
                                            <img src={logo} alt="" />
                                        </div>
                                        <h1 className="company-name">{name}</h1>
                                    </div>
                                    <h4 className="company-ticker">{ticker}</h4>
                                </div>
                            </Col>
                            <Col className="right-column">
                                <div className="quote-price-info">
                                    <div className="text-below">
                                        <span className="current-price"> ${close}</span>
                                        <div className={color}>
                                            <span>${changePrice}</span>
                                            <i className={arrow} />
                                            <span>{dailyChange}%</span>
                                        </div>
                                        <div className="real-time-info">
                                            <em>Price as of {date}</em>
                                        </div>
                                        <div className="view-advanced-chart">
                                            <a href="#InteractiveChart">View Interactive {ticker} Charts</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        {/* <Button color="link" className="card-action p-0" onClick={reloadContent}>
                            <i className="mdi mdi-refresh"></i>
                        </Button> */}
                    </table>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default TitleWidget;
