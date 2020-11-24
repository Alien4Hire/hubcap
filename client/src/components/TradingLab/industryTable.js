import React from 'react';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import { Img } from 'react-image';
import hubcap from '../../assets/images/favicon.png';
import PageTitle from '../PageTitle';
import SimpleBar from 'simplebar-react';

const records = [];

const IndustryTable = ({ ticker, relatedTicker }) => {
    const records = relatedTicker;
    return (
        <Card className="Related-card">
            <CardBody>
                <h4 className="header-title">Related</h4>
                <p className="text-muted font-14 mb-4">
                    Add <code>stocks</code> from similar industries as {ticker}
                </p>
                <SimpleBar style={{ maxHeight: '350px', width: '100%' }}>
                    <Table className="mb-0" hover>
                        <thead className="table-header">
                            <tr>
                                <th className="secondary-column"></th>
                                <th className="secondary-column">Ticker</th>
                                <th className="secondary-column">Company Name</th>
                                <th className="secondary-column">Market Cap.(M)</th>
                                <th className="last-column">Industry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records &&
                                records.map((record, index) => {
                                    return (
                                        <tr key={index} className="big-table">
                                            <td>
                                                <Img className="table-logo" src={[record.logo, hubcap]}></Img>
                                            </td>
                                            <td className="first-column">
                                                <span className="ticker-text">{record.ticker}</span>
                                            </td>
                                            <td className="secondary-column">{record.name}</td>
                                            <td className="secondary-column">${record.marketCapitalization}</td>
                                            <td className="last-column">{record.finnhubIndustry}</td>
                                            <td className="mobile-position">
                                                <Img className="mobile-logo" src={[record.logo, hubcap]}></Img>
                                            </td>
                                            <td className="mobile-position">
                                                <span className="mobile-ticker">{record.ticker}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </SimpleBar>
            </CardBody>
        </Card>
    );
};

export default IndustryTable;
