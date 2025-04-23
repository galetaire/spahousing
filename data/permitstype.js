//makeChart, calling the data and variables from the .csv file
function makeChart(permitstype) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = permitstype.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  var rangeOne = permitstype.map(function(d) { return d.Build;}).slice(rangeStart, rangeEnd);
  var rangeTwo = permitstype.map(function(d) { return d.Reform;}).slice(rangeStart, rangeEnd);
  var rangeTres = permitstype.map(function(d) { return d.Demolish;}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;

  var chart = new Chart('permitstype', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Build",
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
          label: "Reform",
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
          label: "Demolish",
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
                      if (label === 'Build' ||
                          label === 'Reform' ||
                          label === 'Demolish') {
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
