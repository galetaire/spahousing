//makeChart, calling the data and variables from the .csv file
function makeChart(employed100) {
  var rangeStart = 90;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = employed100.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = employed100.map(function(d) {return d.Workers_per_100_inhab}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  new Chart('employed100', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Treballadors en el sector de la construcció per cada 100 habitants',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(255, 153, 0, 1)',
          borderColor: 'rgba(0, 0, 0, 1)',
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
                  } else if (label === 'Treballadors en el sector de la construcció per cada 100 habitants') {
                    // two decimals
                    value = value.toFixed(2);
                  }
                  // For all others, leave as-is (or format differently)
                  return `${label}: ${value}`;
                },
            }
          },
          datalabels: {
            align: 'center',      // Position text in the center
            anchor: 'center',     // Anchor text in the center of the point
            color: 'black',       // Text color
            font: {
              size: 12
            },
            formatter: function(value, context) {
              return Number(value).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              });
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

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
