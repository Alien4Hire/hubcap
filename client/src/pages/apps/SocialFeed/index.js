import React from 'react';
import { Row, Col } from 'reactstrap';
import industryListData from '../../TestPage/industryList'
// SocialFeed
const SocialFeed = () => {


    return (
        <React.Fragment>
            <div className="search">
                {industryListData.industryList.map( (industryListItem) => (
                <div>
                <h3>{industryListItem.Industry}</h3> 
                </div>
                ))};
            </div>
        </React.Fragment>
    );
};


export default SocialFeed;
