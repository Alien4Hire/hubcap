import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Label, CustomInput, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { fetchStockData } from '../../../redux/screener/actions';
import HyperDatepicker from '../../../components/Datepicker';
import RangeFilter from './RangeFilter';
import { useHistory } from 'react-router-dom';

const columns = [
    {
        dataField: 'ticker',
        text: 'Ticker',
    },
    {
        dataField: 'name',
        text: 'Name',
    },
    {
        dataField: 'close',
        text: 'Close',
    },
    {
        dataField: 'daily_change',
        text: 'Daily Change',
    },
    {
        dataField: 'volume',
        text: 'Volume',
    },
    {
        dataField: 'marketCapitalization',
        text: 'Market Cap',
    },
];

const volumeMinValue = 50000;
const volumeMaxValue = 50000000;
const marketCapMinValue = 100000000;
const marketCapMaxValue = 200000000000;
const daysSinceEntryMinValue = 1;
const daysSinceEntryMaxValue = 21;
const exchangeOptions = ['Stock', 'Forex', 'Crypto', 'Industry'];
const industryOptions = [
    'Life Sciences Tools & Services',
    'Metals & Mining',
    'Diversified Consumer Services',
    'None',
    'Airlines',
    'Real Estate',
    'Insurance',
    'Retail',
    'Communications',
    'Building',
    'Technology',
    'Logistics & Transportation',
    'Aerospace & Defense',
    'Financial Services',
    'Biotechnology',
    'Health Care',
    'Banking',
    'Commercial Services & Supplies',
    'Construction',
    'Pharmaceuticals',
    'Hotels',
    'Restaurants & Leisure',
    'Food Products',
    'Utilities',
    'Machinery',
    'Telecommunication',
    'Trading Companies & Distributors',
    'Energy',
    'Auto Components',
    'Semiconductors',
    'Chemicals',
    'Marine',
    'Professional Services',
    'Media',
    'Electrical Equipment',
    'Packaging',
    'Beverages',
    'Consumer products',
    'Textiles',
    'Apparel & Luxury Goods',
    'Distributors',
    'Road & Rail',
    'Automobiles',
    'Industrial Conglomerates',
    'Leisure Products',
    'Tobacco',
    'Transportation Infrastructure',
];

const Screener = ({ fetchStockData, loading, data, pagination }) => {
    const history = useHistory();
    const [volumeFilter, updateVolumeFilter] = useState([volumeMinValue, volumeMaxValue]);
    const [marketCapFilter, updateMarketCapFilter] = useState([marketCapMinValue, marketCapMaxValue]);
    const [daysSinceEntryFilter, updateDaysSinceEntryFilter] = useState([
        daysSinceEntryMinValue,
        daysSinceEntryMaxValue,
    ]);

    useEffect(() => {
        fetchStockData({ date: '2020/10/01' }, {});
    }, []);

    const handleChangeVolumeFilter = (value) => {
        updateVolumeFilter(value);
        fetchStockData({ date: '2020/10/01', volume_range: value.join(',') }, {});
        console.log('history', history.location);
        history.push(`?volume_range=${value.join(',')}`);
    };

    const handleChangeMarketCapFilter = (value) => {
        updateMarketCapFilter(value);
        fetchStockData({ date: '2020/10/01', market_cap_range: value.join(',') }, {});
    };

    const handleChangeDaysSinceEntryFilter = (value) => {
        updateDaysSinceEntryFilter(value);
    };

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total ml-2">
            Showing {from} to {to} of {size} Results
        </span>
    );

    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
            {
                text: 'All',
                value: data.length,
            },
        ], // A numeric array is also available. the purpose of above example is custom the text
    };

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
                        <h4 className="page-title"></h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className="page-title">TOOLS</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeFilter
                        id="volume"
                        label="Volume"
                        value={volumeFilter}
                        incrementNumber={50000}
                        minValue={volumeMinValue}
                        maxValue={volumeMaxValue}
                        onChange={handleChangeVolumeFilter}
                    />
                </Col>
                <Col>
                    <div>
                        <Label>Williams Percent Range</Label>
                        <CustomInput type="checkbox" id="williamsPercentRange" label="" inline />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeFilter
                        id="marketCap"
                        label="Market Cap"
                        value={marketCapFilter}
                        incrementNumber={100000000}
                        minValue={marketCapMinValue}
                        maxValue={marketCapMaxValue}
                        onChange={handleChangeMarketCapFilter}
                    />
                </Col>
                <Col> </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <Label>Entry Long</Label>
                        <CustomInput type="checkbox" id="entryLong" label="" inline />
                    </div>
                </Col>
                <Col>
                    <div>
                        <Label>Exchange</Label>
                        <Input type="select" name="select" id="exchange">
                            {exchangeOptions.map((item) => (
                                <option>{item}</option>
                            ))}
                        </Input>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Label>Industry</Label>
                        <Input type="select" name="select" id="industry">
                            {industryOptions.map((item) => (
                                <option>{item}</option>
                            ))}
                        </Input>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <Label>Entry Short</Label>
                        <CustomInput type="checkbox" id="entryShort" label="" inline />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <Label>Attar Explosion</Label>
                        <CustomInput type="checkbox" id="attarExplosion" label="" inline />
                    </div>
                </Col>
                <Col>
                    <div>
                        <Label>Safe Entry</Label>
                        <CustomInput type="checkbox" id="safeEntry" label="" inline />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeFilter
                        id="daysSinceEntry"
                        label="Days Since Entry"
                        value={daysSinceEntryFilter}
                        incrementNumber={1}
                        minValue={daysSinceEntryMinValue}
                        maxValue={daysSinceEntryMaxValue}
                        onChange={handleChangeDaysSinceEntryFilter}
                    />
                </Col>
                <Col> </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="header-title">Screener</h4>
                            <BootstrapTable
                                bootstrap4
                                keyField="ticker"
                                data={data}
                                columns={columns}
                                // defaultSorted={defaultSorted}
                                pagination={paginationFactory(paginationOptions)}
                                wrapperClasses="table-responsive"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        data: state.Screener.data,
        pagination: state.Screener.pagination,
        loading: state.Screener.loading['fetch-stock-data'] || false,
        error: state.Screener.error['fetch-stock-data'],
    };
};

export default connect(mapStateToProps, { fetchStockData })(Screener);
