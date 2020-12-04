import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Label, CustomInput, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { fetchStockData } from '../../../redux/screener/actions';
import HyperDatepicker from '../../../components/Datepicker';
import RangeFilter from './RangeFilter';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { parse, stringify } from 'qs';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

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
        formatter: (cell) => {
            return Number(cell) ? `${Math.abs((1 - Number(cell)) * 100).toFixed(1)}%` : `-`;
        },
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
const daysSinceEntryMinValue = 0;
const daysSinceEntryMaxValue = 14;
const exchangeOptions = ['Any', 'Stock', 'Forex', 'Crypto', 'Industry'];
const industryOptions = [
    'Any',
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

const handleFetchOnSliderChange = debounce(function (query, pagination, actionFn) {
    actionFn({ ...query }, pagination);
}, 500);

const Screener = ({ fetchStockData, loading, data, pagination }) => {
    const history = useHistory();
    const [volumeFilter, updateVolumeFilter] = useState([volumeMinValue, volumeMaxValue]);
    const [marketCapFilter, updateMarketCapFilter] = useState([marketCapMinValue, marketCapMaxValue]);
    const [daysSinceEntryFilter, updateDaysSinceEntryFilter] = useState([
        daysSinceEntryMinValue,
        daysSinceEntryMaxValue,
    ]);

    const [williamsPercentRange, toggleWilliamsPercentRange] = useState(false);
    const [entryLongFlag, toggleEntryLongFlag] = useState(false);
    const [entryShortFlag, toggleEntryShortFlag] = useState(false);
    const [attarExplosionFlag, toggleAttarExplosionFlag] = useState(false);
    const [safeEntryFlag, toggleSafeEntryFlag] = useState(false);
    const [selectedExchange, updateSelectedExchange] = useState('');
    const [selectedIndustry, updateSelectedIndustry] = useState('');
    const [currentDate, updateCurrentDate] = useState(moment());
    const [isPageLoaded, setPageLoaded] = useState(false);

    const validateRangeValue = (range, min, max) => {
        const rangeValue = range.split(',');
        if (rangeValue.length === 2) {
            if (rangeValue[0] !== 'x' && isNaN(rangeValue[0])) {
                return null;
            }
            if (rangeValue[1] !== 'x' && isNaN(rangeValue[1])) {
                return null;
            }
            if (rangeValue[0] === 'x') {
                rangeValue[0] = min;
            }
            if (rangeValue[1] === 'x') {
                rangeValue[1] = max;
            }
            return rangeValue;
        } else {
            return null;
        }
    };

    const hydrateComponent = (queryParams) => {
        if (queryParams.volume_range) {
            const volumeRange = validateRangeValue(queryParams.volume_range, volumeMinValue, volumeMaxValue);
            if (volumeRange) {
                updateVolumeFilter(volumeRange);
            }
        }
        if (queryParams.market_cap_range) {
            const marketCapRange = validateRangeValue(
                queryParams.market_cap_range,
                marketCapMinValue,
                marketCapMaxValue
            );
            if (marketCapRange) {
                updateMarketCapFilter(marketCapRange);
            }
        }
        if (queryParams.days_entry_range) {
            const daysEntryRange = validateRangeValue(
                queryParams.days_entry_range,
                daysSinceEntryMinValue,
                daysSinceEntryMaxValue
            );
            if (daysEntryRange) {
                updateDaysSinceEntryFilter(daysEntryRange);
            }
        }

        if (Number(queryParams.william_percent_range)) {
            toggleWilliamsPercentRange(true);
        }

        if (Number(queryParams.entry_long)) {
            toggleEntryLongFlag(true);
        }

        if (Number(queryParams.entry_short)) {
            toggleEntryShortFlag(true);
        }

        if (Number(queryParams.attar_explosion)) {
            toggleAttarExplosionFlag(true);
        }

        if (Number(queryParams.safe_entry)) {
            toggleSafeEntryFlag(true);
        }

        if (exchangeOptions.includes(queryParams.exchange)) {
            updateSelectedExchange(queryParams.exchange);
        }

        if (industryOptions.includes(queryParams.industry)) {
            updateSelectedIndustry(queryParams.industry);
        }

        if (moment(queryParams.date, 'YYYY/MM/DD').isValid()) {
            updateCurrentDate(moment(queryParams.date, 'YYYY/MM/DD'));
        }

        setPageLoaded(true);
    };

    // On Load
    useEffect(() => {
        let queryParams = { date: formatCurrentDate() };
        let newPagination = { ...pagination };
        const { pageSize, page, ...queryParams1 } = parseQuery();
        if (Object.keys(queryParams1).length) {
            if (pageSize) {
                newPagination.pageSize = pageSize;
            }
            if (page) {
                newPagination.page = page;
            }
            queryParams = { ...queryParams, ...queryParams1 };
        }
        fetchStockData({ ...queryParams }, { ...newPagination });
        // set component values here if found in query
        hydrateComponent(queryParams);
    }, []);

    useEffect(() => {
        if (isPageLoaded) {
            const { william_percent_range, ...queryParams } = parseQuery();
            if (williamsPercentRange) {
                queryParams.william_percent_range = 1;
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [williamsPercentRange]);

    useEffect(() => {
        if (isPageLoaded) {
            const { entry_long, ...queryParams } = parseQuery();
            if (entryLongFlag) {
                queryParams.entry_long = 1;
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [entryLongFlag]);

    useEffect(() => {
        if (isPageLoaded) {
            const { entry_short, ...queryParams } = parseQuery();
            if (entryShortFlag) {
                queryParams.entry_short = 1;
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [entryShortFlag]);

    useEffect(() => {
        if (isPageLoaded) {
            const { attar_explosion, ...queryParams } = parseQuery();
            if (attarExplosionFlag) {
                queryParams.attar_explosion = 1;
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [attarExplosionFlag]);

    useEffect(() => {
        if (isPageLoaded) {
            const { safe_entry, ...queryParams } = parseQuery();
            if (safeEntryFlag) {
                queryParams.safe_entry = 1;
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [safeEntryFlag]);

    useEffect(() => {
        if (isPageLoaded) {
            const { exchange, ...queryParams } = parseQuery();
            if (selectedExchange && selectedExchange !== 'Any') {
                queryParams.exchange = encodeURIComponent(selectedExchange);
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [selectedExchange]);

    useEffect(() => {
        if (isPageLoaded) {
            const { industry, ...queryParams } = parseQuery();
            if (selectedIndustry && selectedIndustry !== 'Any') {
                queryParams.industry = encodeURIComponent(selectedIndustry);
            }
            fetchStockData({ ...queryParams }, { ...pagination });
            history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
        }
    }, [selectedIndustry]);

    ///Date get and format
    const formatCurrentDate = (newDate) => {
        return (newDate || currentDate).format('YYYY/MM/DD');
    };

    const parseQuery = () => {
        const queryParams = {
            ...parse(history.location.search.replace(/\?/g, '')),
        };
        return queryParams;
    };

    const handleChangeVolumeFilter = (value, queryValue) => {
        updateVolumeFilter(value);
        const volumeRange = [...queryValue].join(',');
        const { volume_range, ...queryParams } = parseQuery();
        if (volumeRange) {
            queryParams.volume_range = volumeRange;
        }

        handleFetchOnSliderChange({ ...queryParams }, { ...pagination }, fetchStockData);
        history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
    };

    const handleChangeMarketCapFilter = (value, queryValue) => {
        updateMarketCapFilter(value);
        const marketCapRange = [...queryValue].join(',');
        const { market_cap_range, ...queryParams } = parseQuery();
        if (marketCapRange) {
            queryParams.market_cap_range = marketCapRange;
        }

        handleFetchOnSliderChange({ ...queryParams }, { ...pagination }, fetchStockData);
        history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
    };

    const handleChangeDaysSinceEntryFilter = (value, queryValue) => {
        updateDaysSinceEntryFilter(value);
        const daysSinceEntry = [...queryValue].join(',');
        const { days_entry_range, ...queryParams } = parseQuery();
        if (daysSinceEntry) {
            queryParams.days_entry_range = daysSinceEntry;
        }

        handleFetchOnSliderChange({ ...queryParams }, { ...pagination }, fetchStockData);
        history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
    };

    const handleChangeDate = (value) => {
        const newDate = moment(value);
        updateCurrentDate(newDate);
        const queryParams = parseQuery();
        queryParams.date = formatCurrentDate(newDate);
        handleFetchOnSliderChange({ ...queryParams }, { ...pagination }, fetchStockData);
        history.push(`/dashboard/screener?${stringify(queryParams, { encode: false })}`);
    };

    const handleTableChange = (type, { page, sizePerPage }) => {
        const { pageSize, page: currentPage, ...queryParams } = parseQuery();
        const newPagination = { ...pagination, pageSize: sizePerPage, page: page };
        fetchStockData({ ...queryParams }, newPagination);
        history.push(
            `/dashboard/screener?${stringify(
                { ...queryParams, pageSize: newPagination.pageSize, page: newPagination.page },
                { encode: false }
            )}`
        );
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
        // sizePerPageList: [
        //     {
        //         text: '5',
        //         value: 5,
        //     },
        //     {
        //         text: '10',
        //         value: 10,
        //     },
        //     {
        //         text: '25',
        //         value: 25,
        //     },
        //     {
        //         text: 'All',
        //         value: data.length,
        //     },
        // ], // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
        <LoadingOverlay
            active={loading}
            spinner
            text="Loading..."
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: 'rgba(255, 255, 255, 0)',
                }),
                spinner: (base) => ({
                    ...base,
                    width: '100px',
                    '& svg circle': {
                        stroke: '#3d73dd',
                    },
                }),
            }}>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="form-inline">
                                <div className="form-group">
                                    <HyperDatepicker
                                        hideAddon={false}
                                        value={currentDate.toDate()}
                                        onChange={handleChangeDate}
                                    />
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
            <Row className="row-bottom-margin">
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
                <Col className="col-center-left">
                    <Label>Williams Percent Range</Label>
                    <CustomInput
                        type="checkbox"
                        id="williamsPercentRange"
                        label=""
                        inline
                        checked={williamsPercentRange}
                        onChange={() => toggleWilliamsPercentRange(!williamsPercentRange)}
                    />
                </Col>
            </Row>
            <Row className="row-bottom-margin">
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
            <Row className="row-bottom-margin">
                <Col>
                    <Row>
                        <Col className="col-center-left">
                            <Label>Entry Long</Label>
                            <CustomInput
                                type="checkbox"
                                id="entryLong"
                                label=""
                                inline
                                checked={entryLongFlag}
                                onChange={() => toggleEntryLongFlag(!entryLongFlag)}
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col className="col-center-left">
                                    <Label>Exchange</Label>
                                </Col>
                                <Col className="col-center-left">
                                    <Input
                                        type="select"
                                        name="select"
                                        id="exchange"
                                        value={selectedExchange}
                                        onChange={(e) => updateSelectedExchange(e.target.value)}>
                                        {exchangeOptions.map((item) => (
                                            <option>{item}</option>
                                        ))}
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col className="col-center-left">
                            <Label>Industry</Label>
                        </Col>
                        <Col className="col-center-left">
                            <Input
                                type="select"
                                name="select"
                                id="industry"
                                value={selectedIndustry}
                                onChange={(e) => updateSelectedIndustry(e.target.value)}>
                                {industryOptions.map((item) => (
                                    <option>{item}</option>
                                ))}
                            </Input>
                        </Col>
                    </Row>
                </Col>
                <Col> </Col>
            </Row>
            <Row className="row-bottom-margin">
                <Col className="col-center-left">
                    <Label>Entry Short</Label>
                    <CustomInput
                        type="checkbox"
                        id="entryShort"
                        label=""
                        inline
                        checked={entryShortFlag}
                        onChange={() => toggleEntryShortFlag(!entryShortFlag)}
                    />
                </Col>
            </Row>
            <Row className="row-bottom-margin">
                <Col className="col-center-left">
                    <Label>Attar Explosion</Label>
                    <CustomInput
                        type="checkbox"
                        id="attarExplosion"
                        label=""
                        inline
                        checked={attarExplosionFlag}
                        onChange={() => toggleAttarExplosionFlag(!attarExplosionFlag)}
                    />
                </Col>
                <Col className="col-center-left">
                    <Label>Safe Entry</Label>
                    <CustomInput
                        type="checkbox"
                        id="safeEntry"
                        label=""
                        inline
                        checked={safeEntryFlag}
                        onChange={() => toggleSafeEntryFlag(!safeEntryFlag)}
                    />
                </Col>
                <Col> </Col>
            </Row>
            <Row className="row-bottom-margin">
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
            <Row className="row-bottom-margin">
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="header-title">Screener</h4>
                            <BootstrapTable
                                remote
                                bootstrap4
                                keyField="ticker"
                                data={data}
                                columns={columns}
                                pagination={paginationFactory({
                                    ...paginationOptions,
                                    page: pagination.page,
                                    sizePerPage: pagination.pageSize,
                                    totalSize: pagination.total,
                                })}
                                wrapperClasses="table-responsive"
                                onTableChange={handleTableChange}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </LoadingOverlay>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        data: state.Screener.data,
        pagination: state.Screener.pagination,
        loading: state.Screener.loading['fetch-stock-data'] || false,
        error: state.Screener.error['fetch-stock-data'],
    };
};

export default connect(mapStateToProps, { fetchStockData })(Screener);
