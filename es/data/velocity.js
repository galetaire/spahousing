function makeChart(velocity) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  var rangeStart = 104;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = velocity.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = velocity.map(function(d) {return d.Land_velocity_years}).slice(rangeStart, rangeEnd);
  var rangeTwo = velocity.map(function(d) {return d.House_velocity_years}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('velocity', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Velocidad del suelo",
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 4,
          pointStyle: 'circle',
          pointBorderColor: 'black',
          pointRadius: 9,
          fill: false,
          tension: 0.4
        },
        {
          label: "Velocidad de la vivienda",
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderColor: 'rgba(47, 85, 151, 1)',
          borderWidth: 4,
          pointStyle: 'circle',
          pointBorderColor: 'black',
          pointRadius: 9,
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
          color: 'white',       // Text color
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
