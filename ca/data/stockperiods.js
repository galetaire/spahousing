//makeChart, calling the data and variables from the .csv file
function makeChart(stockperiods) {
  Chart.defaults.font.size = 12;
  new Chart('stockperiods', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: ['Before 1921','1921-1940','1941-1960','1961-1980','1981-2000','2001-2020','2021-2040'],
      datasets: [
        {
          label: 'Habitatges construïts per període',
          type: 'bar',
          data: [855700, 572400, 1766500, 6459300, 5642500, 4913300, 1885000],
          backgroundColor: ctx =>
            ctx.parsed.y === 1885000
              ? 'rgba(0, 204, 153, 0.7)'  // special color for exactly 1 885 000
              : 'rgba(91, 155, 213, 0.8)',   // default color
          borderColor: ctx =>
            ctx.parsed.y === 1885000
            ? 'rgba(0, 204, 153, 0.7)'  // special color for exactly 1 885 000
            : 'rgba(91, 155, 213, 0.8)',   // default color
          categoryPercentage: 0.7,
          borderWidth: 1,
        },
      ]
    },
    options: {
      plugins: {
        },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            beginAtZero: true,
          }
        },
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
