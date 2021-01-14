import React, { useEffect, useState } from 'react';
import { TVChartContainer } from '../../../../components/TVChartContainer/index';
import {connect} from 'react-redux'

const TestPage = ({selected}) => {
    const [symbol, setSymbol] = useState('AAPL');

    useEffect(() => {
        setSymbol(selected)
    }, [selected])

    return (
        <div>
            <TVChartContainer symbol={symbol} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        selected: state.Watchlist.stock.selected,
    }
}

export default connect(mapStateToProps)(TestPage)