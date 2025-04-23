function makeChart(moneygrowth) {
  var rangeStart = 71;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = moneygrowth.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = moneygrowth.map(function(d) {return d.Euro_M3_stock_per}).slice(rangeStart, rangeEnd);
  var rangeTwo = moneygrowth.map(function(d) {return d.Per_new_homes}).slice(rangeStart, rangeEnd);
  var rangeTres = moneygrowth.map(function(d) {return d.Population_yoy}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('moneygrowth', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Growth of monetary stock (euro, M3)",
          data: rangeOne,
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgb(91, 155, 213, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 3,
          tension: 0.4,
          fill: false,
        },
        {
          label: "Growth of housing stock",
          data: rangeTwo,
          backgroundColor: 'rgba(255, 153, 0, 0.9)',
          borderColor: 'rgb(255, 153, 0, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 3,
          tension: 0.4
        },
        {
          label: "Growth of population",
          data: rangeTres,
          backgroundColor: 'rgba(0, 204, 153, 0.9)',
          borderColor: 'rgb(0, 204, 153, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 3,
          tension: 0.4
        },
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90,
          }
        },
        y: {
          grid: {
          // …and color the zero‐line specially:
          color: function(context) {
            // context.tick.value is the data value of this grid line
            return context.tick.value === 0
              ? 'black'        // highlight color
              : '#ddd';      // normal grid color
          },
          lineWidth: function(context) {
            return context.tick.value === 0
              ? 0.7            // thicker zero line
              : 1;           // normal thickness
          }
        },
        }
      },
      // Enable tooltips as before
      plugins: {
        tooltip: {
          callbacks: {
            label: function(ctx) {
              const label = ctx.dataset.label || '';
              let value = ctx.parsed.y;

              // Only format this one dataset’s value
              if (label === '...') {
                // toLocaleString adds thousand separators; force 0 decimals
                value = Number(value).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                });
              } else if (label === 'Growth of monetary stock (euro, M3)' ||
                        label === 'Growth of housing stock' ||
                          label === 'Growth of population') {
                // two decimals
                value = value.toFixed(2);
              }
              // For all others, leave as-is (or format differently)
              return `${label}: ${value}`;
            }
          }
        },
        // Add data labels
        datalabels: {
          align: 'center',      // Position text in the center
          anchor: 'center',     // Anchor text in the center of the point
          color: 'black',       // Text color
          font: {
            size: 10
          },
          formatter: function(value, context) {
            return Math.round(value); // Round off the displayed value
          }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
