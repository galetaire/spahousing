// Builds the chart from the rows of the dataset
function makeChart(marketgdp) {
  const rangeStart = 80;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = marketgdp.map(function(d) { return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = marketgdp.map(function(d) { return d.Market_cap/d.GDP_spain}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('marketgdp', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Ratio Bienes inmuebles/PIB",
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
              return 'Ratio: ' + parseFloat(context.parsed.y).toFixed(2);
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
