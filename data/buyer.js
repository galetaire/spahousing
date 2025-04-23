//makeChart, calling the data and variables from the .csv file
function makeChart(buyer) {
  var rangeStart = 111;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = buyer.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = buyer.map(function(d) {return d.Legal_entity}).slice(rangeStart, rangeEnd);
  var rangeTwo = buyer.map(function(d) {return d.Nationals}).slice(rangeStart, rangeEnd);
  var rangeTres = buyer.map(function(d) {return d.Foreigners}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 14;
  new Chart('buyer', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Foreigners',
          type: 'bar',
          data: rangeTres,
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
        {
          label: 'Legal entity',
          type: 'bar',
          data: rangeOne,
          backgroundColor: 'rgba(0, 176, 80, 0.9)',
          borderColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 1.2,
          pointStyle: 'circle',
          pointRadius: 6,
          fill: false
        },
        {
          label: 'Nationals',
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
      callbacks: {
        label(ctx) {
                  const label = ctx.dataset.label || '';
                  let value = ctx.parsed.y;

                  // Only format this one dataset’s value
                  if (label === '...') {
                    // toLocaleString adds thousand separators; force 0 decimals
                    value = Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    });
                  } else if (label === 'Foreigners' ||
                              label === 'Nationals' ||
                            label === 'Lebal entity') {
                    // two decimals
                    value = value.toFixed(2);
                  }
                  // For all others, leave as-is (or format differently)
                  return `${label}: ${value}`;
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
          min: 0,
          max: 100,
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
