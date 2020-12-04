// @flow
import React, { useState } from 'react';
import { Card, CardBody, Media } from 'reactstrap';
import industryList from './industryList';
import statsImg from '../../assets/images/email-campaign.svg';
import { shape, string } from 'prop-types';

const Cards = (industryListItem) => {
    const [border, setBorder] = useState(industryListItem.currentCard);
    const [path, setPath] = useState('/');
    const [index, setIndex] = useState(industryListItem.index);

    const cardSelector = () => {
        industryListItem.changeCard(index);

        // console.log(industryListItem.selectedCard);
    };

    return (
        <React.Fragment>
            <Card className={border} top width="100px" onClick={cardSelector}>
                <CardBody>
                    <h2 className="my-2" id="active-users-count">
                        <i className={industryListItem.icon}></i>
                    </h2>
                    <h6 className="text-uppercase mt-0">{industryListItem.Industry}</h6>
                    <p className="mb-0 text-muted">
                        <span className="text-success mr-2">
                            <span className=""></span> 4.2%
                        </span>
                        <span className="text-nowrap">Since last month</span>
                    </p>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Cards;
