import * as React from 'react';
import './index.css';
import { widget } from './charting_library/charting_library.min';
import Datafeed from './datafeed';
import indicators from './indicators'


const rp = require('request-promise').defaults({ json: true })
const api_key = 'bsh2dt7rh5r9j22quibg' // THIS IS MY FREE API KEY, SIGNUP AND GET YOUR KEY at https://finnhub.io/register

const api_root = 'https://finnhub.io/api/v1/scan/pattern'

var patternIds = []

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

export class TVChartContainer extends React.PureComponent {
  tvWidget = null;

  componentDidMount() {
    const widgetOptions = {
      symbol: 'TSLA',
      //symbol: 'BTC/USDT',
      //symbol: 'BTC/USD', //getUrlVars()["symbol"],
      datafeed: Datafeed,
      container_id: 'tv_chart_container',
      library_path: '/charting_library/',
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      fullscreen: false,
      autosize: true,
      width: "100%",
      timezone: "America/New_York",
      client_id: 'patternscanner',
      user_id: 'public_user_id',
      auto_save_delay: 10,
      theme: 'Light',
      loading_screen: { backgroundColor: "#222222", foregroundColor: "#229712", },
      custom_indicators_getter: indicators
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
    const thisComponent = this;

    tvWidget.onChartReady(() => {

      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        }));

        button.innerHTML = 'Check API';
        thisComponent.getPattern()

        tvWidget.chart().onIntervalChanged().subscribe(null, function (interval, obj) {
          console.log('On interval change')
          thisComponent.getPattern()
        })

        tvWidget.chart().onSymbolChanged().subscribe(null, function (symbolData) {
          console.log('Symbol change ' + symbolData)
          thisComponent.getPattern()
        })

        tvWidget.chart().createStudy('Strange Indicator', false, true)
        tvWidget.chart().createStudy('ESS Indicator', false, true)
        tvWidget.chart().createStudy('ESL Indicator', false, true)
        tvWidget.chart().createStudy('EPS Indicator', false, true)
        tvWidget.chart().createStudy('EPL Indicator', false, true)
        tvWidget.chart().createStudy('ETS Indicator', false, true)
        tvWidget.chart().createStudy('ETL Indicator', false, true)

      });
    });
  }

  getPattern() {
    let thisComponent = this
    thisComponent.removeAllShape()

    let symbol = thisComponent.tvWidget.chart().symbol().replace('/', '')
    let resolution = thisComponent.tvWidget.chart().resolution()
    console.log('Get pattern: ' + api_root + '?symbol=' + symbol + '&resolution=' + resolution + '&token=' + api_key)
    const qs = {
      symbol: symbol,
      resolution: resolution,
      token: api_key
    }

    rp({
      uri: api_root,
      qs: qs
    }).then(data => {
      let i = 0
      for (let i in data.points) {
        let point = data.points[i]
        thisComponent.drawPattern(thisComponent.tvWidget, point)
      }
      console.log('Pattern', data)
    }).catch(err => {
      console.log(err)
    })
  }

  drawPattern(widget, pattern) {
    let pname = pattern.patternname.toLowerCase()
    var patternId = ''

    if (pname == 'triangle' || pname == 'wedge') {
      let points = [
        {
          'time': pattern.atime,
          'price': pattern.aprice
        },
        {
          'time': pattern.btime,
          'price': pattern.bprice,
        },
        {
          'time': pattern.ctime,
          'price': pattern.cprice
        },
        {
          'time': pattern.dtime,
          'price': pattern.dprice
        }
      ]
      patternId = widget.chart().createMultipointShape(points, {
        'shape': 'triangle_pattern',
        disableUndo: true,
      })
    } else if (pname == 'flag') {
      // draw flag pole
      let pole = [
        {
          'time': pattern.etime,
          'price': pattern.eprice
        },
        {
          'time': pattern.atime,
          'price': pattern.aprice
        },
      ]
      patternId = widget.chart().createMultipointShape(pole, {
        'shape': 'trend_line'
      })

      // draw flag 
      let flag = [
        {
          'time': pattern.atime,
          'price': pattern.aprice
        },
        {
          'time': pattern.ctime,
          'price': pattern.cprice
        },
        {
          'time': pattern.dtime,
          'price': pattern.dprice
        },
      ]
      patternId = widget.chart().createMultipointShape(flag, {
        'shape': 'parallel_channel',
        disableUndo: true,
      })

    } else if (pname.indexOf("double") > -1) {
      // double bottom, double top
      let points = [
        {
          'time': pattern.start_time,
          'price': pattern.start_price
        },
        {
          'time': pattern.atime,
          'price': pattern.aprice
        },
        {
          'time': pattern.btime,
          'price': pattern.bprice
        },
        {
          'time': pattern.ctime,
          'price': pattern.cprice
        },
        {
          'time': pattern.end_time,
          'price': pattern.end_price
        }
      ]
      patternId = widget.chart().createMultipointShape(points, {
        'shape': 'polyline',
        disableUndo: true,
        overrides: { "fillBackground": false, "linecolor": "#9528CC", "linewidth": 4 }
      })
      patternIds.push(patternId)
    } else if (pname.indexOf("triple") > -1) {
      // triple top, triple bottom
      let points = [
        {
          'time': pattern.start_time,
          'price': pattern.start_price
        },
        {
          'time': pattern.atime,
          'price': pattern.aprice
        },
        {
          'time': pattern.btime,
          'price': pattern.bprice
        },
        {
          'time': pattern.ctime,
          'price': pattern.cprice
        },
        {
          'time': pattern.dtime,
          'price': pattern.dprice,
        },
        {
          'time': pattern.etime,
          'price': pattern.eprice
        },
        {
          'time': pattern.end_time,
          'price': pattern.end_price
        }
      ]
      patternId = widget.chart().createMultipointShape(points, {
        'shape': 'polyline',
        disableUndo: true,
        overrides: { "fillBackground": false, "linecolor": "#9528CC", "linewidth": 4 }
      })
    } else if (pname === "head and shoulders") {
      // head and shoulder pattern
      let points = [
        {
          'time': pattern.start_time,
          'price': pattern.start_price
        },
        {
          'time': pattern.atime,
          'price': pattern.aprice
        },
        {
          'time': pattern.btime,
          'price': pattern.bprice
        },
        {
          'time': pattern.ctime,
          'price': pattern.cprice
        },
        {
          'time': pattern.dtime,
          'price': pattern.dprice,
        },
        {
          'time': pattern.etime,
          'price': pattern.eprice
        },
        {
          'time': pattern.end_time,
          'price': pattern.end_price
        }
      ]
      patternId = widget.chart().createMultipointShape(points, {
        shape: 'head_and_shoulders',
        disableUndo: true,
      })

    } else {
      console.log(pname, pattern)
    }
  }

  removeAllShape() {
    for (let i in patternIds) {
      this.tvWidget.chart().removeEntity(patternIds[i].id)
    }
    patternIds = []
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div
        id='tv_chart_container'
        className={'TVChartContainer'}
      />
    );
  }
}