//makeChart, calling the data and variables from the .csv file
function makeChart(rainbowpeaks) {
  var rangeStart = 64;
  var rangeEnd = 171;
  var rangeLabels = rainbowpeaks.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = rainbowpeaks.map(function(d) {return d.Real_price_over}).slice(rangeStart, rangeEnd);
  var rangeTwo = rainbowpeaks.map(function(d) {return d.Rainbow_curve}).slice(rangeStart, rangeEnd);

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  Chart.defaults.font.family = "'Courier New', Courier, monospace";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = 'black';

  var chart = new Chart('rainbowpeaks', {
    plugins: [plugin],
    options: {
      scales: {
        x: {
          border: {
            display: true,     // ensure the axis line is drawn
            color: 'grey',    // your desired axis‑line color
            width: 1,           // axis‑line thickness in pixels
            Dash: [5, 5],
            borderDashOffset: 2,
            },
          grid: {
          display: true,                  // show grid lines
          color: 'rgba(0, 0, 0, 0.3)', // set their color
          lineWidth: 1,                   // thickness
          borderDash: [5, 5],             // dashed pattern [dash, gap]
          drawTicks: true,                // draw small tick-lines
          drawOnChartArea: true,          // extend lines across chart
        },
          ticks: {
            font: {
              size: 7   // ← your desired font size for X‑axis labels
            },
            stepSize: 2,
            maxRotation: 90,
            minRotation: 90,
          }
        },
        y: {
          beginAtZero: true,
          title: {
                  display: true,
                  text: 'Housing price in euros, inflation adjusted',
                  font: {
                    size: 10
                  },
              },
          grid: {
          display: true,                  // show grid lines
          color: 'rgba(0, 0, 0, 0.3)', // set their color
          lineWidth: 1,                   // thickness
          borderDash: [5, 5],             // dashed pattern [dash, gap]
          drawTicks: true,                // draw small tick-lines
          drawOnChartArea: true,          // extend lines across chart
        },
          ticks: {
          stepSize: 100,
          font: {
            size: 7   // ← your desired font size for X‑axis labels
          },
          /* Include a euro sign in the ticks
                   callback: function(value, index, ticks) {
                       return '€' + value;
                   },*/
          }
        }
      },
      plugins: {
        title: {
                display: true,
                text: 'Real house value - Spain',
                font: {
                  size: 12
                },
            },
        legend: {
        display: false    // ← hide the legend
              },
        customCanvasBackgroundColor: {
        color: 'white',
      },
        datalabels: false,
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = Math.round(context.parsed.y); // Round Y value
              return `${label}: ${value}`;
            }
          }
        }
      }
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "House value",
          type: 'line',
          data: rangeOne,
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 1,
          borderDash: [0,1],
          pointStyle: 'circle',
          pointRadius: ctx => {
            const y = ctx.chart.data.labels[ctx.dataIndex];
            return (y === '1984' || y === '1996' || y === '2013')
              ? 3
              : (y === '1975' || y === '1990' || y === '2007' || y === '2021')
                ? 3
                : 2;
          },
          fill: false,
          pointBackgroundColor: ctx => {
            const y = ctx.chart.data.labels[ctx.dataIndex];
            return (y === '1984' || y === '1996' || y === '2013')
              ? 'rgba(19, 162, 173, 1)'
              : (y === '1975' || y === '1990' || y === '2007' || y === '2021')
                ? 'rgba(255, 0, 0, 1)'
                : 'black';
          },
          pointBorderColor: ctx => {
            const y = ctx.chart.data.labels[ctx.dataIndex];
            return (y === '1984' || y === '1996' || y === '2013')
              ? 'rgba(19, 162, 173, 1)'
              : (y === '1975' || y === '1990' || y === '2007' || y === '2021')
                ? 'rgba(255, 0, 0, 1)'
                : 'black';
          },
        },
        {
          label: "Neutral",
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 75,
          pointStyle: false,
          pointRadius: 0,
          fill: false
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
