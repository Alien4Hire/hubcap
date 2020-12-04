import React from 'react';
import SimpleBar from 'simplebar-react';

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
                                const update = new Date(records.datetime * 1000).toLocaleDateString('en-US');
                                console.log(update);
                                return (
                                    <Card className="News-card">
                                        <CardBody className="News-body">
                                            <div className="news-head">
                                                <img className="News-Image" src={record.image}></img>
                                                <div className="News-text">
                                                    <h4 className="News-headline" href={record.url}>
                                                        {record.headline}
                                                    </h4>
                                                    <h6 className="date-news">
                                                        <span>{record.source}</span>|<span>{record.datetime}</span>
                                                    </h6>
                                                </div>
                                                <p className="News-summary">{record.summary}</p>
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

export default NewsCard;
