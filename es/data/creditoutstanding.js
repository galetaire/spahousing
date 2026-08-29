function makeChart(creditoutstanding) {
  var rangeStart = 99;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = creditoutstanding.map(function(d) { return d.Year }).slice(rangeStart, rangeEnd);
  var rangeOne = creditoutstanding.map(function(d) { return d.Saldo_vivo / d.GDP_spain }).slice(rangeStart, rangeEnd);
  var rangeTwo = creditoutstanding.map(function(d) { return d.Saldo_vivo }).slice(rangeStart, rangeEnd);
  Chart.defaults.font.size = 12;
  var chart = new Chart('creditoutstanding', {
    type: 'line',
    plugins: [ChartDataLabels],
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Saldo vivo hipotecario / PIB",
          data: rangeOne,
          yAxisID: 'y',
          backgroundColor: 'rgba(255, 153, 0, 0.2)',
          borderColor: 'rgba(255, 153, 0, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointBackgroundColor: 'rgba(255, 153, 0, 0.8)',
          pointBorderColor: 'rgba(255, 153, 0, 0.1)',
          pointRadius: 13,
          fill: true,
          tension: 0.4,
          datalabels: {
            formatter: function(value) { return value.toFixed(2); }
          }
        },
        {
          label: "Saldo vivo hipotecario (€)",
          type: 'bar',
          data: rangeTwo,
          yAxisID: 'y1',
          hidden: true,
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgba(38, 38, 38, 0.8)',
          borderWidth: 1,
          borderRadius: 9,          // <-- rounds the corners
          fill: false,
          tension: 0.4,
          datalabels: { display: false }
        }
      ]
    },
    options: {
      scales: {
        x: {
          ticks: { maxRotation: 90, minRotation: 90 }
        },
        y: {
          position: 'left',
          //title: { display: true, text: 'Outstanding mortgage balance / GDP' }
        },
        y1: {
          position: 'right',
          //title: { display: true, text: 'Outstanding mortgage balance (€)' },
          grid: { drawOnChartArea: false },
          ticks: {
            callback: function(value) {
              return Math.round(value / 1e9) + 'B';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const label = ctx.dataset.label || '';
              const value = ctx.parsed.y;
              if (value == null) return `${label}: —`;
              if (ctx.dataset.yAxisID === 'y1') {
                return `${label}: ${Math.round(value).toLocaleString('es-ES')} €`;
              }
              return `${label}: ${value.toFixed(2)}`;
            }
          }
        },
        datalabels: {
          align: 'center',
          anchor: 'center',
          color: 'black',
          font: { size: 10 }
        }
      }
    }
  });
}
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
