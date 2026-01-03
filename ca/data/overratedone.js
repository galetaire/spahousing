function makeChart(overratedone) {
  // Register the plugin

  var rangeStart = 85;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = overratedone.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = overratedone.map(function(d) {return d.Real_price_over}).slice(rangeStart, rangeEnd);
  var rangeTwo = overratedone.map(function(d) {return d.Real_price}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('overratedone', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Preu real sobreponderat",
          data: rangeOne,
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 3,
          pointBorderColor: 'black',
          borderDash:[5, 5],
          fill: false,
          tension: 0.4,
          pointStyle: false,

        },
        {
          label: "Preu real",
          data: rangeTwo,
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 2,
          pointBorderColor: 'black',
          fill: false,
          pointStyle: false,
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
        }
      },
      // Enable tooltips as before
      plugins: {
        tooltip: {
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
