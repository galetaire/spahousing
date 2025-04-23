function makeChart(wageratio) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  var rangeStart = 99;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = wageratio.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = wageratio.map(function(d) {return d.W_M_disconnect}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('wageratio', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Wage / Mortgage disconnection (%)",
          data: rangeOne,
          backgroundColor: 'rgba(255, 113, 113, 0.8)',
          borderColor: 'rgb(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointBorderColor: 'darkred',
          pointRadius: 12,
          fill: false,
          showLine: false,
          tension: 0.4
        },
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
        y: {
          beginAtZero: true,
        }
      },
      // Enable tooltips as before
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = Math.round(context.parsed.y); // Round Y value
              return `${label}: ${value}`;
            }
          }
        },
        // Add data labels
        datalabels: {
          align: 'center',      // Position text in the center
          anchor: 'center',     // Anchor text in the center of the point
          color: 'black',       // Text color
          font: {
            size: 10
          },
          formatter: function(value, context) {
            return Math.round(value); // Round off the displayed value
          }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
