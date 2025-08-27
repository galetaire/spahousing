//makeChart, calling the data and variables from the .csv file
function makeChart(housedollar) {
  var rangeStart = 85;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = housedollar.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  var rangeOne = housedollar.map(function(d) { return d.USD_house; }).slice(rangeStart, rangeEnd);
  var rangeTwo = housedollar.map(function(d) { return d.EUR_house; }).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;

  var chart = new Chart('housedollar', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Precio en USD ($)",
          data: rangeOne,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'rgba(102, 158, 64, 0.8)',
          borderColor: 'rgba(102, 158, 64, 1)',
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
          min: 0,
          max: 300000,
          type: 'linear',
          position: 'left'
        },
        yRight: {
          min: 0,
          max: 300000,
          type: 'linear',
          position: 'right'
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(ctx) {
                  const label = ctx.dataset.label || '';
                  let value = ctx.parsed.y;

                  // Only format this one dataset’s value
                  if (label === 'Precio en Euros (€)' ||
                    label === 'Precio en USD ($)') {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  } else if (label === '...') {
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
