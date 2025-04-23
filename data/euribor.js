function makeChart(euribor) {
  var rangeStart = 103;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = euribor.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = euribor.map(function(d) {return d.Euribor_1year}).slice(rangeStart, rangeEnd);
  var rangeTwo = euribor.map(function(d) {return d.Average_mortgage_rate}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('euribor', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Euribor 1-year",
          data: rangeOne,
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgb(91, 155, 213, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 6,
          tension: 0.4,
          fill: false,
        },
        {
          label: "Average mortgage rate",
          data: rangeTwo,
          backgroundColor: 'rgba(255, 153, 0, 0.9)',
          borderColor: 'rgb(255, 153, 0, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 6,
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
              } else if (label === 'Euribor 1-year' ||
                          label === 'Average mortgage rate') {
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
