import {
    STOCK_SELECTED,
    WATCHLIST_SELECTED,
    FETCH_STOCK_LIST,
    FETCH_WATCHLISTS,
    ADD_STOCK,
    DELETE_STOCK,
    ADD_WATCHLIST,
    DELETE_WATCHLIST,
    WATCHLIST_LOADING,
    UPDATE_WATCHLIST,
    STOCK_LIST_ERROR,
    STOCK_LIST_LOADING,
    SET_SELECTED,
    RENAME_WATCHLIST,
    CLEAR_WATCHLIST,
    WATCHLIST_TITLE,
    CHANGE_NUMBER,
    DRAG_STOCK_ORDER,
} from './constants';
import _ from 'lodash';
import { combineReducers } from 'redux';

const STOCK_STATE = {
    selected: "",
    watchlist: [],
    loading: false,
    title:'',
    type:[],
};

const WATCHLIST_STATE = {
    watchlist: [],
    loading: false,
    number: 1,//localStorage.getItem('watchlist'),
}

const stockSelector = (state = STOCK_STATE, action) => {
    switch (action.type) {
        case STOCK_SELECTED:
            return {...state, selected: action.payload}
        case FETCH_STOCK_LIST:
            return { ...state, watchlist: action.payload.select, title: action.payload.name, loading: false};
        case STOCK_LIST_LOADING:
            return {...state, loading: true};
        case CLEAR_WATCHLIST:
            return {...state, watchlist: [], type: [], loading: false};
        case WATCHLIST_TITLE:
            return {...state, title: action.payload, loading: false}
        case DRAG_STOCK_ORDER:
            const items = state.watchlist;
            const [reorderedItem] = items.splice(action.payload.source.index, 1);
            items.splice(action.payload.destination.index, 0, reorderedItem);
            const typeItems = state.type;
            const [reorderedtypeItems] = typeItems.splice(action.payload.source.index, 1);
            typeItems.splice(action.payload.destination.index, 0, reorderedtypeItems);
            return {...state, watchlist: [...items], type: [...typeItems], loading: false}
        case ADD_STOCK:
            return { ...state, watchlist: [action.payload.symbol, ...state.watchlist], type: [action.payload.type, ...state.type], loading: false };
        case DELETE_STOCK:
            return {
                ...state,
                watchlist: [
                    ...state.watchlist.slice(0, action.payload),
                    ...state.watchlist.slice(action.payload + 1)
                ],
                type: [
                    ...state.type.slice(0, action.payload),
                    ...state.type.slice(action.payload + 1)
                ],
                loading: false
             };
        default:
            return state;
    }
};
const watchlistSelector = (state = WATCHLIST_STATE, action) => {
    switch (action.type) {
        case WATCHLIST_SELECTED:
            return {...state, number: action.payload, loading: true};
        case WATCHLIST_LOADING:
            return {...state, loading: true}
        case FETCH_WATCHLISTS:
            return { ...state, watchlist: action.payload.list, number: action.payload.select, loading: false };
        case SET_SELECTED:
            return{ ...state, selected: action.payload };
        case ADD_WATCHLIST:
            const newNumber = state.watchlist.length
            return { 
                ...state,
                watchlist: [...state.watchlist, action.payload], 
                number: newNumber };
        case DELETE_WATCHLIST:
            return { ...state, watchlist: action.payload, number: 0};
        case UPDATE_WATCHLIST:
            return {...state, [action.payload.id]: action.payload}
        case RENAME_WATCHLIST:
            return {
                ...state, 
                watchlist: [
                    ...state.watchlist.slice(0, action.payload.name),
                    action.payload.rename,
                    ...state.watchlist.slice(action.payload + 1)
                ],
                number: state.number,
                loading: false, 
                };
        case CHANGE_NUMBER:
            return {...state, number: action.payload}
        default:
            return state;
    }
};

export default combineReducers({
    watchlist: watchlistSelector,
    stock: stockSelector,
});
