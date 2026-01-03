//makeChart, calling the data and variables from the .csv file
function makeChart(cement) {
  var rangeStart = 64;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = cement.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = cement.map(function(d) {return d.Real_price_over}).slice(rangeStart, rangeEnd);
  var rangeTwo = cement.map(function(d) {return d.Cement_mt}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('cement', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Preu real sobreponderat',
          type: 'line',
          data: rangeOne,
          yAxisID: 'yLeft',               // ← correct axis
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 3,
          fill: false
        },
        {
          label: 'Consum de ciment (Tm)',
          type: 'bar',
          yAxisID: 'yRight',
          data: rangeTwo,
          backgroundColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgba(91, 155, 213, 0.8)'
              : 'rgba(255, 153, 0, 0.9)',
          borderColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgba(91, 155, 213, 1)'
              : 'rgba(255, 153, 0, 1)',
          categoryPercentage: 1,
          borderWidth: 1,
        },
      ]
    },
    options: {
      plugins: {
    tooltip: {
      callbacks: {
        label(ctx) {
                  const label = ctx.dataset.label || '';
                  let value = ctx.parsed.y;

                  // Only format this one dataset’s value
                  if (label === 'Consum de ciment (Tm)' ||
                      label === 'Preu real sobreponderat') {
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
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true,
          }
        },
        yLeft: {
          type: 'linear',
          position: 'left',
          stacked: false,
          ticks: { beginAtZero: true }
        },
        yRight: {
          type: 'linear',
          position: 'right',
          stacked: false,
          ticks: { beginAtZero: true, }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
