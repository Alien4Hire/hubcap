import React from 'react';
import { Container } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import IndustryCards from './IndustryCards'
import industryListData from './industryList'




class CardContainer extends React.Component {

    render() {
      return (
        <div className="themed-container">
            <SimpleBar style={{ maxHeight: '900px', width: '100%' }}>
                {industryListData.industryList.map( (industryListItem) => (
                <IndustryCards key={industryListItem} {...industryListItem}/>
                ))}
            </SimpleBar>
        </div>
      )
    }
  }

  export default CardContainer;