//makeChart, calling the data and variables from the .csv file
function makeChart(publicprivateper) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = publicprivateper.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = publicprivateper.map(function(d) {return d.Public_housing_per}).slice(rangeStart, rangeEnd);
  var rangeTwo = publicprivateper.map(function(d) {return d.Private_housing_per}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('publicprivateper', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Vivienda pública',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(255, 113, 113, 1)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false,
          barThickness: 20.5,
        },
        {
          label: 'Vivienda privada',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(238, 181, 0, 1)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false,
          barThickness: 20.5,
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
                  } else if (label === 'Vivienda pública' ||
                            label === 'Vivienda privada') {
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

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
