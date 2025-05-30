function makeChart(workersperunit) {
  // Register the plugin
  Chart.register(ChartDataLabels);

  //getGradient, used in the Euribor label
  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const chartTop    = chartArea.top;
    const chartBottom = chartArea.bottom;
    const chartHeight = chartBottom - chartTop;
    // re‑create gradient whenever size changes
    if (!gradient || width !== chartArea.width || height !== chartHeight) {
      width  = chartArea.width;
      height = chartHeight;
      // y0 = bottom, y1 = top  (so 0→orange, 1→purple as values grow)
      gradient = ctx.createLinearGradient(0, chartBottom, 0, chartTop);
      gradient.addColorStop(0, 'orange');
      gradient.addColorStop(1, 'purple');
    }
    return gradient;
  }

  var rangeStart = 90;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = workersperunit.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = workersperunit.map(function(d) {return d.Workers_per_home}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('workersperunit', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Ratio of workers per housing unit built",
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: function(context){
            const chart = context.chart;
            const {ctx, chartArea, scales} = chart;
              if(!chartArea) {
              return null;
            }
            return getGradient(ctx, chartArea, scales);
            },
          borderWidth: 7,
          pointStyle: 'circle',
          pointBorderColor: 'black',
          pointRadius: 6,
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
            label(ctx) {
                      const label = ctx.dataset.label || '';
                      let value = ctx.parsed.y;

                      // Only format this one dataset’s value
                      if (label === '...') {
                        // toLocaleString adds thousand separators; force 0 decimals
                        value = Number(value).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        });
                      } else if (label === 'Ratio of workers per housing unit built') {
                        // two decimals
                        value = value.toFixed(2);
                      }
                      // For all others, leave as-is (or format differently)
                      return `${label}: ${value}`;
                    },
          }
        },
        // Add data labels
        datalabels: {
          align: 'center',      // Position text in the center
          anchor: 'center',     // Anchor text in the center of the point
          color: 'white',       // Text color
          font: {
            size: 11
          },
          formatter: function(value, context) {
            return Number(value).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
          }
        }
      }
    }
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
