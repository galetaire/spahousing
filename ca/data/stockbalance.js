// Builds the chart from the rows of the dataset
function makeChart(stockbalance) {
  const rangeStart = 0;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = stockbalance.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = stockbalance.map(function(d) {return Number(d.New_homes - (d.Pop_abs_yoy / 2))}).slice(rangeStart, rangeEnd);
  const rangeTwo = stockbalance.map(function(d) {return d.Balance_hogares}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  const chart = new Chart('stockbalance', {
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
                  if (label === 'Balanç anual habitatges') {
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
            label: 'Balanç anual (segons parelles potencials)',
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
            barThickness: 5,
        },
        {
            label: 'Balanç anual (segons grandària de la llar)',
            type: 'bar',
            data: rangeTwo,
            hidden: true,
            backgroundColor: ctx =>
              ctx.parsed.y >= 0
                ? 'rgba(91, 155, 213, 0.5)'  // special color for exactly 1 885 000
                : 'rgba(0, 204, 153, 0.7)',   // default color
            borderColor: ctx =>
              ctx.parsed.y >=0
              ? 'rgba(91, 155, 213, 1)'  // special color for exactly 1 885 000
              : 'rgba(0, 204, 153, 1)',   // default color
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
