//makeChart, calling the data and variables from the .csv file
function makeChart(typehouse) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = typehouse.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  var rangeOne = typehouse.map(function(d) { return d.Single_family;}).slice(rangeStart, rangeEnd);
  var rangeTwo = typehouse.map(function(d) { return d.Condominiums;}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('typehouse', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Single family',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(0, 204, 153, 0.7)',
          borderColor: 'rgba(0, 204, 153, 1)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false,
          barThickness: 17,
        },
        {
          label: 'Condominiums',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(91, 155, 213, 0.7)',
          borderColor: 'rgba(91, 155, 213, 1)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false,
          barThickness: 17,
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
                  if (label === 'Single family' ||
                      label === 'Condominiums') {
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
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
