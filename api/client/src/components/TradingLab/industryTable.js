import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import { Img } from 'react-image';
import hubcap from '../../assets/images/favicon.png';
import PageTitle from '../PageTitle';
import SimpleBar from 'simplebar-react';
import { connect, useDispatch } from 'react-redux';
import { fetchRecomendedStocks } from '../../redux/actions'

const records = [];

const IndustryTable = ({ related, industry, ticker }) => {
    const dispatch = useDispatch();
    const records = related;

    useEffect(() => {
        dispatch(fetchRecomendedStocks(industry))
    }, [])
    
    useEffect(() => {
        dispatch(fetchRecomendedStocks(industry))
    }, [industry])

    return (
        <Card className="Related-card">
            <CardBody>
                <h4 className="header-title">Related</h4>
                <p className="text-muted font-14 mb-4">
                    Add <code>stocks</code> from similar industries as {ticker}
                </p>
                
                    <Table className="mb-0" hover>
                        <div className="table-header">
                            <tr>
                                <th className="secondary-column"></th>
                                <th className="secondary-column">Ticker</th>
                                <th className="secondary-column">Company Name</th>
                                <th className="secondary-column">Market Cap.(M)</th>
                            </tr>
                        </div>
                        <SimpleBar style={{ maxHeight: '350px', width: '100%' }}>
                        <div>
                            {records &&
                                records.map((record, index) => {
                                    return (
                                        <tr key={record + index} className="big-table">
                                            <td className="first-column">
                                                <span className="ticker-text"><Img className="table-logo" src={[record.logo, hubcap]}></Img>{record.ticker}</span>
                                            </td>
                                            <td className="secondary-column">{record.name}</td>
                                            <td className="secondary-column market-cap-col">${record.marketCapitalization}</td>
                                            <td className="mobile-position">
                                                <Img className="mobile-logo" src={[record.logo, hubcap]}></Img>
                                            </td>
                                            <td className="mobile-position">
                                                <span className="mobile-ticker">{record.ticker}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </div>
                        </SimpleBar>
                    </Table>
             
            </CardBody>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        industry: state.TradingLab.stock.finnhubIndustry,
        related: state.TradingLab.relatedStocks,
    }
}

export default connect(mapStateToProps, { fetchRecomendedStocks })(IndustryTable);
