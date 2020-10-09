import { FETCH_STOCK_DATA, FETCH_STOCK_DATA_RECEIVE, FETCH_STOCK_DATA_ERROR } from './constants';

export const fetchStockData = (payload, pagination) => ({
    type: FETCH_STOCK_DATA,
    payload,
    pagination,
});

export const fetchStockDataReceive = (payload) => ({
    type: FETCH_STOCK_DATA_RECEIVE,
    payload,
});

export const fetchStockDataError = (error) => ({
    type: FETCH_STOCK_DATA_ERROR,
    error,
});
