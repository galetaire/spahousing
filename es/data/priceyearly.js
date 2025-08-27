//makeChart, calling the data and variables from the .csv file
function makeChart(priceyearly) {
  var rangeStart = 85;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = priceyearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = priceyearly.map(function(d) {return d.Price_eum2}).slice(rangeStart, rangeEnd);
  var rangeTwo = priceyearly.map(function(d) {return d.Real_price}).slice(rangeStart, rangeEnd);
  var rangeTres = priceyearly.map(function(d) {return d.Accum_Inflation}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('priceyearly', {
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90,
          }
        }
      },
      plugins: {
        datalabels: false,
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = Math.round(context.parsed.y); // Round Y value
              return `${label}: ${value}`;
            }
          }
        }
      }
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Precio nominal (€/m2)",
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(47, 85, 151, 0.9)',
          borderColor: 'rgba(47, 85, 151, 0.5)',
          borderWidth: 1,
          borderDash:[5, 5],
          pointStyle: 'dash',
          pointRadius: 13,
          pointBorderColor: 'rgba(47, 85, 151, 0.9)',
          pointBorderWidth: 4,
          fill: false,
          tension: 0.4,
        },
        {
          label: "Precio real (ajustado a inflación)",
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(255, 113, 113, 0.9)',
          borderColor: 'rgba(255, 113, 113, 0.9)',
          borderWidth: 1,
          borderDash:[5, 5],
          pointStyle: 'dash',
          pointRadius: 13,
          pointBorderColor: 'rgba(255, 113, 113, 0.9)',
          pointBorderWidth: 4,
          fill: false,
          tension: 0.4
        },
        {
          label: "Inflación acumulada",
          type: 'line',
          data: rangeTres,
          borderColor: 'rgba(0, 204, 153, 0.9)',
          backgroundColor: 'rgba(0, 204, 153, 0.9)',
          borderWidth: 1,
          pointStyle: 'crossRot',
          pointBorderColor: 'black',
          pointRadius: 5,
          fill: false,
          tension: 0.4
        }
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
