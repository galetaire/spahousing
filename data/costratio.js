function makeChart(costratio) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  var rangeStart = 94;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = costratio.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = costratio.map(function(d) {return d.Ratio_price_cost}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('costratio', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Ratio Housing price / Construction cost",
          data: rangeOne,
          backgroundColor: 'rgba(112, 48, 160, 0.9)',
          borderColor: 'rgb(112, 48, 160, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'black',
          pointRadius: 10,
          fill: false,
          tension: 0.4
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
                      } else if (label === 'Ratio Housing price / Construction cost') {
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
          color: 'white',       // Text color
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
