//makeChart, calling the data and variables from the .csv file
function makeChart(marketcap) {
  var rangeStart = 80;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = marketcap.map(function(d) { return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = marketcap.map(function(d) { return d.Market_cap}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('marketcap', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Valor de mercado de los bienes inmuebles",
          data: rangeOne,
          backgroundColor: 'rgba(255, 248, 201, 0.3)',
          borderColor: 'black',
          borderWidth: 2,
          pointBorderColor: 'black',
          fill: true,
          pointStyle: 1,
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
  ticks: {
    callback: function(value) {
      return (value / 1000000000000).toFixed(1) + ' billones'; // e.g. 1500 → "1.5K"
    }
  }
}
      },
      // Enable tooltips as before
      plugins: {
        tooltip: {
        },
        // Add data labels
        datalabels: {
          display: false,
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
