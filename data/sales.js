// Builds the chart from the rows of the dataset
function makeChart(sales) {
  const rangeStart = 103;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = sales.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = sales.map(function(d) {return d.Population_25_50 / 26}).slice(rangeStart, rangeEnd);
  const rangeTwo = sales.map(function(d) {return d.Population_25_50 / 26 / 2}).slice(rangeStart, rangeEnd);
  const rangeTres = sales.map(function(d) {return d.Population_25_50 / 26 / 1.33333}).slice(rangeStart, rangeEnd);
  const rangeFour = sales.map(function(d) {return d.Inheritances}).slice(rangeStart, rangeEnd);
  const rangeFive = sales.map(function(d) {return d.Home_sales}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('sales', {
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
                  if (label === 'Home sales' ||
                      label ==='Inheritances') {
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
          label: 'Upper limit',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'line',
          fill: false
        },
        {
          label: 'Lower limit',
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'line',
          fill: false
        },
        {
          label: 'Optimal',
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
            label: 'Inheritances',
            type: 'bar',
            data: rangeFour,
            backgroundColor: 'rgba(178, 10, 142, 1)',
            borderColor: 'rgba(178, 10, 142, 1)',
            borderWidth: 0,
        },
        {
            label: 'Home sales',
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
