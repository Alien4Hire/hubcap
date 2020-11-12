// @flow
import React from 'react';
import { Card, CardBody, Media } from 'reactstrap';
import industryList from './industryList'
import statsImg from '../../assets/images/email-campaign.svg';
import {shape, string} from 'prop-types'

const Cards = (props) => {
    return (
        <React.Fragment>
            <Card className="tilebox-one" top width='100px'>
            
            <CardBody>
                <h2 className="my-2" id="active-users-count">
                    <i className={props.icon}></i>
                </h2>
                <h6 className="text-uppercase mt-0">{props.Industry}</h6>
                <p className="mb-0 text-muted">
                    <span className="text-success mr-2">
                        <span className=''></span> 4.2%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                </p>
            </CardBody>
            
            </Card>
        </React.Fragment>
    );
};


export default Cards;


