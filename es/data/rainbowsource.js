// Builds the chart from the rows of the dataset
function makeChart(rainbowsource) {
  const rangeStart = 64;
  const rangeEnd = 171;
  const rangeLabels = rainbowsource.map(function(d) { return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = rainbowsource.map(function(d) { return d.Rainbow_curve}).slice(rangeStart, rangeEnd);
  const rangeTwo = rainbowsource.map(function(d) { return d.Population_25_50}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.family = "Courier New, Courier, monospace";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = 'black';

  const chart = new Chart('rainbowsource', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Curva arcoíris",
          data: rangeOne,
          yAxisID: 'yLeft',                  // Use the left y-axis
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[5, 3],
          pointRadius: 1,
          tension: 0.4
        },
        {
          label: "Población entre 25-50 años",
          data: rangeTwo,
          yAxisID: 'yRight',                 // Use the right y-axis
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[5, 3],
          pointRadius: 1,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        },
        yLeft: {
          min: 0,
          max: 500,
          type: 'linear',
          position: 'left',
          beginAtZero: true,
        },
        yRight: {
          min: 0,
          max: 25000000,
          type: 'linear',
          position: 'right',
          beginAtZero: true,
        }
      },
    }
  });
}

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
