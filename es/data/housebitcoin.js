//makeChart, calling the data and variables from the .csv file
function makeChart(housebitcoin) {
  var rangeStart = 110;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = housebitcoin.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = housebitcoin.map(function(d) {return d.BTC_house}).slice(rangeStart, rangeEnd);
  var rangeTwo = housebitcoin.map(function(d) { return d.EUR_house; }).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;

  var chart = new Chart('housebitcoin', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Precio en bitcoin (₿)",
          data: rangeOne,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'rgba(255,153,0, 0.8)',
          borderColor: 'rgba(255,153,0, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        },
        {
          label: "Precio en Euros (€)",
          data: rangeTwo,
          yAxisID: 'yRight',                 // Use the right y-axis
          backgroundColor: 'rgba(68, 114, 196, 0.8)',
          borderColor: 'rgba(68, 114, 196, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        },
        yLeft: {
          type: 'logarithmic',
          position: 'left',
          ticks: {
              beginAtZero: true,
              callback: function(value) {
                if ([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000].includes(value)) {
                  return value.toString();
                }
                return '';
              },
              min: 0,
              max: 10000000
            },
        },
        yRight: {
          min: 0,
          max: 210000,
          type: 'linear',
          position: 'right',
          ticks: {
            stepSize: 35000,
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(ctx) {
                  const label = ctx.dataset.label || '';
                  let value = ctx.parsed.y;

                  // Only format this one dataset’s value
                  if (label === 'Precio en Euros (€)') {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  } else if (label === 'Precio en bitcoin (₿)') {
                    // two decimals
                    value = value.toFixed(2);
                  }
                  // For all others, leave as-is (or format differently)
                  return `${label}: ${value}`;
                },
            }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
