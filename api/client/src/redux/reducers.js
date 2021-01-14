// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import Error from './auth/errorReducers';
import AppMenu from './appMenu/reducers';
import Screener from './screener/reducers';
import Watchlist from './watchlist/reducers';
import TradingLab from './TradingLab/reducers';
export default combineReducers({
    Auth,
    AppMenu,
    Screener,
    Layout,
    Watchlist,
    TradingLab,
    Error,
});
