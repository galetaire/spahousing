//makeChart, calling the data and variables from the .csv file
function makeChart(creditmovement) {
  var rangeStart = 95;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = creditmovement.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = creditmovement.map(function(d) {return d.Average_amount}).slice(rangeStart, rangeEnd);
  var rangeTwo = creditmovement.map(function(d) {return d.Real_credit_movement}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('creditmovement', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Import mitjà de les hipoteques',
          type: 'line',
          data: rangeOne,
          yAxisID: 'yRight',               // ← correct axis
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
        {
          label: 'Evolució del crèdit',
          type: 'bar',
          yAxisID: 'yLeft',
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
                  if (label === 'Import mitjà de les hipoteques') {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  } else if (label === 'Evolució del crèdit') {
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
          min: -60,
          max: 100,
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
