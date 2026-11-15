function makeChart(ipvvr) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  const rangeStart = 94;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = ipvvr.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = ipvvr.map(function(d) {return d.Price_IPVVR}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('ipvvr', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Índex Case-Shiller (IPVVR)",
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: 'rgb(166, 17, 17, 1)',
          borderWidth: 1,
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
