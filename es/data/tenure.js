// Builds the chart from the rows of the dataset
function makeChart(tenure) {
  const rangeStart = 104;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = tenure.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = tenure.map(function(d) {return d.Owned_per}).slice(rangeStart, rangeEnd);
  const rangeTwo = tenure.map(function(d) {return d.Rented_per}).slice(rangeStart, rangeEnd);
  const rangeTres = tenure.map(function(d) {return d.Freely_loaned_per}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 14;
  new Chart('tenure', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Cedidas',
          type: 'bar',
          data: rangeTres,
          backgroundColor: 'rgba(255, 192, 0, 0.9)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
        {
          label: 'Alquiladas',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
        {
          label: 'En propiedad',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
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
                  } else if (label === 'En propiedad' ||
                              label === 'Alquiladas' ||
                            label === 'Cedidas') {
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
        y: {
          min: 0,
          max: 100,
          stacked: true,
          ticks: {
            callback: function(value, index, ticks) {
            return value + '%';
          },
            beginAtZero: true,
          },
        },
      }
    }
  });
}

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
