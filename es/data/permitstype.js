// Builds the chart from the rows of the dataset
function makeChart(permitstype) {
  const rangeStart = 91;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = permitstype.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  const rangeOne = permitstype.map(function(d) { return d.Build;}).slice(rangeStart, rangeEnd);
  const rangeTwo = permitstype.map(function(d) { return d.Reform;}).slice(rangeStart, rangeEnd);
  const rangeTres = permitstype.map(function(d) { return d.Demolish;}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;

  const chart = new Chart('permitstype', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Construcción",
          data: rangeOne,
          backgroundColor: 'rgba(47, 85, 151, 0.7)',
          borderColor: 'rgba(47, 85, 151, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        },
        {
          label: "Reforma",
          data: rangeTwo,
          backgroundColor: 'rgba(255, 113, 113, 0.7)',
          borderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        },
        {
          label: "Demolición",
          data: rangeTres,
          backgroundColor: 'rgba(0, 204, 153, 0.7)',
          borderColor: 'rgba(0, 204, 153, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        },
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        },
      },
      plugins: {
        datalabels: false,
        tooltip: {
          callbacks: {
            label(ctx) {
                      const label = ctx.dataset.label || '';
                      let value = ctx.parsed.y;

                      // Only format this one dataset’s value
                      if (label === 'Construcción' ||
                          label === 'Reforma' ||
                          label === 'Demolición') {
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
      }
    }
  });
}

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
