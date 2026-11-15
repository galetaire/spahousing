function makeChart(rentprice) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  const rangeStart = 107;
  const rangeEnd = new Date().getFullYear() - 1899;
  const rangeLabels = rentprice.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  const rangeOne = rentprice.map(function(d) {return d.Idealista_rent_100}).slice(rangeStart, rangeEnd);
  const rangeTwo = rentprice.map(function(d) {return d.Idealista_house_100}).slice(rangeStart, rangeEnd);
  const rangeTres = rentprice.map(function(d) {return d.Price_IPV}).slice(rangeStart, rangeEnd);
  const rangeFour = rentprice.map(function(d) {return d.Rent_price_IPVA}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  const chart = new Chart('rentprice', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Preu lloguer, Idealista",
          data: rangeOne,
          backgroundColor: 'rgba(165, 255, 233, 1)',
          borderColor: 'rgb(0, 204, 153, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointBorderColor: 'rgb(0, 204, 153, 1',
          pointRadius: 10,
          fill: false,
          tension: 0.4
        },
        {
          label: "Preu habitatge, Idealista",
          data: rangeTwo,
          backgroundColor: 'rgb(255, 197, 197, 1)',
          borderColor: 'rgb(255, 113, 113, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointBorderColor: 'rgb(255, 113, 113, 1',
          pointRadius: 10,
          fill: false,
          tension: 0.4
        },
        {
          label: "Preu habitatge, INE",
          data: rangeTres,
          backgroundColor: 'rgb(198, 227, 255, 1)',
          borderColor: 'rgb(91, 155, 213, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointBorderColor: 'rgb(91, 155, 213, 1',
          pointRadius: 10,
          fill: false,
          tension: 0.4
        },
        {
          label: "Preu lloguer, INE",
          data: rangeFour,
          backgroundColor: 'rgb(225, 187, 255, 1)',
          borderColor: 'rgb(112, 48, 160, 1)',
          borderWidth: 2,
          pointStyle: 'rectRounded',
          pointBorderColor: 'rgb(112, 48, 160, 1',
          pointRadius: 10,
          fill: false,
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

// Load the dataset (shared by all charts on the page) and draw the chart
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
