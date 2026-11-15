
// Builds the chart from the rows of the dataset
  function makeChart(credittovalue) {
    const rangeStart = 95;
    const rangeEnd = new Date().getFullYear() - 1899;
    const rangeLabels = credittovalue.map(function(d) { return d.Year }).slice(rangeStart, rangeEnd);
    const rangeOne = credittovalue.map(function(d) { return d.Loan_to_value}).slice(rangeStart, rangeEnd);
    Chart.defaults.font.size = 12;
    const chart = new Chart('credittovalue', {
      type: 'line',
      plugins: [ChartDataLabels],   // <-- local registration, this chart only
      data: {
        labels: rangeLabels,
        datasets: [
          {
            label: "Ratio préstamo-valor",
            data: rangeOne,
            backgroundColor: 'rgba(255, 153, 0, 1)',
            borderColor: 'rgba(38, 38, 38, 0.8)',
            borderWidth: 1,
            pointStyle: 'circle',
            pointBorderColor: 'black',
            pointRadius: 11,
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
              minRotation: 90
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const label = ctx.dataset.label || '';
                const value = ctx.parsed.y;
                return `${label}: ${value != null ? value.toFixed(2) : '—'}`;
              }
            }
          },
          datalabels: {
            align: 'center',
            anchor: 'center',
            color: 'black',
            font: {
              size: 10
            },
            formatter: function(value, context) {
              return Math.round(value);
            }
          }
        }
      }
    });
  }

  // Load the dataset (shared by all charts on the page) and draw the chart
  loadCsv(SPAIN_STATS_CSV)
    .then(makeChart);
