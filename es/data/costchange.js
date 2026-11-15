// Builds the chart from the rows of the dataset
function makeChart(costchange) {
  const rangeStart = 92;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = costchange.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = costchange.map(function(d) {return d.Inflation_CPI}).slice(rangeStart, rangeEnd);
  const rangeTwo = costchange.map(function(d) {return d.Cost_production_ave}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  new Chart('costchange', {
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
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Costes de producción',
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
                  } else if (label === 'Costes de producción') {
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
