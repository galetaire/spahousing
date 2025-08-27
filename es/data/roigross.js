//makeChart, calling the data and variables from the .csv file
function makeChart(roigross) {
  var rangeStart = 86;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = roigross.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = roigross.map(function(d) {return d.Inflation_CPI}).slice(rangeStart, rangeEnd);
  var rangeTwo = roigross.map(function(d) {return d.Nominal_price_yoy_per}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  new Chart('roigross', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Inflación',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          pointStyle: 'circle',
          pointRadius: 2,
          borderDash:[5, 5],
          fill: false
        },
        {
          label: 'Apreciación bruta de la vivienda',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgb(0, 204, 153, 0.9)'
              : 'rgba(255, 0, 0, 0.5)',
          borderColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgb(4, 138, 104, 1)'
              : 'rgba(255, 0, 0, 1)',
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
                  if (label === '...') {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  } else if (label === 'Apreciación bruta de la vivienda') {
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
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
