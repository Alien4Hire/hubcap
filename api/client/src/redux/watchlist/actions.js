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

export const selectStock = (stock) => ({
    type: STOCK_SELECTED,
    payload: stock,
});

export const selectedWatchlist = (watchlist) => ({
    type: WATCHLIST_SELECTED,
    payload: watchlist,
});

export const fetchWatchlists = (payload) => ({
    type: FETCH_WATCHLISTS,
    payload,
});

export const fetchStockList = (payload) => ({
    type: FETCH_STOCK_LIST,
    payload,
});

export const addStock = (payload) => ({
    type: ADD_STOCK,
    payload,
});

export const deleteStock = (payload) => ({
    type: DELETE_STOCK,
    payload,
});

export const addWatchlist = (payload) => ({
    type: ADD_WATCHLIST,
    payload,
});

export const deleteWatchlist = (payload) => ({
    type: DELETE_WATCHLIST,
    payload,
});
