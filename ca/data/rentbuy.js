function makeChart(rentbuy) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  const rangeStart = 107;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = rentbuy.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = rentbuy.map(function(d) {return d.Idealista_mortgage_86m}).slice(rangeStart, rangeEnd);
  const rangeTwo = rentbuy.map(function(d) {return d.Idealista_rent_86m}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('rentbuy', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Mensualitat mitjana de les hipoteques",
          data: rangeOne,
          backgroundColor: 'rgb(255, 197, 197, 1)',
          borderColor: 'rgb(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointBorderColor: 'rgb(255, 113, 113, 1',
          pointRadius: 13,
          fill: false,
          tension: 0.4
        },
        {
          label: "Mensualitat mitjana del lloguer",
          data: rangeTwo,
          backgroundColor: 'rgba(165, 255, 233, 1)',
          borderColor: 'rgb(0, 204, 153, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointBorderColor: 'rgb(0, 204, 153, 1',
          pointRadius: 13,
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
