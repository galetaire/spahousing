//makeChart, calling the data and variables from the .csv file
function makeChart(credityearly) {
  var rangeStart = 95;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = credityearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = credityearly.map(function(d) {return d.Upper_limit}).slice(rangeStart, rangeEnd);
  var rangeTwo = credityearly.map(function(d) {return d.Lower_limit}).slice(rangeStart, rangeEnd);
  var rangeTres = credityearly.map(function(d) {return d.Optimal}).slice(rangeStart, rangeEnd);
  var rangeThree = credityearly.map(function(d) {return d.Approved}).slice(rangeStart, rangeEnd);
  var rangeFour = credityearly.map(function(d) {return d.Releases}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('credityearly', {
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true
          }
        },
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      },
      plugins: {
    tooltip: {
      callbacks: {
        label(ctx) {
                  const label = ctx.dataset.label || '';
                  let value = ctx.parsed.y;

                  // Only format these two datasets’ values
                  if (
                    label === 'Cancel·lades' ||
                    label === 'Aprovades' ||
                    label === 'Exuberància irracional (límit demogràfic)'
                  ) {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  }

                  return `${label}: ${value}`;
                },
            }
          }
        },
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Exuberància irracional (límit demogràfic)',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          fill: false
        },
        /*{
          label: 'Lower limit',
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[5, 5],
          fill: false
        },
        {
          label: 'Optimal',
          type: 'line',
          data: rangeTres,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[1, 2],
          fill: false
        },*/
        {
            label: 'Cancel·lades',
            type: 'bar',
            data: rangeFour,
            backgroundColor: 'rgba(255, 153, 0, 1)',
            borderColor: 'rgba(38, 38, 38, 0.8)',
            //borderRadius: Number.MAX_VALUE,
            borderWidth: 1,
            categoryPercentage: 0.6,
        },
        {
            label: 'Aprovades',
            type: 'bar',
            data: rangeThree,
            backgroundColor: 'rgba(91, 155, 213, 0.8)',
            borderColor: 'rgba(38, 38, 38, 1)',
            borderWidth: 1,
            categoryPercentage: 1,
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
