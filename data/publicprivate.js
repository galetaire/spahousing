//makeChart, calling the data and variables from the .csv file
function makeChart(publicprivate) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = publicprivate.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = publicprivate.map(function(d) {return d.Private_housing}).slice(rangeStart, rangeEnd);
  var rangeTwo = publicprivate.map(function(d) {return d.Public_housing}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('publicprivate', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Public housing',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(255, 113, 113, 1)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          categoryPercentage: 1,
          borderWidth: 1,
          stack: 'combined',
          barThickness: 20,
        },
        {
          label: 'Private housing',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(238, 181, 0, 1)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          categoryPercentage: 1,
          borderWidth: 1,
          stack: 'combined',
          barThickness: 20,
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
                  if (label === 'Public housing' ||
                      label === 'Private housing') {
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
