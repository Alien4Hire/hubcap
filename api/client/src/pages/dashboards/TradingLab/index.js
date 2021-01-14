// @flow
import React, { useEffect, useState } from 'react';
import { CardBody, Row, Col, Button, Container, Card } from 'reactstrap';
import StockDisplay from '../../../components/TradingLab/index';
import StockData from '.././../../components/TradingLab/StockData';
import CeoData from '.././../../components/TradingLab/CeoData';
import CompanyData from '.././../../components/TradingLab/CompanyData';
import NewsData from '.././../../components/TradingLab/NewsData';
import TitleWidget from '../../../components/TradingLab/TitleWidget';
import SplineAreaChart from '../../charts/Apex/SplineAreaChart';
import IndustryTable from '../../../components/TradingLab/industryTable';
import RelatedStock from '../../../components/TradingLab/RelatedStock';
import { connect, useDispatch } from 'react-redux';
import NewsCard from '../../../components/TradingLab/NewsCard';
import TabData from '../../../components/TradingLab/TabData';
import HeatMap from '../../../components/TradingLab/heatmap';

import {loadStockNews, fetchStockData, fetchChartData} from '../../../redux/actions'
// import * as google from 'google-parser'

const EcommerceDashboardPage = ({symbol, allClose, stockData, allTime, close, change, changeAMT, industry}) => {
    const dispatch = useDispatch();
    const [newSymbol, setNewSymbol] = useState('AAPL');
    const [newType, setNewType] = useState('stock');
    const [adjChange, setAdjChange] = useState(change);
    const [adjClose, setAdjClose] = useState(close);
    //Ticker Data
    const [name, setName] = useState('Stock');
    const [ticker, setTicker] = useState('STK');
    const [previousClose, setPreviousClose] = useState(9);
    const [dailyChange, setDailyChange] = useState(10);
    const [changePrice, setDailyPrice] = useState(11);
    //Company Data
    const [logo, setLogo] = useState('logo');
    const [arrow, setArrow] = useState('mdi mdi-arrow-up-bold');
    const [color, setColor] = useState('price-change-red');
    const [date, setDate] = useState(new Date().toLocaleString());
    const [closeShift, setShift] = useState(0);
    const [prevClose, setPrevClose] = useState(0);
    const [time, setTime] = useState(0);
    //Industry Data

    const [relatedTicker, setRelatedTicker] = useState(0);
    //Employee Data
    const [CEOage, setCEOage] = useState(0);
    const [CEOcompensation, setCEOcompensation] = useState(0);
    const [CEOname, setCEOname] = useState('Jimbo');
    const [CEOposition, setCEOposition] = useState(0);
    const [CEOsex, setCEOsex] = useState('male');
    const [CEOhire, setCEOhire] = useState(0);
    // const [formTime, setFormTime] = useState(0);
    //Company News
    const [datetime, setDatetime] = useState(0);
    const [headline, setHeadline] = useState(0);
    const [newsImage, setNewsImage] = useState(0);
    const [source, setSource] = useState(0);
    const [newsSummary, setNewsSummary] = useState(0);
    const [newsUrl, setNewsUrl] = useState(0);
    const [news, setNews] = useState(0);

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    };

    const GetStockData = async () => {
        // setAdjClose(roundToHundredth(close));
        // setAdjChange(roundToHundredth(change))
        // setPreviousClose(roundToHundredth(closes[prevClose]));
        // setDailyChange(roundToHundredth(100 * (1 - close / previousClose)));
        // setDailyPrice(roundToHundredth(close - previousClose));
        if (changeAMT < 0) {
            setArrow('mdi mdi-arrow-down-bold');
            setColor('price-change-red');
        } else {
            setArrow('mdi mdi-arrow-up-bold');
            setColor('price-change-green');
        }
        setDate(new Date().toLocaleString());
        // setTime(allTime);
        // return [];
    };

    // const GetCompanyData = async () => {
    //     var data = await CompanyData();
    //     setName(data.data.name);
    //     setTicker(data.data.ticker);
    //     setLogo(data.data.logo);
    //     setIndustry(data.data.finnhubIndustry);
    //     var Related = await RelatedStock(industry);
    //     setRelatedTicker(Related.data);
    //     console.log(data);
    //     return [];
    // };

    const GetCompanyNews = () => {

        
        // setDatetime(data.data.datetime);
        // setHeadline(data.data.headline);
        // setNewsImage(data.data.image);
        // setSource(data.data.source);
        // setNewsSummary(data.data.summary);
        // setNewsUrl(data.data.url);

    };

    useEffect(() => {
        // dispatch(loadStockData(newSymbol));
        dispatch(fetchStockData(newSymbol));
        dispatch(fetchChartData(newSymbol));
        dispatch(loadStockNews(newSymbol));
        GetStockData();
    }, [])

    useEffect(() => {
        GetStockData()
    }, [changeAMT])

    // useEffect(() => {
    //     GetCompanyNews(symbol)
    // }, [symbol])

    // const GetRelatedStock = async (industry) => {
    //     var data = await RelatedStock(industry);
    //     return [];
    // };

    // useEffect(() => {
    //     // GetStockData();
    //     GetCompanyData();
    //     // GetRelatedStock();
    //     GetCompanyNews();
    // }, [dailyChange]);

    // {close}
    // {name}
    return (
        <React.Fragment>
            <Row>
                <TitleWidget
                    close={close}
                    name={stockData.name}
                    previousClose={previousClose}
                    dailyChange={change}
                    changePrice={changeAMT}
                    logo={stockData.logo}
                    ticker={stockData.ticker}
                    arrow={arrow}
                    color={color}
                    date={date}
                />
            </Row>
            <Row className="second-col">
                <Col>
                    <SplineAreaChart allClose={allClose} ticker={ticker} time={allTime} />
                </Col>
                <Col>
                    <IndustryTable ticker={ticker} relatedTicker={relatedTicker} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <NewsCard
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        symbol: state.Watchlist.stock.selected,
        allClose: state.TradingLab.chart.c,
        allTime: state.TradingLab.chart.t,
        stockData: state.TradingLab.stock,
        close: state.TradingLab.close,
        change: state.TradingLab.change,
        changeAMT: state.TradingLab.changeAMT,
        industry: state.TradingLab.finnhubIndustry,
    }
}

export default connect(mapStateToProps, {loadStockNews, fetchStockData, fetchChartData})(EcommerceDashboardPage);
