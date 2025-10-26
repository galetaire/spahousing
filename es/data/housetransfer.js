//makeChart, calling the data and variables from the .csv file
function makeChart(housetransfer) {
  var rangeStart = 107;
  var rangeEnd = new Date().getFullYear() - 1899;
  const filteredData = housetransfer.slice(rangeStart, rangeEnd);
  var rangeLabels = filteredData.map(function(d) { return d.Year; });
  const totals = filteredData.map(d => Number(d.Home_sales) + Number(d.Inheritances) + Number(d.Donations)+ Number(d.Swaps)+ Number(d.Others));
  var rangeOne = filteredData.map((d, i) => (Number(d.Home_sales) / totals[i]) * 100);
  var rangeTwo = filteredData.map((d, i) => (Number(d.Inheritances) / totals[i]) * 100);
  var rangeTres = filteredData.map((d, i) => (Number(d.Donations) / totals[i]) * 100);
  var rangeFour = filteredData.map((d, i) => (Number(d.Swaps) / totals[i]) * 100);
  var rangeFive = filteredData.map((d, i) => (Number(d.Others) / totals[i]) * 100);


  Chart.defaults.font.size = 12;
  new Chart('housetransfer', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Donación',
          type: 'bar',
          data: rangeTres,
          backgroundColor: 'rgba(71, 10, 57, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Herencia',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(178, 10, 142, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Otros',
          type: 'bar',
          data: rangeFive,
          backgroundColor: 'rgba(255, 157, 61, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Compraventa',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Permuta',
          type: 'bar',
          data: rangeFour,
          backgroundColor: 'rgba(1, 44, 105, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 1.2,
          fill: false,
        },

      ]
    },
    options: {
          plugins: {
            datalabels: false,
            tooltip: {
              callbacks: {
                label(ctx) {
                  const label = ctx.dataset.label || '';
                  const value = ctx.parsed.y;
                  return `${label}: ${value.toFixed(2)}%`;
                },
              }
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
              min: 0,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
          }
        }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
