//makeChart, calling the data and variables from the .csv file
function makeChart(marketgdp) {
  var rangeStart = 80;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = marketgdp.map(function(d) { return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = marketgdp.map(function(d) { return d.Market_cap/d.GDP_spain}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('marketgdp', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Ràtio Bens immobles/PIB",
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
      },
      // Enable tooltips as before
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Ràtio: ' + parseFloat(context.parsed.y).toFixed(2);
            }
            }
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
            return parseFloat(value).toFixed(2); // e.g. 1.456789 → "1.46"
          }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
