// Builds the chart from the rows of the dataset
function makeChart(credityearly) {
  const rangeStart = 95;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = credityearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = credityearly.map(function(d) {return d.Population_25_50 / 26}).slice(rangeStart, rangeEnd);
  const rangeTwo = credityearly.map(function(d) {return d.Population_25_50 / 26 / 2}).slice(rangeStart, rangeEnd);
  const rangeTres = credityearly.map(function(d) {return d.Population_25_50 / 26 / 1.33333}).slice(rangeStart, rangeEnd);
  const rangeThree = credityearly.map(function(d) {return d.Approved}).slice(rangeStart, rangeEnd);
  const rangeFour = credityearly.map(function(d) {return d.Releases}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('credityearly', {
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
                    label === 'Releases' ||
                    label === 'Approvals' ||
                    label === 'Line of irrational exuberance (Demographic Limit)'
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
          label: 'Line of irrational exuberance (Demographic Limit)',
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
            label: 'Releases',
            type: 'bar',
            data: rangeFour,
            backgroundColor: 'rgba(255, 153, 0, 1)',
            borderColor: 'rgba(38, 38, 38, 0.8)',
            //borderRadius: Number.MAX_VALUE,
            borderWidth: 1,
            categoryPercentage: 0.6,
        },
        {
            label: 'Approvals',
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
