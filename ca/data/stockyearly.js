// Builds the chart from the rows of the dataset
function makeChart(stockyearly) {
  const rangeStart = 0;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = stockyearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = stockyearly.map(function(d) {return d.New_homes}).slice(rangeStart, rangeEnd);
  const rangeTwo = stockyearly.map(function(d) {return d.Pop_abs_yoy}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  const chart = new Chart('stockyearly', {
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
