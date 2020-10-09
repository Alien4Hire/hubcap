import { FETCH_STOCK_DATA, FETCH_STOCK_DATA_RECEIVE, FETCH_STOCK_DATA_ERROR } from './constants';

const initState = {
    loading: {},
    error: {},
    pagination: {},
    data: [],
};

const ScreenerReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case FETCH_STOCK_DATA:
            return { ...state, loading: { ...state.loading, 'fetch-stock-data': true } };
        case FETCH_STOCK_DATA_RECEIVE:
            return {
                ...state,
                loading: { ...state.loading, 'fetch-stock-data': false },
                pagination: { ...state.pagination, ...action.payload.pagination },
                data: [...action.payload.data],
            };
        case FETCH_STOCK_DATA_ERROR:
            return {
                ...state,
                loading: { ...state.loading, 'fetch-stock-data': false },
                error: { ...state.error, 'fetch-stock-data': action.error },
            };
        default:
            return state;
    }
};

export default ScreenerReducer;
