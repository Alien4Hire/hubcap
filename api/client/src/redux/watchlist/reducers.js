import {
    STOCK_SELECTED,
    WATCHLIST_SELECTED,
    FETCH_STOCK_LIST,
    FETCH_WATCHLISTS,
    ADD_STOCK,
    DELETE_STOCK,
    ADD_WATCHLIST,
    DELETE_WATCHLIST,
} from './constants';
import _ from 'lodash';
import { combineReducers } from 'redux';

const stockReducer = () => {
    return {
        lists: [
            { listName: 'listOne', stocks: ['AAPL', 'TSLA', 'MSFT', 'UBER'], userId: '043519gr053hfr', id: 1 },
            { listName: 'listTwo', stocks: ['GOOS', 'BTCUSDT', 'NVTA', 'WKHS'], userId: '043519gr053hfr', id: 1 },
            { listName: 'listThree', stocks: ['SHOP', 'HMY', 'LL', 'CCK'], userId: '043519gr053hfr', id: 1 },
            { listName: 'listFour', stocks: ['TNDM', 'EC', 'INN', 'PH'], userId: '043519gr053hfr', id: 1 },
            { listName: 'listFive', stocks: ['BKU', 'MEIP', 'PFGC', 'LNT'], userId: '043519gr053hfr', id: 1 },
            { listName: 'listSix', stocks: ['FBHS', 'PEB', 'PDCE', 'TWOU'], userId: '043519gr053hfr', id: 1 },
        ],
    };
};

const stockSelector = (state = [], action) => {
    switch (action.type) {
        case STOCK_SELECTED:
            return action.payload;
        case WATCHLIST_SELECTED:
            return action.payload;
        case FETCH_STOCK_LIST:
            return { ...state, ..._.mapKeys(action.payload, 'stocks') };
        case FETCH_WATCHLISTS:
            return { ...state, ..._.mapKeys(action.payload, 'lists') };
        case ADD_STOCK:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STOCK:
            return { ...state, [action.payload.id]: action.payload };
        case ADD_WATCHLIST:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_WATCHLIST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

export default combineReducers({
    watchlists: stockReducer,
    selectedStock: stockSelector,
});
