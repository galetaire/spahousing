function makeChart(rentratio) {
  var rangeStart = 107;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = rentratio.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = rentratio.map(function(d) {return d.Rent_ROI_net_per}).slice(rangeStart, rangeEnd);
  var rangeTwo = rentratio.map(function(d) {return d.Rent_ROI_gross_per}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('rentratio', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Net rental return (%)",
          data: rangeOne,
          backgroundColor: 'rgba(0, 204, 153, 1)',
          borderColor: 'rgb(0, 204, 153, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 5,
          tension: 0.4,
          borderDash:[2, 2],
          fill: false,
        },
        {
          label: "Gross rental return (%)",
          data: rangeTwo,
          backgroundColor: 'rgb(255, 113, 113, 1)',
          borderColor: 'rgb(255, 113, 113, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBorderColor: 'rgb(38, 0, 0, 0.8)',
          pointRadius: 5,
          borderDash:[2, 2],
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
              } else if (label === 'Gross rental return (%)' ||
                          label === 'Net rental return (%)') {
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
