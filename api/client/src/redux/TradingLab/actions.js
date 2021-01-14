import {
    LOAD_STOCK_DATA,
    LOAD_NEWS,
    LOAD_CHART,
    LOAD_CORRELATION,
    GETTING_DATA,
    LAB_ERROR,
    LOAD_RECOMENDED
} from './constants';

import { API } from '../../services/api';
import axios from 'axios';
import {tokenConfig} from '../../utils/tokenConfig';

const API_URL = 'http://localhost:3500';

export const loadStockNews = (symbol) => async (dispatch, getState) => {
    //Stock Data Loading
    dispatch({type: GETTING_DATA})

    await axios
    .get(`${API_URL}/api/getStockNews/${symbol}`, tokenConfig(getState))
    .then(res => dispatch({
        type: LOAD_NEWS,
        payload: res.data,
    }))
}

export const fetchStockData = (payload) => async (dispatch, getState) => {
    dispatch({type: GETTING_DATA})
    const response = await axios
        .get(`${API_URL}/api/getStockData/${payload}`, tokenConfig(getState))
        .then(res => dispatch({
            type: LOAD_STOCK_DATA,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: LAB_ERROR,
                payload: err
            })
        })
        // .then(dispatch(setSelected(lists)))
};

export const fetchChartData = (payload) => async (dispatch, getState) => {
    dispatch({type: GETTING_DATA})
    const response = await axios
        .get(`${API_URL}/api/getChartData/${payload}`, tokenConfig(getState))
        .then(res => dispatch({
            type: LOAD_CHART,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: LAB_ERROR,
                payload: 'did not work'
            })
        })
        // .then(dispatch(setSelected(lists)))
};

export const fetchRecomendedStocks = (payload) => async (dispatch, getState) => {
    dispatch({type: GETTING_DATA})
    const response = await axios
        .get(`${API_URL}/v1/symbols/${payload}/ind`, tokenConfig(getState))
        .then(res => dispatch({
            type: LOAD_RECOMENDED,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: LAB_ERROR,
                payload: err
            })
        })
        // .then(dispatch(setSelected(lists)))
};

