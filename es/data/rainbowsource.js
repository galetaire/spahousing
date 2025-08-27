//makeChart, calling the data and variables from the .csv file
function makeChart(rainbowsource) {
  var rangeStart = 64;
  var rangeEnd = 171;
  var rangeLabels = rainbowsource.map(function(d) { return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = rainbowsource.map(function(d) { return d.Rainbow_curve}).slice(rangeStart, rangeEnd);
  var rangeTwo = rainbowsource.map(function(d) { return d.Population_25_50}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.family = "Courier New, Courier, monospace";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = 'black';

  var chart = new Chart('rainbowsource', {
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

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
