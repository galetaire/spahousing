//makeChart, calling the data and variables from the .csv file
function makeChart(rainbow) {
  var rangeStart = 64;
  var rangeEnd = 171;
  var rangeLabels = rainbow.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = rainbow.map(function(d) {return d.Real_price_over}).slice(rangeStart, rangeEnd);
  var rangeTwo = rainbow.map(function(d) {return d.Rainbow_curve}).slice(rangeStart, rangeEnd);
  var rangeTres = rainbow.map(function(d) {return d.RC_plus50}).slice(rangeStart, rangeEnd);
  var rangeFour = rainbow.map(function(d) {return d.RC_minus50}).slice(rangeStart, rangeEnd);
  var rangeFive = rainbow.map(function(d) {return d.RC_plus100}).slice(rangeStart, rangeEnd);
  var rangeSix = rainbow.map(function(d) {return d.RC_minus100}).slice(rangeStart, rangeEnd);

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
  Chart.defaults.color = 'white';

  var chart = new Chart('rainbow', {
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
          title: {
                  display: true,
                  text: 'Precio en euros, ajustado a inflación',
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
                text: 'Ciclos del precio de la vivienda - España',
                color: "white",
                font: {
                  size: 12
                },
            },
        legend: {
        display: false    // ← hide the legend
              },
        customCanvasBackgroundColor: {
        color: 'rgba(38, 38, 38, 1)',
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
          label: "Valor de la vivienda",
          type: 'line',
          data: rangeOne,
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 0.1,
          borderDash: [0,1],
          pointStyle: 'circle',
          pointRadius: 2.5,
          fill: false
        },
        {
          label: "Neutral",
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(230, 198, 126, 0.5)',
          borderColor: 'rgba(230, 198, 126, 0.5)',
          borderWidth: 15.5,
          pointStyle: 'dash',
          pointRadius: 0,
          fill: false
        },
        {
          label: "Ligera sobrevaloración",
          type: 'line',
          data: rangeTres,
          backgroundColor: 'rgba(255, 102, 0, 0.5)',
          borderColor: 'rgba(255, 102, 0, 0.5)',
          borderWidth: 15.5,
          pointStyle: 'dash',
          pointRadius: 0,
          fill: false
        },
        {
          label: "Ligera infravaloración",
          type: 'line',
          data: rangeFour,
          backgroundColor: 'rgba(12, 160, 111, 0.5)',
          borderColor: 'rgba(12, 160, 111, 0.5)',
          borderWidth: 15.5,
          pointStyle: 'dash',
          pointRadius: 0,
          fill: false
        },
        {
          label: "Acusada sobrevaloración",
          type: 'line',
          data: rangeFive,
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderColor: 'rgba(255, 0, 0, 0.5)',
          borderWidth: 15.5,
          pointStyle: 'dash',
          pointRadius: 0,
          fill: false
        },
        {
          label: "Acusada infravaloración",
          type: 'line',
          data: rangeSix,
          backgroundColor: 'rgba(9, 87, 134, 0.5)',
          borderColor: 'rgba(9, 87, 134, 0.5)',
          borderWidth: 15.5,
          pointStyle: 'dash',
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
