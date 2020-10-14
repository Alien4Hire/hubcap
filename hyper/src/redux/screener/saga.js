// @flow
import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { FETCH_STOCK_DATA } from './constants';
import { fetchStockDataReceive, fetchStockDataError } from './actions';
import { API, SuccessStatusCode } from '../../services/api';
/**
 * Watchers
 */
export function* fetchStockData() {
    yield takeEvery(FETCH_STOCK_DATA, function* ({ payload, pagination }) {
        try {
            const response = yield call(API.fetchStockData, {
                ...payload,
                pageSize: pagination.pageSize,
                page: pagination.page,
            });
            if (SuccessStatusCode.includes(response.status)) {
                yield put(
                    fetchStockDataReceive({
                        pagination: {
                            ...pagination,
                            page: response.data.pagination.currentPage,
                            total: response.data.pagination.total,
                        },
                        data: response.data.data,
                    })
                );
            } else {
                yield put(fetchStockDataError(response.message));
            }
        } catch (ex) {
            console.log('Error while fetching stock ', ex);
            yield put(fetchStockDataError('Error while fetching stock'));
        }
    });
}

function* screenerSaga() {
    yield all([fork(fetchStockData)]);
}

export default screenerSaga;
