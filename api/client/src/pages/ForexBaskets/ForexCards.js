// @flow
import React, { useState } from 'react';
import { Card, CardBody, Media } from 'reactstrap';
import ForexList from './ForexList';
import statsImg from '../../assets/images/email-campaign.svg';
import { shape, string } from 'prop-types';

const Cards = (ForexListItem) => {
    const [border, setBorder] = useState(ForexListItem.currentCard);
    const [path, setPath] = useState('/');
    const [index, setIndex] = useState(ForexListItem.index);

    const cardSelector = () => {
        ForexListItem.changeCard(index);

        // console.log(ForexListItem.selectedCard);
    };

    return (
        <React.Fragment>
            <Card className={border} top width="100px" onClick={cardSelector}>
                <CardBody>
                    <h2 className="my-2" id="active-users-count">
                        <i className={ForexListItem.icon}></i>
                    </h2>
                    <h6 className="text-uppercase mt-0">{ForexListItem.Forex}</h6>
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
