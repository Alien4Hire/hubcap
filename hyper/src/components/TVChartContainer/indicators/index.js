import strangeIndicator from './simpleIndicator'
import essIndicator from './essIndicator'
import eslIndicator from './eslIndicator'



export default (PineJS) => {
  const indicators = [{
    name: 'ESS Indicator',
    code: 'entrySLShort',
  }, {
    name: 'ESL Indicator',
    code: 'entrySLLong',
  }, {
    name: 'EPS Indicator',
    code: 'entryPriceShort',
  }, {
    name: 'EPL Indicator',
    code: 'entryPriceLong',
  }, {
    name: 'ETS Indicator',
    code: 'entryTPShort',
  }, {
    name: 'ETL Indicator',
    code: 'entryTPLong',
  }]

  return Promise.resolve(indicators.map(indicator => {
    return {
      // Replace the <study name> with your study name
      // The name will be used internally by the Charting Library
      name: indicator.name,
      metainfo: {
        "_metainfoVersion": 40,
        "id": `${indicator.code}-indicator@tv-basicstudies-1`,
        "scriptIdPart": "",
        "name": indicator.name,
  
        // This description will be displayed in the Indicators window
        // It is also used as a "name" argument when calling the createStudy method
        "description": indicator.name,
  
        // This description will be displayed on the chart
        "shortDescription": indicator.name,
  
        "is_hidden_study": false,
        "is_price_study": true,
        "isCustomIndicator": true,
  
        "plots": [{
          "id": "plot_0",
          "type": "line",
        }],
        "defaults": {
          "styles": {
            "plot_0": {
              "linestyle": 0,
              "visible": true,
  
              // Plot line width.
              "linewidth": 2,
  
              // Plot type:
              //    1 - Histogram
              //    2 - Line
              //    3 - Cross
              //    4 - Area
              //    5 - Columns
              //    6 - Circles
              //    7 - Line With Breaks
              //    8 - Area With Breaks
              "plottype": 7,
  
              // Show price line?
              "trackPrice": true,
  
              // Plot transparency, in percent.
              "transparency": 40,
  
              // Plot color in #RRGGBB format
              "color": "#0000FF"
            }
          },
  
          // Precision of the study's output values
          // (quantity of digits after the decimal separator).
          "precision": 2,
  
          "inputs": {}
        },
        "styles": {
          "plot_0": {
            // Output name will be displayed in the Style window
            "title": "-- output name --",
            "histogramBase": 0,
          }
        },
        "inputs": [],
      },
  
      constructor: function () {
        this.init = function (context, inputCallback) {
          this._context = context;
          this._input = inputCallback;
  
          // Define the symbol to be plotted.
          // Symbol should be a string.
          // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
          // For example,
          //    var symbol = "AAPL";
          //    var symbol = "#EQUITY";
          //    var symbol = PineJS.Std.ticker(this._context) + "#TEST";
          console.log('CONTEXT:', this._context)
          console.log('CONTEXT TICKER:', PineJS.Std.ticker(this._context))
  
          const ticker = PineJS.Std.ticker(this._context).replace(/"/g, '').replace('}', '')
  
          console.log('Ticker:', ticker)
  
          const symbol = `${ticker}#${indicator.code}`;
          this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
        };
  
        this.main = function (context, inputCallback) {
          this._context = context;
          this._input = inputCallback;
  
          this._context.select_sym(1);
  
  
          // You can use following built-in functions in PineJS.Std object:
          //    open, high, low, close
          //    hl2, hlc3, ohlc4
          var v = PineJS.Std.close(this._context);
          return [v];
        }
      }
    }
  }))

  // return Promise.resolve([
  //   strangeIndicator(PineJS),
  //   essIndicator(PineJS),
  //   eslIndicator(PineJS)
  // ])
}