function makeChart(rentprice) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  var rangeStart = 107;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = rentprice.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = rentprice.map(function(d) {return d.Idealista_rent_100}).slice(rangeStart, rangeEnd);
  var rangeTwo = rentprice.map(function(d) {return d.Idealista_house_100}).slice(rangeStart, rangeEnd);
  var rangeTres = rentprice.map(function(d) {return d.Price_IPV}).slice(rangeStart, rangeEnd);
  var rangeFour = rentprice.map(function(d) {return d.Rent_price_IPVA}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('rentprice', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Idealista rental price",
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
          label: "Idealista house price",
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
          label: "INE house price",
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
          label: "INE rental price",
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

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
