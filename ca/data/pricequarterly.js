// Builds the chart from the rows of the dataset
function makeChart(pricequarterly) {
  const rangeStart = 0;
  const rangeEnd = new Date().getFullYear() - 1948;
  const rangeLabels = pricequarterly.map(function(d) { return d.Quarter}).slice(rangeStart, rangeEnd);
  const rangeOne = pricequarterly.map(function(d) { return d.Price_idealista}).slice(rangeStart, rangeEnd);
  const rangeTwo = pricequarterly.map(function(d) { return d.Price_notaries}).slice(rangeStart, rangeEnd);
  const rangeTres = pricequarterly.map(function(d) { return d.Sharp_change}).slice(rangeStart, rangeEnd);
  const rangeFour = pricequarterly.map(function(d) { return d.Spread}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;

  const chart = new Chart('pricequarterly', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Preu a Idealista",
          data: rangeOne,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'rgba(47, 85, 151, 1)',
          borderColor: 'rgba(47, 85, 151, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointBorderColor: 'rgba(47, 85, 151, 1)',
          pointRadius: 1,
          fill: false,
          tension: 0.4
        },
        {
          label: "Preu dels notaris",
          data: rangeTwo,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'rgba(255, 113, 113, 1)',
          borderColor: 'rgba(255, 113, 113, 1)',
          pointBorderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          pointRadius: 1,
          fill: false,
          tension: 0.4
        },
        {
          label: "Canvi brusc",
          data: rangeTres,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'rgba(0, 204, 153, 1)',
          borderColor: 'rgba(0, 204, 153, 1)',
          borderWidth: 0.5,
          pointBorderColor: 'black',
          pointStyle: 'crossRot',
          pointRadius: 3,
          fill: false,
          tension: 0.4
        },
        {
          label: "Diferencial",
          data: rangeFour,
          yAxisID: 'yRight',                  // Use the left y-axis
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          pointBorderColor: 'black',
          borderWidth: 1,
          pointStyle: false,
          pointRadius: 2,
          fill: true,
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
          type: 'linear',
          position: 'left',
          beginAtZero: true,
        },
        yRight: {
          min: 0,
          max: 50,
          type: 'linear',
          position: 'right',
          beginAtZero: true,
        }
      },
      plugins: {
        datalabels: false,
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_QUARTERLY_CSV)
  .then(makeChart);
