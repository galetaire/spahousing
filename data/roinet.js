// Builds the chart from the rows of the dataset
function makeChart(roinet) {
  const rangeStart = 86;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = roinet.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = roinet.map(function(d) {return d.Inflation_CPI}).slice(rangeStart, rangeEnd);
  const rangeTwo = roinet.map(function(d) {return Number((100 / d.Rent_ROI_net)) + Number(d.Nominal_price_yoy_per)}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  new Chart('roinet', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Inflation',
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
          label: 'Gross appreciation + net rental returns',
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
                  } else if (label === 'Gross appreciation + net rental returns') {
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
