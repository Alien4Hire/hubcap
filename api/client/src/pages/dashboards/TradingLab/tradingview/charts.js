import React, { useState } from 'react';
import { TVChartContainer } from '../../../../components/TVChartContainer/index';

export default function TestPage() {
    const [symbol, setSymbol] = useState('AAPL');
    return (
        <div>
            <TVChartContainer symbol={symbol} />
        </div>
    );
}
