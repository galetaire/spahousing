// Builds the chart from the rows of the dataset
function makeChart(permitsdistribution) {
  const rangeStart = 91;
  const rangeEnd = new Date().getFullYear() - 1899;
  const filteredData = permitsdistribution.slice(rangeStart, rangeEnd);
  const rangeLabels = filteredData.map(function(d) { return d.Year; });
  const totals = filteredData.map(d => Number(d.Permits_legalentity) + Number(d.Permits_individuals) + Number(d.Permits_publicadmin));
  const rangeOne = filteredData.map((d, i) => (Number(d.Permits_legalentity) / totals[i]) * 100);
  const rangeTwo = filteredData.map((d, i) => (Number(d.Permits_individuals) / totals[i]) * 100);
  const rangeTres = filteredData.map((d, i) => (Number(d.Permits_publicadmin) / totals[i]) * 100);

  Chart.defaults.font.size = 12;
  new Chart('permitsdistribution', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'By legal entities',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(47, 85, 151, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'By individuals',
          type: 'bar',
          data: rangeTwo,
          backgroundColor: 'rgba(255, 113, 113, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          fill: false,
        },
        {
          label: 'By public administration',
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
