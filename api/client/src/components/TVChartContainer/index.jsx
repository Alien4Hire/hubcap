import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import './index.css';
import { widget } from './charting_library/charting_library.min';
import Datafeed from './datafeed';
import indicators from './indicators';

const rp = require('request-promise').defaults({ json: true });
const api_key = 'bsh2dt7rh5r9j22quibg';

const api_root = 'https://finnhub.io/api/v1/scan/pattern';

function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

export function TVChartContainer(props) {
    const [symbol, setSymbol] = useState(props.symbol);
    const [propState, setPropState] = useState(props.symbol);
    const tvWidget = null;

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }
    const prevCount = usePrevious(propState)
    

    const componentDidMount = () => {
        // setSymbol(props.symbol)
        const widgetOptions = {
            symbol: symbol,
            //symbol: 'BTC/USDT',
            //symbol: 'BTC/USD', //getUrlVars()["symbol"],
            datafeed: Datafeed,
            container_id: 'tv_chart_container',
            library_path: '/charting_library/',
            locale: getLanguageFromURL() || 'en',
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: props.chartsStorageUrl,
            charts_storage_api_version: props.chartsStorageApiVersion,
            fullscreen: false,
            autosize: true,
            width: '100%',
            timezone: 'America/New_York',
            client_id: 'Hubcap',
            user_id: 'public_user_id',
            auto_save_delay: 10,
            theme: 'Light',
            loading_screen: { backgroundColor: '#222222', foregroundColor: '#229712' },
            custom_indicators_getter: indicators,
        };

        const tvWidget = new widget(widgetOptions);
        // tvWidget = tvWidget;
        const thisComponent = props;

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                const button = tvWidget.createButton();
                button.setAttribute('title', 'Click to show a notification popup');
                button.classList.add('apply-common-tooltip');
                button.addEventListener('click', () =>
                    tvWidget.showNoticeDialog({
                        title: 'Notification',
                        body: 'TradingView Charting Library API works correctly',
                        callback: () => {
                            console.log('Noticed!');
                        },
                    })
                );

                button.innerHTML = '';
                // thisComponent.getPattern(); //might need to uncomment later

                tvWidget
                    .chart()
                    .onIntervalChanged()
                    .subscribe(null, function (interval, obj) {
                        console.log('On interval change');
                        thisComponent.getPattern();
                    });

                tvWidget
                    .chart()
                    .onSymbolChanged()
                    .subscribe(null, function (symbolData) {
                        console.log('Symbol change ' + symbolData);
                        // thisComponent.getPattern();
                    });

                // tvWidget.chart().createStudy('Strange Indicator', false, true);
                // tvWidget.chart().createStudy('ESS Indicator', false, true);
                // tvWidget.chart().createStudy('ESL Indicator', false, true);
                // tvWidget.chart().createStudy('EPS Indicator', false, true);
                // tvWidget.chart().createStudy('EPL Indicator', false, true);
                // tvWidget.chart().createStudy('ETS Indicator', false, true);
                // tvWidget.chart().createStudy('ETL Indicator', false, true);
            });
        });
    };



    const componentWillUnmount = () => {
        if (tvWidget !== null) {
            tvWidget.remove();
            tvWidget = null;
        }
    };

    useEffect(() => {
        // setSymbol(props.symbol)
        // tvWidget.chart().setSymbol(props.symbol)
        
        console.log(prevCount)
    })

    // useEffect(() => {
    //     componentDidMount();
    //     // getPattern();
    //     // drawPattern();
    //     // // removeAllShape();
    //     return () => {
    //     componentWillUnmount();
    //     }
    // }, [symbol])

    useEffect(() => {
        setSymbol(props.symbol)
        componentDidMount();
        // getPattern();
        // drawPattern();
        // // removeAllShape();
        return () => {
        componentWillUnmount();
        }
    }, []);

    return <div id="tv_chart_container" className={'TVChartContainer'} />;
}
