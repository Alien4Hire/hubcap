// @flow
import React, { useEffect, useState } from 'react';
import StockDisplay from '../../../components/TradingLab/index';
import StockData from '.././../../components/TradingLab/StockData';
import Axios from 'axios';



const EcommerceDashboardPage = () => {

        const [name, setName] = useState(0)
        

        const GetStockData = async() => {
            var data = await StockData();
            console.log(data)
            setName(data.data.c)
            return []
        }

        useEffect(() =>{
            GetStockData();
        })

        return (
            <React.Fragment>
                {name}
            </React.Fragment>
        )
    }
    

export default EcommerceDashboardPage;
