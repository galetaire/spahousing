//makeChart, calling the data and variables from the .csv file
function makeChart(typemortgage) {
  var rangeStart = 103;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = typemortgage.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = typemortgage.map(function(d) {return d.Fixed_mortgages}).slice(rangeStart, rangeEnd);
  var rangeTwo = typemortgage.map(function(d) {return d.Variable_mortgages}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('typemortgage', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Fixed mortgages',
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
          label: 'Variable mortgages',
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

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
