//makeChart, calling the data and variables from the .csv file
function makeChart(sales) {
  var rangeStart = 103;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = sales.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = sales.map(function(d) {return d.Upper_limit}).slice(rangeStart, rangeEnd);
  var rangeTwo = sales.map(function(d) {return d.Lower_limit}).slice(rangeStart, rangeEnd);
  var rangeTres = sales.map(function(d) {return d.Optimal}).slice(rangeStart, rangeEnd);
  var rangeFour = sales.map(function(d) {return d.Inheritances}).slice(rangeStart, rangeEnd);
  var rangeFive = sales.map(function(d) {return d.Home_sales}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('sales', {
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            autoSkip: false,
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
                  if (label === 'Compraventas' ||
                      label ==='Herencias') {
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
          label: 'Límite superior',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'line',
          fill: false
        },
        {
          label: 'Límite inferior',
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'line',
          fill: false
        },
        {
          label: 'Óptimo',
          type: 'line',
          data: rangeTres,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[5, 5],
          fill: false
        },
        {
            label: 'Herencias',
            type: 'bar',
            data: rangeFour,
            backgroundColor: 'rgba(178, 10, 142, 1)',
            borderColor: 'rgba(178, 10, 142, 1)',
            borderWidth: 0,
        },
        {
            label: 'Compraventas',
            type: 'bar',
            data: rangeFive,
            backgroundColor: 'rgba(91, 155, 213, 1)',
            borderColor: 'rgba(91, 155, 213, 1)',
            borderWidth: 0,
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
