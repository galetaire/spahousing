// Builds the chart from the rows of the dataset
function makeChart(marketcap) {
  const rangeStart = 80;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = marketcap.map(function(d) { return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = marketcap.map(function(d) { return d.Market_cap}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('marketcap', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Valor de mercat dels bens immobles",
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
      return (value / 1000000000000).toFixed(1) + ' bilions'; // e.g. 1500 → "1.5K"
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
