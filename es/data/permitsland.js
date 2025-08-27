//makeChart, calling the data and variables from the .csv file
function makeChart(permitsland) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = permitsland.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  var rangeOne = permitsland.map(function(d) { return d.Building_permits}).slice(rangeStart, rangeEnd);
  var rangeTwo = permitsland.map(function(d) { return d.Price_urban_land}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;

  var chart = new Chart('permitsland', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Permisos de obra",
          data: rangeOne,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'rgba(47, 85, 151, 0.7)',
          borderColor: 'rgba(47, 85, 151, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        },
        {
          label: "Precio del suelo urbano (€/m2)",
          data: rangeTwo,
          yAxisID: 'yRight',                 // Use the right y-axis
          backgroundColor: 'rgba(255, 113, 113, 0.7)',
          borderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90,
          }
        },
        yLeft: {
          min: 0,
          max: 210000,
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          ticks: {
            stepSize: 35000,
          }
        },
        yRight: {
          beginAtZero: true,
          type: 'linear',
          position: 'right'
        }
      },
      plugins: {
        datalabels: false,
        tooltip: {
          callbacks: {
            label(ctx) {
                      const label = ctx.dataset.label || '';
                      let value = ctx.parsed.y;

                      // Only format this one dataset’s value
                      if (label === 'Permisos de obra' ||
                          label === 'Precio del suelo urbano (€/m2)') {
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

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
