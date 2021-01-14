import {
    LOAD_STOCK_DATA,
    LOAD_NEWS,
    LOAD_CHART,
    LOAD_CORRELATION,
    GETTING_DATA,
    LAB_ERROR,
    LOAD_RECOMENDED,
} from './constants';

const INIT_STATE = {
    news: [],
    stock: {},
    correlation: {},
    chart: {},
    loading: false,
    error: null,
    close: '',
    change: '',
    changeAMT: '',
    relatedStocks: [],
};

const TradingLab = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_STOCK_DATA:
            return {...state, stock: action.payload, loading: false};
        case LOAD_NEWS:
            return {...state, news: action.payload, loading: false}
        case LOAD_CHART:
            const roundToHundredth = (value) => {
                return Number(value.toFixed(2));
            };
            var length = action.payload.lengths - 1
            var smallLength = action.payload.lengths - 2
            var changePercent = roundToHundredth(100 * (1 - (action.payload.c[length] / action.payload.c[smallLength])))
            var changeAmount = roundToHundredth(action.payload.c[length] - action.payload.c[smallLength])
            var realClose = roundToHundredth(action.payload.c[length])
            return { ...state, chart: action.payload, close: realClose, change: changePercent, changeAMT: changeAmount, loading: false };
        case LOAD_CORRELATION:
            return { ...state, correlation: action.payload, loading: false }
        case LOAD_RECOMENDED:
            return { ...state, relatedStocks: action.payload, loading: false }
        case GETTING_DATA:
            return { ...state, loading: true }
        case LAB_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default TradingLab;