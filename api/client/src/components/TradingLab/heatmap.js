import React from 'react'
import Chart from 'react-apexcharts';

class HeatMap extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: 'Jan',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Feb',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Mar',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Apr',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'May',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Jun',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Jul',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Aug',
            data: {
              min: -30,
              max: 55
            }
          },
          {
            name: 'Sep',
            data: {
              min: -30,
              max: 55
            }
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'heatmap',
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              radius: 0,
              useFillColorAsStroke: true,
              colorScale: {
                ranges: [{
                    from: -30,
                    to: 5,
                    name: 'low',
                    color: '#00A100'
                  },
                  {
                    from: 6,
                    to: 20,
                    name: 'medium',
                    color: '#128FD9'
                  },
                  {
                    from: 21,
                    to: 45,
                    name: 'high',
                    color: '#FFB200'
                  },
                  {
                    from: 46,
                    to: 55,
                    name: 'extreme',
                    color: '#FF0000'
                  }
                ]
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 1
          },
          title: {
            text: 'HeatMap Chart with Color Range'
          },
        },
      
      
      };
    }

  

    render() {
      return (
        <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
        </div>
      )
    }
}

export default HeatMap;