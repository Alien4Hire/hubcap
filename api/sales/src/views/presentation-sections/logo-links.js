/** @format */

import React from 'react';
// reactstrap components
import { Row, Col, Container } from 'reactstrap';
import tradingview from '../../assets/img/7644688.png';
import twitch from '../../assets/img/twitch_logo_grey.png';
import youtube from '../../assets/img/youtube_logo_grey.png';

const LogoLinks = () => {
  return (
    <>
      <div className="section">
        <Col className="center-logo">
          <a href="https://www.twitch.tv/hubcap_trading">
            <img
              className="twitch logo-stream"
              src={twitch}
              target="_blank"
            ></img>
          </a>
          <span></span>
          <a
            href="https://www.tradingview.com/u/jaymaynard84/#published-scripts"
            target="_blank"
          >
            <img className="tradingview logo-stream" src={tradingview}></img>
          </a>
          <span></span>
          <a
            href="https://www.youtube.com/channel/UCthx_5MwrqQjd6_THnHPNzw"
            target="_blank"
          >
            <img className="youtube logo-stream" src={youtube}></img>
          </a>
        </Col>
      </div>
    </>
  );
};

export default LogoLinks;
