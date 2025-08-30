function makeChart(barcomponents) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  var rangeStart = 91;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = barcomponents.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = barcomponents.map(function(d) {return d.Price_risk}).slice(rangeStart, rangeEnd);
  var rangeTwo = barcomponents.map(function(d) {return d.Mortgage_risk}).slice(rangeStart, rangeEnd);
  var rangeTres = barcomponents.map(function(d) {return d.Sales_risk}).slice(rangeStart, rangeEnd);
  var rangeFour = barcomponents.map(function(d) {return d.Wage_risk}).slice(rangeStart, rangeEnd);
  var rangeFive = barcomponents.map(function(d) {return d.Production_risk}).slice(rangeStart, rangeEnd);
  var rangeSix = barcomponents.map(function(d) {return d.Scarcity_risk}).slice(rangeStart, rangeEnd);
  var rangeSeven = barcomponents.map(function(d) {return d.Labor_risk}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('barcomponents', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Precio",
          data: rangeOne,
          backgroundColor: 'rgba(255, 113, 113, 1)',
          borderColor: 'rgba(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          fill: false,
          tension: 0.4
        },
        {
          label: "Firma de hipotecas",
          data: rangeTwo,
          backgroundColor: 'rgba(47, 85, 151, 1)',
          borderColor: 'rgba(47, 85, 151, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          fill: false,
          tension: 0.4
        },
        {
          label: "Ritmo de compraventas",
          data: rangeTres,
          backgroundColor: 'rgba(255, 145, 28, 1)',
          borderColor: 'rgba(255, 145, 28, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          fill: false,
          tension: 0.4
        },
        {
          label: "Esfuerzo salarial",
          data: rangeFour,
          backgroundColor: 'rgba(140, 199, 97, 1)',
          borderColor: 'rgba(140, 199, 97, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          fill: false,
          tension: 0.4
        },
        {
          label: "Márgenes de beneficio",
          data: rangeFive,
          backgroundColor: 'rgba(175, 97, 199, 1)',
          borderColor: 'rgba(175, 97, 199, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          fill: false,
          tension: 0.4
        },
        {
          label: "Escasez de vivienda",
          data: rangeSix,
          backgroundColor: 'rgba(138, 230, 235, 1)',
          borderColor: 'rgba(138, 230, 235, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
          fill: false,
          tension: 0.4
        },
        {
          label: "Riesgo de desempleo",
          data: rangeSeven,
          backgroundColor: 'rgba(255, 117, 242, 1)',
          borderColor: 'rgba(255, 117, 242, 1)',
          borderWidth: 2,
          pointStyle: 'circle',
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
            label: function(context) {
              const label = context.dataset.label || '';
              const value = Math.round(context.parsed.y); // Round Y value
              return `${label}: ${value}`;
            }
          }
        },
        // Add data labels
        datalabels: {
          align: 'center',      // Position text in the center
          anchor: 'center',     // Anchor text in the center of the point
          color: 'white',       // Text color
          font: {
            size: 0
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
