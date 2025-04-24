//makeChart, calling the data and variables from the .csv file
function makeChart(salesquarterly) {
  var rangeStart = 0;
  var rangeEnd = new Date().getFullYear() - 1953;
  var rangeLabels = salesquarterly.map(function(d) { return d.Quarter}).slice(rangeStart, rangeEnd);
  var rangeOne = salesquarterly.map(function(d) { return d.Sales}).slice(rangeStart, rangeEnd);
  var rangeTwo = salesquarterly.map(function(d) { return d.HPI}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const salesData = rangeOne.slice(); // copy of your sales array

  var chart = new Chart('salesquarterly', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "House Price Index (HPI)",
          data: rangeTwo,
          yAxisID: 'yLeft',                 // Use the right y-axis
          backgroundColor: 'white',
          borderColor: 'rgba(0, 0, 0, 0.6)',
          borderWidth: 1.5,
          pointStyle: 'circle',
          pointBorderColor: 'rgba(0, 0, 0, 1)',
          pointRadius: 2,
          fill: false,
          tension: 0.4
        },
        {
          label: "Home sales",
          data: salesData,
          type: 'bar',
          yAxisID: 'yRight',
          // scriptable backgroundColor:
          backgroundColor: ctx => {
            const i = ctx.dataIndex;
            // leave the first bar a neutral color if you like:
            if (i === 0) return 'rgba(255, 113, 113, 1)';
            // current vs previous:
            return salesData[i] > salesData[i - 1]
              ? 'rgba(75, 192, 192, 0.8)'  // green-ish
              : 'rgba(255, 99, 132, 0.8)'; // red-ish
          },
          // match the borderColor so the outline matches the fill
          borderColor: ctx => {
            const i = ctx.dataIndex;
            if (i === 0) return 'rgba(255, 113, 113, 1)';
            return salesData[i] > salesData[i - 1]
              ? 'rgba(75, 192, 192, 1)'
              : 'rgba(255, 99, 132, 1)';
          },
          borderWidth: 2,
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
        yLeft: {
          min: 0,
          max: 200,
          type: 'linear',
          position: 'left',
          beginAtZero: true
        },
        yRight: {
          type: 'linear',
          position: 'right'
        }
      },
      plugins: {
        plugins: {
      tooltip: {
        callbacks: {
          label(ctx) {
                    const label = ctx.dataset.label || '';
                    let value = ctx.parsed.y;

                    // Only format this one dataset’s value
                    if (label === 'Home sales') {
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
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/refs/heads/main/public/docs/spain_stats_quarterly.csv')
  .then(makeChart);
