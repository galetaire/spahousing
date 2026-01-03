function makeChart(laboryearly) {
  // Register the plugin

  //getGradient, used in the Euribor label
  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const { top: chartTop, bottom: chartBottom, width: chartWidth } = chartArea;
    const chartHeight = chartBottom - chartTop;

    // only recreate if size changed
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width  = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartBottom, 0, chartTop);
      // your 4 (or more!) colors:
      const colors = ['rgba(0, 204, 153)', 'rgba(255,153,0)', 'rgb(196, 30, 58)'];
      // evenly space them from bottom (0) to top (1)
      colors.forEach((color, i) => {
        const stopPosition = i / (colors.length - 1);
        gradient.addColorStop(stopPosition, color);
      });
    }
    return gradient;
  }

  // --- NEW: plugin that shades the zone between Y=0 and Y=–15 on the RIGHT axis ---
  const shadeZonePlugin = {
    id: 'shadeZone',
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, right },
        scales: { yRight }
      } = chart;
      const yZero   = yRight.getPixelForValue(0);
      const yNeg15  = yRight.getPixelForValue(-15);
      ctx.save();
      ctx.fillStyle = options.color;                // e.g. 'rgba(75,192,192,0.3)'
      ctx.fillRect(left, yZero, right - left, yNeg15 - yZero);
      ctx.restore();
    }
  };

  var rangeStart = 86;
  var rangeEnd = new Date().getFullYear() - 1899;
  var rangeLabels = laboryearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = laboryearly.map(function(d) {return d.Unemployment_yoy_per}).slice(rangeStart, rangeEnd);
  var rangeTwo = laboryearly.map(function(d) {return d.Nominal_price_yoy_per}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 11;
  var chart = new Chart('laboryearly', {
    type: 'line',
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Atur",
          data: rangeOne,
          yAxisID: 'yLeft',
          backgroundColor: 'rgba(0, 0, 0, 1)',
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
          pointRadius: 1.5,
          fill: false,
          tension: 0.4
        },
        {
          label: 'Preu habitatge (invertit)',
          type: 'line',
          data: rangeTwo,
          yAxisID: 'yRight',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'crossRot',
          pointRadius: 6,
          fill: false,
          tension: 0.4,
          segment: {
              borderColor: ctx =>
                ctx.p1.parsed.y < 0
                  ? 'red'
                  : 'black',
              backgroundColor: ctx =>
                ctx.p1.parsed.y < 0
                  ? 'red'
                  : 'black',
                },
          pointBackgroundColor: ctx =>
                ctx.parsed.y < 0
                  ? 'red'
                  : 'black',
          pointBorderColor: ctx =>
                ctx.parsed.y < 0
                  ? 'red'
                  : 'black',
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
        },
        yLeft: {
          type: 'linear',
          position: 'left',
          stacked: false,
          ticks: { beginAtZero: true }
        },
        yRight: {
          reverse: true,    // <-- invert the y‑axis
          type: 'linear',
          position: 'right',
          stacked: false,
          grid: {
          // …and color the zero‐line specially:
          color: function(context) {
            // context.tick.value is the data value of this grid line
            return context.tick.value === 0
              ? 'rgba(178, 10, 142, 0.3)'        // highlight color
              : '#ddd';      // normal grid color
          },
          lineWidth: function(context) {
            return context.tick.value === 0
              ? 1            // thicker zero line
              : 1;           // normal thickness
          }
        },
          ticks: { beginAtZero: true, }
        }
      },
      // Enable tooltips as before
      plugins: {
        // pass options into our shadeZonePlugin:
        shadeZone: {
          color: 'rgba(178, 10, 142, 0.1)'
        },
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
                      } else if (label === 'Atur' ||
                                label === 'Preu habitatge (invertit)') {
                        // two decimals
                        value = value.toFixed(2);
                      }
                      // For all others, leave as-is (or format differently)
                      return `${label}: ${value}`;
                    },
          }
        },
      },
    },
    // register the custom plugin just for this chart
    plugins: [ shadeZonePlugin ]
  });
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
