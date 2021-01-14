import React from 'react';
import SimpleBar from 'simplebar-react';
import { connect } from 'react-redux';

import { Container, Row, Col, Card, CardBody } from 'reactstrap';
//  datetime, headline, image, source, summary, url
const NewsCard = ({ news }) => {
    const records = news;

    return (
        <div className="news-bar">
            <Row>
                <title>News</title>
            </Row>
            <Row>
                <SimpleBar style={{ maxHeight: '600px', width: '80%' }}>
                    <Container>
                        {records &&
                            records.map((record, index) => {
                                // const update = new Date(records.datetime * 1000).toLocaleDateString('en-US');
                                // console.log(update);
                                return (
                                    <Card className="News-card" key={record}>
                                        <CardBody className="News-body">
                                            <div className="news-head">
                                                <img className="News-Image" src={record.urlToImage}></img>
                                                <div className="News-text">
                                                    <h4 className="News-headline" href={record.url}>
                                                        {record.content}
                                                    </h4>
                                                    <h6 className="date-news">
                                                        <span>{record.source.name}</span>|
                                                        <span>{record.publishedAt}</span>
                                                    </h6>
                                                </div>
                                                <p className="News-summary">{record.description}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                    </Container>
                </SimpleBar>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        news: state.TradingLab.news,
    }
}

export default connect(mapStateToProps)(NewsCard);
