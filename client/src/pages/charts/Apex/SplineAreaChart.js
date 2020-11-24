// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// SplineAreaChart
const SplineAreaChart = ({ allClose, ticker, time }) => {
    const apexAreaChart1Opts = {
        chart: {
            height: 600,
            type: 'area',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        colors: ['#727cf5', '#6c757d'],
        legend: {
            offsetY: -10,
            show: false,
        },
        xaxis: {
            labels: {
                show: false,
                formatter: (time) => {
                    return new Date(time * 1000).toLocaleDateString('en-US');
                },
                datetimeFormatter: {
                    year: 'yyyy',
                },
            },

            enabled: false,
            show: false,
            categories: time,
        },
        yaxis: {
            enabled: true,
            show: true,
            labels: {
                formatter: (allClose) => {
                    return '$' + Math.round(allClose);
                },
            },
        },
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topRight',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        title: {
            margin: 10,
        },
    };

    const apexAreaChart1Data = [
        {
            name: ticker,
            data: allClose,
        },
    ];
    const myStyle = {
        marginTop: -15,
        marginLeft: 20,
    };
    const myCard = {
        paddingBottom: 0,
        paddingLeft: 2,
        paddingRight: 2,
        maxWidth: 680,
        minWidth: 280,
    };
    const cardBody = {
        maxWidth: 780,
        minWidth: 280,
    };

    return (
        <Card className="cardBody" style={cardBody}>
            <CardBody className="myCard" style={myCard}>
                <h4 className="header-title mb-3" style={myStyle}>
                    {/* {ticker} */}
                </h4>
                <Chart options={apexAreaChart1Opts} series={apexAreaChart1Data} type="area" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default SplineAreaChart;
