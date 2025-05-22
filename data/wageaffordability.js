function makeChart(wageaffordability) {
  var rangeStart = 99;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = wageaffordability.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = wageaffordability.map(function(d) {return d.Housing_affordability}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('wageaffordability', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Housing affordability (Base 100 = 1999)",
          data: rangeOne,
          backgroundColor: 'rgba(255, 220, 220, 1)',
          borderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 3,
          pointStyle: 'circle',
          pointBorderColor: 'rgba(255, 113, 113, 0.9)',
          pointRadius: 11,
          tension: 0.4,
          fill: false,
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
        datalabels: false,
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
              } else if (label === 'Housing affordability (Base 100 = 1999)') {
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
