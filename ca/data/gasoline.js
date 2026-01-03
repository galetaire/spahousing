function makeChart(gasoline) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  var rangeStart = 90;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = gasoline.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = gasoline.map(function(d) {return d.Spain_gasoline_litre_usd}).slice(rangeStart, rangeEnd);
  var rangeTwo = gasoline.map(function(d) {return d.US_gasoline_litre_usd}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('gasoline', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Preu de la gasolina a Espanya, USD per litres",
          data: rangeOne,
          backgroundColor: 'rgb(245,245,245)',
          borderColor: 'rgb(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'black',
          pointRadius: 10,
          fill: false,
          tension: 0.4
        },
        {
          label: "Preu de la gasolina a EUA, USD per litres",
          data: rangeTwo,
          backgroundColor: 'black',
          borderColor: 'rgb(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'rectRounded',
          pointBorderColor: 'black',
          pointRadius: 1,
          borderDash:[2, 2],
          fill: false,
          tension: 0.4,
          datalabels: {
            display: false
          }
        }
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90,
          }
        }
      },
      // Enable tooltips as before
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
                      } else if (label === 'Preu de la gasolina a Espanya, USD per litres' ||
                                label === 'Preu de la gasolina a EUA, USD per litres') {
                        // two decimals
                        value = value.toFixed(2);
                      }
                      // For all others, leave as-is (or format differently)
                      return `${label}: ${value}`;
                    },
          }
        },
        // Add data labels
        datalabels: {
          align: 'center',      // Position text in the center
          anchor: 'center',     // Anchor text in the center of the point
          color: 'black',       // Text color
          font: {
            size: 8
          },
          formatter: function(value, context) {
            return Number(value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
