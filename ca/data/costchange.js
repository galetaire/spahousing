//makeChart, calling the data and variables from the .csv file
function makeChart(costchange) {
  var rangeStart = 92;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = costchange.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = costchange.map(function(d) {return d.Inflation_CPI}).slice(rangeStart, rangeEnd);
  var rangeTwo = costchange.map(function(d) {return d.Cost_production_ave}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  new Chart('costchange', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Inflació',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          pointStyle: 'circle',
          pointRadius: 2,
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Costs de producció',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgb(112, 48, 160, 0.9)'
              : 'rgba(255, 153, 0, 0.9)',
          borderColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgb(0, 0, 0, 0.7)'
              : 'rgba(0, 0, 0, 0.7)',
          categoryPercentage: 1,
          borderWidth: 1,
        },
      ]
    },
    options: {
      plugins: {
        datalabels: false,
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
                  } else if (label === 'Costs de producció') {
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
