import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Label, CustomInput, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchStockData } from '../../redux/screener/actions';

import {Table} from 'react-infinite-table';

const rows = [
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "A", close: 127.05999755859, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AA", close: 24.989999771118, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AACG", close: 1.2410000562668, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAL", close: 15.130000114441, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAMC", close: 22.389999389648, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAME", close: 2.4100000858307, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAN", close: 20.190000534058, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAOI", close: 10.189999580383, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAON", close: 69.30999755859399, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAP", close: 170.05999755859, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523},
    {time: 1610064000, date: "2021-01-08T05:00:00.000Z", ticker: "AAPL", close: 132.05000305176, security_type: "Stock", daily_change: '1', finnhubIndustry: 'metals', marketCapitalization: 2577, name: 'AALfer', rows_since_condition: null, volume: 3423523}
]
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




const Screener = ({ fetchStockData, loading, data, pagination }) => {
    const [selectedRows, setSelectedRows] = useState(null)


    return (
        <div></div>
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
