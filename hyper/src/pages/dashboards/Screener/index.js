import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { fetchStockData } from '../../../redux/screener/actions';
import HyperDatepicker from '../../../components/Datepicker';

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

const Screener = ({ fetchStockData, loading, data, pagination }) => {
    useEffect(() => {
        fetchStockData({ date: '2020/10/01' }, {});
    }, []);

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
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="header-title">Screener</h4>
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
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
