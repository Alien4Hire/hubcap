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
    WATCHLIST_ERROR,
    STOCK_LIST_ERROR,
    GET_ERRORS,
    STOCK_LIST_LOADING,
    SET_SELECTED,
    UPDATE_WATCHLIST,
    RENAME_WATCHLIST,
    CLEAR_WATCHLIST_ERRORS,
    CLEAR_WATCHLIST,
    WATCHLIST_TITLE,
    CHANGE_NUMBER,
    DRAG_STOCK_ORDER,
} from './constants';
import _ from 'lodash';
import { API } from '../../services/api';
import axios from 'axios';
import {tokenConfig} from '../../utils/tokenConfig';
import {Error} from './errorReducers';

const API_URL = 'http://localhost:3500';
//Return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

export const selectStock = (stock) => ({
    type: STOCK_SELECTED,
    payload: stock,
});

// export const selectedWatchlist = (watchlist) => ({
//     type: WATCHLIST_SELECTED,
//     payload: watchlist,
// });

// export const getSelectedList = (dispatch, getState) => {
//     const stockList = getState;
//     dispatch({type: WATCHLIST_SELECTED, payload: stockList})
// }

export const fetchWatchlists = () => async (dispatch: Function, getState: Function) => {
    //User Loading
    dispatch({type: WATCHLIST_LOADING})
    const response = await axios
        .get(`${API_URL}/api/getWatchlists`, tokenConfig(getState))
        .then(res => dispatch({
            type: FETCH_WATCHLISTS,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: WATCHLIST_ERROR,
            })
        })
    }

export const fetchStockList = (payload) => async (dispatch: Function, getState) => {
    dispatch({type: STOCK_LIST_LOADING})
    const response = await axios
        .get(`${API_URL}/api/getWatchlists/${payload}`, tokenConfig(getState))
        .then(res => dispatch({
            type: FETCH_STOCK_LIST,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: STOCK_LIST_ERROR
            })
        })
        // .then(dispatch(setSelected(lists)))
};

export const updateStockList = (payload) => async (dispatch: Function, getState) => {
    dispatch({type: STOCK_LIST_LOADING})
    const response = await axios
        .get(`${API_URL}/api/getWatchlists/${payload}`, tokenConfig(getState))
        .then(res => dispatch({
            type: FETCH_STOCK_LIST,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: STOCK_LIST_ERROR
            })
        })
        // .then(dispatch(setSelected(lists)))
};

export const updateWatchlist = (stocks, name, types) => async (dispatch: Function, getState) => {
    const response = await axios
        .put(`${API_URL}/api/editWatchlist/${name}`, {body: {stocks: stocks, types: types}}, tokenConfig(getState))
}

export const setSelected = (payload) => ({
    type: SET_SELECTED,
    payload,
})

export const stockSelected = (payload) => ({
    type: STOCK_SELECTED,
    payload,
})

export const addStock = (symbol, type) => ({
    type: ADD_STOCK,
    payload: {symbol: symbol, type: type},
});

export const removeStock = (payload) => ({
    type: DELETE_STOCK,
    payload,
});

export const renameWatchlist = (name, payload) => async (dispatch, getState) => {
    dispatch({type: WATCHLIST_TITLE, payload})
    dispatch({type: RENAME_WATCHLIST, payload: {name: name, rename: payload}})
    const response = await axios
        .put(`${API_URL}/api/renameWatchlist/${name}`, {body: payload}, tokenConfig(getState)) 
}

export const clearWatchlist = (name) => async (dispatch, getState) => {
    const response = await axios
        .get(`${API_URL}/api/clearWatchlist/${name}`, tokenConfig(getState))  
        .then(res => dispatch({type: CLEAR_WATCHLIST, payload: res.data}))  
}

export const addWatchlist = (payload) => async (dispatch: Function, getState) => {
    dispatch({type: ADD_WATCHLIST, payload,})
    const response = await axios
        .post(`${API_URL}/api/createWatchlist`, {title: payload}, tokenConfig(getState))

        // .catch(err => {
        //     dispatch(returnErrors(err.response, err.response))
        //     dispatch({
        //         type: AUTH_ERROR,
        //     })
        // })
}

export const changeNumber = (payload) => ({
    type: CHANGE_NUMBER,
    payload,
})

//

export const deleteWatchlist = (payload) => async (dispatch: Function, getState) => {
    const response = await axios
        .get(`${API_URL}/api/deleteWatchlist/${payload}`, tokenConfig(getState))
        .then(res => dispatch({type: DELETE_WATCHLIST, payload: res.data}))
        
};

export const selectWatchlist = (payload) => ({
    type: WATCHLIST_SELECTED,
    payload,
});

////Drag and Drop 
export const dragAndDrop = (source, destination) => ({
    type: DRAG_STOCK_ORDER,
    payload: {source, destination},
})
