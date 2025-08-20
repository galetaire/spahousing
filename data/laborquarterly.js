//makeChart, calling the data and variables from the .csv file
function makeChart(laborquarterly) {
  var rangeStart = 0;
  var rangeEnd = new Date().getFullYear() - 1950;
  var rangeLabels = laborquarterly.map(function(d) { return d.Quarter}).slice(rangeStart, rangeEnd);
  var rangeOne = laborquarterly.map(function(d) { return d.Unemployment}).slice(rangeStart, rangeEnd);
  var rangeTwo = laborquarterly.map(function(d) { return d.HPI}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;

  var chart = new Chart('laborquarterly', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Unemployment (inverted)",
          data: rangeOne,
          yAxisID: 'yRight',                  // Use the left y-axis
          backgroundColor: 'white',
          borderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointBorderColor: 'rgba(255, 113, 113, 1)',
          pointRadius: 3,
          fill: false,
          tension: 0.4
        },
        {
          label: "HPI",
          data: rangeTwo,
          yAxisID: 'yLeft',                 // Use the right y-axis
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgba(91, 155, 213, 0.8)',
          borderWidth: 1.5,
          pointStyle: 'crossRot',
          pointRadius: 5,
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
            minRotation: 90
          }
        },
        yLeft: {
          min: 80,
          max: 180,
          type: 'linear',
          position: 'left',
          ticks: {
            stepSize: 20,
          },
        },
        yRight: {
          reverse: true,    // <-- invert the y‑axis
          type: 'linear',
          position: 'right',
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = Math.round(context.parsed.y);
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/refs/heads/main/public/docs/spain_stats_quarterly.csv')
  .then(makeChart);
