function makeChart(typehouse) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;

  // 1. Slice the data ONLY ONCE to get the relevant years
  const filteredData = typehouse.slice(rangeStart, rangeEnd);
  var rangeLabels = filteredData.map(function(d) { return d.Year; });

  // 2. Calculate the totals from the filtered data
  const totals = filteredData.map(d => Number(d.Single_family) + Number(d.Condominiums));

  // 3. Calculate the percentages from the filtered data and its corresponding totals
  var rangeOnePercentage = filteredData.map((d, i) => (Number(d.Single_family) / totals[i]) * 100);
  var rangeTwoPercentage = filteredData.map((d, i) => (Number(d.Condominiums) / totals[i]) * 100);

  Chart.defaults.font.size = 12;
  new Chart('typehouse', {
    type: 'bar',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Single family',
          type: 'bar',
          data: rangeOnePercentage,
          backgroundColor: 'rgba(0, 204, 153, 0.7)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Condominiums',
          type: 'bar',
          data: rangeTwoPercentage,
          backgroundColor: 'rgba(91, 155, 213, 0.7)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
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
