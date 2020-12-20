// @flow
import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { FETCH_WATCHLISTS } from './constants';
import {
    selectStock,
    selectedWatchlist,
    fetchWatchlists,
    fetchStockList,
    addStock,
    deleteStock,
    addWatchlist,
    deleteWatchlist,
} from './actions';
import { API, SuccessStatusCode } from '../../services/api';
/**
 * Watchers
 */
export function* fetchUserWatchlists() {
    yield takeEvery(FETCH_WATCHLISTS, function* ({ payload }) {});
}

function* screenerSaga() {
    yield all([fork(fetchUserWatchlists)]);
}

export default screenerSaga;
