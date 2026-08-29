
//makeChart, calling the data and variables from the .csv file
  function makeChart(credittovalue) {
    var rangeStart = 95;
    var rangeEnd = new Date().getFullYear() - 1899;
    var rangeLabels = credittovalue.map(function(d) { return d.Year }).slice(rangeStart, rangeEnd);
    var rangeOne = credittovalue.map(function(d) { return d.Loan_to_value}).slice(rangeStart, rangeEnd);
    Chart.defaults.font.size = 12;
    var chart = new Chart('credittovalue', {
      type: 'line',
      plugins: [ChartDataLabels],   // <-- local registration, this chart only
      data: {
        labels: rangeLabels,
        datasets: [
          {
            label: "Ràtio préstec-valor",
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

  // Request data from .csv file using D3js library
  d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
    .then(makeChart);
