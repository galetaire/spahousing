//makeChart, calling the data and variables from the .csv file
function makeChart(permitsdistribution) {
  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  const filteredData = permitsdistribution.slice(rangeStart, rangeEnd);
  var rangeLabels = filteredData.map(function(d) { return d.Year; });
  const totals = filteredData.map(d => Number(d.Permits_legalentity) + Number(d.Permits_individuals) + Number(d.Permits_publicadmin));
  var rangeOne = filteredData.map((d, i) => (Number(d.Permits_legalentity) / totals[i]) * 100);
  var rangeTwo = filteredData.map((d, i) => (Number(d.Permits_individuals) / totals[i]) * 100);
  var rangeTres = filteredData.map((d, i) => (Number(d.Permits_publicadmin) / totals[i]) * 100);

  Chart.defaults.font.size = 12;
  new Chart('permitsdistribution', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Personas jurídicas',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(47, 85, 151, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Personas físicas',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(255, 113, 113, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'Administración pública',
          type: 'bar',
          data: rangeTres,
          backgroundColor: 'rgba(0, 204, 153, 0.8)',
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
