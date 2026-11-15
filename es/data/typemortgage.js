// Builds the chart from the rows of the dataset
function makeChart(typemortgage) {
  const rangeStart = 103;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = typemortgage.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = typemortgage.map(function(d) {return d.Fixed_mortgages}).slice(rangeStart, rangeEnd);
  const rangeTwo = typemortgage.map(function(d) {return d.Variable_mortgages}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('typemortgage', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Hipotecas fijas',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(255, 153, 0, 0.9)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
        {
          label: 'Hipotecas variables',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
      ]
    },
    options: {
      plugins: {
    tooltip: {
          }
        },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true,
          }
        },
        y: {
          stacked: true,
          ticks: {
            callback: function(value, index, ticks) {
            return value + '%';
          },
            beginAtZero: true,
          },
        },
      }
    }
  });
}

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
