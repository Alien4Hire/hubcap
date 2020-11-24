// import historyProvider from './historyProvider'
// import realtimeProvider from './realtimeProvider'
import api from './api';

const rp = require('request-promise').defaults({ json: true });

// Setup config
const api_key = 'bsh2dt7rh5r9j22quibg'; // THIS IS MY FREE API KEY, SIGNUP AND GET YOUR KEY at https://finnhub.io/register
// const supportedResolutions = ["1", "5", "15", "30", "60", "D", "W", "M"] // supported resolution by finnhub
const supportedResolutions = ['D']; // for the sake of this tutorial, we will use only D timeframe
const config = {
    supported_resolutions: supportedResolutions,
};

// history data
const api_root = 'https://finnhub.io/api/v1';
const history = {};

// realtime data
const socket_url = 'wss://ws.finnhub.io?token=' + api_key;
const socket = new WebSocket(socket_url);
var sub;
var availableSymbols = [];

// function getUrlVars() {
//     var vars = {};
//     var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
//         vars[key] = value;
//     });
//     return vars;
// }
// Trading View JS Datafeed
export default {
    onReady: (cb) => {
        console.log('onReady running');
        const qs = {
            exchange: 'binance',
            token: api_key,
        };

        // Get all crypto symbol for binance
        rp({
            // uri: 'https://finnhub.io/api/v1/crypto/symbol',
            uri: api_root + '/crypto/symbol',
            qs: qs,
        }).then((data) => {
            availableSymbols = data;
            console.log(availableSymbols);
        });

        setTimeout(() => cb(config), 0);
    },

    searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
        const symbols = await api.searchSymbols(userInput);

        const results = symbols.map((symbol) => {
            return {
                symbol,
                full_name: symbol,
                description: symbol,
                exchange: symbol,
                ticker: symbol,
            };
        });

        // console.log('Symbols', symbols)

        onResultReadyCallback(results);
    },

    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        // expects a symbolInfo object in response
        var symbol_stub = {
            name: symbolName,
            description: symbolName,
            type: 'crypto',
            session: '24x7',
            timezone: 'Etc/UTC',
            ticker: symbolName,
            exchange: '',
            minmov: 1,
            pricescale: 100000000,
            has_intraday: true,
            intraday_multipliers: ['1', '60'],
            supported_resolution: supportedResolutions,
            volume_precision: 8,
            data_status: 'streaming',
        };

        setTimeout(function () {
            onSymbolResolvedCallback(symbol_stub);
            console.log('Resolving that symbol....', symbol_stub);
        }, 0);
    },

    getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
        try {
            console.log('//===== GET BARS =====//');
            console.log(symbolInfo, resolution, from, to);

            let bars = [];

            if (symbolInfo.name.includes('#')) {
                const splitSymbol = symbolInfo.name.split('#');

                const values = await api.getIndicator(splitSymbol[0], splitSymbol[1], from, to);

                bars = values.map((value) => {
                    return {
                        time: value.t * 1000, // trading view need time in milisecond
                        low: value.i,
                        high: value.i,
                        open: value.i,
                        close: value.i,
                    };
                });
            } else {
                const prices = await api.getOHLC(symbolInfo.name, from, to);

                bars = prices.map((price) => {
                    return {
                        time: price.t * 1000, // trading view need time in milisecond
                        low: price.l,
                        high: price.h,
                        open: price.o,
                        close: price.c,
                    };
                });
            }

            console.log('BARS:', bars);

            if (bars.length) {
                onHistoryCallback(bars, { noData: false });
            } else {
                onHistoryCallback(bars, { noData: true });
            }
        } catch (err) {
            console.log({ err });
            onErrorCallback(err);
        }
    },

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        // let symbol = "BINANCE:" + symbolInfo.name.replace('/', '')
        // socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol, resolution: 'D'}))
        // const newSub = {
        //           symbol,
        //           subscribeUID,
        //           resolution,
        //           symbolInfo,
        //           lastBar: history[symbolInfo.name].lastBar,
        //           listener: onRealtimeCallback,
        // }
        // sub = newSub
    },

    unsubscribeBars: (subscriberUID) => {
        // const symbol = sub.symbol
        //       socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
        // socket.emit('SubRemove', {subs: [sub.channelString]})
    },
};

// handle socket event
socket.onopen = function (event) {
    console.log('socket open successfully');
};

socket.addEventListener('message', function (event) {
    //  const _data= e.split('~')
    const data = JSON.parse(event.data);

    if (data['type'] !== 'trade') {
        return;
    }

    data['data'].forEach((element) => {
        var ticker = {
            symbol: element['s'],
            price: element['p'],
            volume: element['v'],
        };

        if (ticker.time < sub.lastBar.time / 1000) {
            // disregard the initial catchup snapshot of trades for already closed candles
            return;
        }

        var _lastBar = updateBar(ticker, sub);
        // send the most recent bar back to TV's realtimeUpdate callback
        sub.listener(_lastBar);
        // update our own record of lastBar
        sub.lastBar = _lastBar;
    });
});

// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {
    var lastBar = sub.lastBar;
    let resolution = sub.resolution;
    if (resolution.includes('D')) {
        // 1 day in minutes === 1440
        resolution = 1440;
    } else if (resolution.includes('W')) {
        // 1 week in minutes === 10080
        resolution = 10080;
    }

    var coeff = resolution * 60;
    // console.log({coeff})
    var rounded = Math.floor(data.ts / coeff) * coeff;
    var lastBarSec = lastBar.time / 1000;
    var _lastBar;

    if (rounded > lastBarSec) {
        // create a new candle, use last close as open **PERSONAL CHOICE**
        _lastBar = {
            time: rounded * 1000,
            open: lastBar.close,
            high: lastBar.close,
            low: lastBar.close,
            close: data.price,
            volume: data.volume,
        };
    } else {
        // update lastBar candle!
        if (data.price < lastBar.low) {
            lastBar.low = data.price;
        } else if (data.price > lastBar.high) {
            lastBar.high = data.price;
        }

        lastBar.volume += data.volume;
        lastBar.close = data.price;
        _lastBar = lastBar;
    }
    return _lastBar;
}
