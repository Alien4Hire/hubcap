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

import NewsCard from '../../../components/TradingLab/NewsCard';
// import * as google from 'google-parser'

const EcommerceDashboardPage = () => {
    //Ticker Data
    const [close, setClose] = useState(10);
    const [allClose, setAllClose] = useState([0]);
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
    const [industry, setIndustry] = useState(0);
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
        var data = await StockData();
        setShift(data.data.c.length - 1);
        setPrevClose(data.data.c.length - 2);
        setClose(roundToHundredth(data.data.c[closeShift]));
        setPreviousClose(roundToHundredth(data.data.c[prevClose]));
        setDailyChange(roundToHundredth(100 * (1 - close / previousClose)));
        setDailyPrice(roundToHundredth(close - previousClose));
        if (changePrice < 0) {
            setArrow('mdi mdi-arrow-down-bold');
            setColor('price-change-red');
        } else {
            setArrow('mdi mdi-arrow-up-bold');
            setColor('price-change-green');
        }
        setDate(new Date().toLocaleString());
        setAllClose(data.data.c);
        setTime(data.data.t);
        return [];
    };

    const GetCompanyData = async () => {
        var data = await CompanyData();
        setName(data.data.name);
        setTicker(data.data.ticker);
        setLogo(data.data.logo);
        setIndustry(data.data.finnhubIndustry);
        var Related = await RelatedStock(industry);
        setRelatedTicker(Related.data);
        // console.log(relatedTicker);
        return [];
    };

    const GetCompanyNews = async () => {
        var data = await NewsData();
        // setDatetime(data.data.datetime);
        // setHeadline(data.data.headline);
        // setNewsImage(data.data.image);
        // setSource(data.data.source);
        // setNewsSummary(data.data.summary);
        // setNewsUrl(data.data.url);
        setNews(data.data);
    };

    // const GetRelatedStock = async (industry) => {
    //     var data = await RelatedStock(industry);
    //     return [];
    // };

    useEffect(() => {
        GetStockData();
        GetCompanyData();
        // GetRelatedStock();
        GetCompanyNews();
    }, [dailyChange]);

    // {close}
    // {name}
    return (
        <React.Fragment>
            <Row>
                <TitleWidget
                    close={close}
                    name={name}
                    previousClose={previousClose}
                    dailyChange={dailyChange}
                    changePrice={changePrice}
                    logo={logo}
                    ticker={ticker}
                    arrow={arrow}
                    color={color}
                    date={date}
                />
            </Row>
            <Row className="second-col">
                <Col>
                    <SplineAreaChart allClose={allClose} ticker={ticker} time={time} />
                </Col>
                <Col>
                    <IndustryTable ticker={ticker} relatedTicker={relatedTicker} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <NewsCard
                        news={news}
                        // datetime={datetime}
                        // headline={headline}
                        // image={newsImage}
                        // source={source}
                        // summary={newsSummary}
                        // url={newsUrl}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EcommerceDashboardPage;
