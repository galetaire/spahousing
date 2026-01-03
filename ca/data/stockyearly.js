//makeChart, calling the data and variables from the .csv file
function makeChart(stockyearly) {
  var rangeStart = 0;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = stockyearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = stockyearly.map(function(d) {return d.New_homes}).slice(rangeStart, rangeEnd);
  var rangeTwo = stockyearly.map(function(d) {return d.Pop_abs_yoy}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  var chart = new Chart('stockyearly', {
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
                  if (label === 'Nous habitatges construïts' ||
                      label === 'De/Creixement poblacional') {
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
            label: 'Nous habitatges construïts',
            type: 'bar',
            data: rangeOne,
            backgroundColor: 'rgba(91, 155, 213, 0.5)',
            borderColor: 'rgba(91, 155, 213, 1)',
            borderWidth: 0.5,
            barThickness: 5,
        },
        {
            label: 'De/Creixement poblacional',
            type: 'bar',
            data: rangeTwo,
            backgroundColor: 'rgba(0, 204, 153, 0.7)',
            borderColor: 'rgba(0, 204, 153, 1)',
            borderWidth: 0.5,
            barThickness: 5,
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
