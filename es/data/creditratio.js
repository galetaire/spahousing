//makeChart, calling the data and variables from the .csv file
function makeChart(creditratio) {
  var rangeStart = 103;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = creditratio.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = creditratio.map(function(d) {return d.Ratio_mortgages_sales}).slice(rangeStart, rangeEnd);
  var rangeThree = creditratio.map(function(d) {return d.Approved}).slice(rangeStart, rangeEnd);
  var rangeFour = creditratio.map(function(d) {return d.Home_sales}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('creditratio', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Ratio entre hipotecas y compraventas',
          type: 'line',
          data: rangeOne,
          yAxisID: 'yRight',               // ← correct axis
          backgroundColor: 'rgba(255, 153, 0, 0.9)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 0.8,
          pointStyle: 'circle',
          pointRadius: 6,
          showLine: false,
          fill: false
        },
        {
          label: 'Compraventas',
          type: 'bar',
          yAxisID: 'yLeft',
          data: rangeFour,
          backgroundColor: 'rgba(91, 155, 213, 0)',
          borderColor: 'rgba(31, 78, 121, 1)',
          borderWidth: 2.3,
        },
        {
          label: 'Hipotecas',
          type: 'bar',
          yAxisID: 'yLeft',
          data: rangeThree,
          backgroundColor: 'rgba(91, 155, 213, 0.6)',
          borderColor: 'rgba(178, 10, 104, 1)',
          borderWidth: 0,
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
                  if (label === 'Compraventas' ||
                      label === 'Hipotecas') {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  } else if (label === 'Ratio entre hipotecas y compraventas') {
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
          min: 0,
          max: 1.8,
          type: 'linear',
          position: 'right',
          stacked: false,
          ticks: {
            beginAtZero: true,
            stepSize: 0.25714}
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
