//makeChart, calling the data and variables from the .csv file
function makeChart(pricemoneypolicy) {
  var rangeStart = 80;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = pricemoneypolicy.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = pricemoneypolicy.map(function(d) {return d.Nominal_price_yoy_per}).slice(rangeStart, rangeEnd);
  var rangeTwo = pricemoneypolicy.map(function(d) {return d.IR_yoy_per}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  new Chart('pricemoneypolicy', {
    type: 'bar',  // default for bar+line mixed
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Precio nominal (%)',
          type: 'line',
          data: rangeOne,
          yAxisID: 'yRight',               // ← correct axis
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          pointStyle: 'crossRot',
          pointRadius: 4,
          borderDash:[3, 3],
          fill: false,
          segment: {
              borderColor: ctx =>
                ctx.p1.parsed.y < 0
                  ? 'red'
                  : 'black',
              backgroundColor: ctx =>
                ctx.p1.parsed.y < 0
                  ? 'red'
                  : 'black',
                },
          pointBackgroundColor: ctx =>
                ctx.parsed.y < 0
                  ? 'red'
                  : 'black',
          pointBorderColor: ctx =>
                ctx.parsed.y < 0
                  ? 'red'
                  : 'black',
        },
        {
          label: 'Mibor/Euribor (%)',
          type: 'bar',
          yAxisID: 'yLeft',
          data: rangeTwo,
          backgroundColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgba(91, 155, 213, 0.8)'
              : 'rgba(255, 153, 0, 0.9)',
          borderColor: ctx =>
            ctx.parsed.y >= 0
              ? 'rgba(91, 155, 213, 1)'
              : 'rgba(255, 153, 0, 1)',
          categoryPercentage: 1,
          borderWidth: 1,
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
                  } else if (label === 'Mibor/Euribor (%)' ||
                            label === 'Precio nominal (%)') {
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
          ticks: {
            maxRotation: 90,
            minRotation: 90,
          }
        },
        yLeft: {
          min: -5,
          max: 5,
          type: 'linear',
          position: 'left',
          stacked: false,
          ticks: {}
        },
        yRight: {
          min: -50,
          max: 50,
          type: 'linear',
          position: 'right',
          stacked: false,
          ticks: {}
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
