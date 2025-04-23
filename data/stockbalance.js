//makeChart, calling the data and variables from the .csv file
function makeChart(stockbalance) {
  var rangeStart = 0;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = stockbalance.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = stockbalance.map(function(d) {return d.Balance}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  var chart = new Chart('stockbalance', {
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            autoSkip: true,
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true
          }
        },
        y: {
          ticks: {
            beginAtZero: true
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
                  if (label === 'Housing year-on-year balance') {
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
        },
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
            label: 'Housing year-on-year balance',
            type: 'bar',
            data: rangeOne,
            backgroundColor: ctx =>
              ctx.parsed.y >= 0
                ? 'rgba(91, 155, 213, 0.5)'  // special color for exactly 1 885 000
                : 'rgba(0, 204, 153, 0.7)',   // default color
            borderColor: ctx =>
              ctx.parsed.y >=0
              ? 'rgba(91, 155, 213, 1)'  // special color for exactly 1 885 000
              : 'rgba(0, 204, 153, 1)',   // default color
            borderWidth: 0.5,
            barThickness: 4.5,
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
