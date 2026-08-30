// makeChart: Euros (€) are ALWAYS on the left axis, alone.
// A Dollar / Gold / Bitcoin toggle chooses what the RIGHT axis compares:
//   - Dollar  -> US dollars, linear right axis (same scale family as €)
//   - Gold    -> ounces of gold, linear right axis
//   - Bitcoin -> bitcoin from 2010, logarithmic right axis
// The toggle buttons are created automatically just above the <canvas>,
// so the page still only needs <canvas id="housecombined"></canvas>.
function makeChart(rows) {
  var rangeStart = 85;                               // index 85 == year 1985
  var rangeEnd = new Date().getFullYear() - 1899;    // up to and including the current year
  var btcFromYear = 2010;                            // bitcoin shown from here (log right axis)
  var DEFAULT_RIGHT = 'gold';                     // 'dollar' | 'gold' | 'bitcoin' on first load

  // Colours (each right series matches its axis)
  var C_EUR  = 'rgba(68, 114, 196, 1)';
  var C_USD  = 'rgba(102, 158, 64, 1)';
  var C_GOLD = 'rgba(232, 181, 10, 1)';
  var C_BTC  = 'rgba(255, 153, 0, 1)';

  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : null; }
  function priceEur(d) { var p = num(d.Price_eum2); return p === null ? null : p * 100; }
  function priceIn(d, rateKey) {
    var eur = priceEur(d), rate = num(d[rateKey]);
    return (eur === null || rate === null || rate === 0) ? null : eur / rate;
  }
  function priceBtc(d) {
    var y = num(d.Year);
    return (y === null || y < btcFromYear) ? null : priceIn(d, 'BTCEUR_year_ave');
  }

  var rangeLabels = rows.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  var seriesEur   = rows.map(function(d) { return priceEur(d); }).slice(rangeStart, rangeEnd);
  var seriesUsd   = rows.map(function(d) { return priceIn(d, 'EURUSD_year_ave'); }).slice(rangeStart, rangeEnd);
  var seriesGold  = rows.map(function(d) { return priceIn(d, 'AUEUR_year_ave');  }).slice(rangeStart, rangeEnd);
  var seriesBtc   = rows.map(function(d) { return priceBtc(d); }).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;

  // Configuration for each right-axis option
  var RIGHT = {
    dollar: {
      buttonText: 'Dòlar ($)', color: C_USD,
      label: 'Preu en USD ($)', data: seriesUsd,
      axis: { type: 'linear', position: 'right', min: 0, max: 250000,
              ticks: { stepSize: 50000, color: 'rgba(87, 87, 87, 1)' },
              title: { display: false, text: 'US dollars ($)', color: C_USD },
              grid: { drawOnChartArea: false }, border: { color: C_USD } }
    },
    gold: {
      buttonText: 'Or (Au)', color: C_GOLD,
      label: 'Preu per unça (Au)', data: seriesGold,
      axis: { type: 'linear', position: 'right', min: 0, max: 450,
              ticks: { stepSize: 90, color: 'rgba(87, 87, 87, 1)' },
              title: { display: false, text: 'Ounces of gold (Au)', color: C_GOLD },
              grid: { drawOnChartArea: false }, border: { color: C_GOLD } }
    },
    bitcoin: {
      buttonText: 'Bitcoin (₿)', color: C_BTC,
      label: 'Preu en bitcoin (₿)', data: seriesBtc,
      axis: { type: 'logarithmic', position: 'right', min: 1, max: 10000000,
              ticks: { color: 'rgba(87, 87, 87, 1)', callback: function (v) {
                return [1,10,100,1000,10000,100000,1000000,10000000].includes(v) ? v.toLocaleString() : '';
              } },
              title: { display: false, text: 'Bitcoin (₿) — log scale', color: C_BTC },
              grid: { drawOnChartArea: false }, border: { color: C_BTC } }
    }
  };
  var ORDER = ['dollar', 'gold', 'bitcoin'];

  // ---- build the toggle UI above the canvas ----
  var canvas = document.getElementById('housecombined');
  var current = DEFAULT_RIGHT;
  var chart = null;
  var buttons = {};

  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:8px;align-items:center;margin:0 0 10px;font-family:inherit;';
  var caption = document.createElement('span');
  caption.textContent = 'Compara € amb:';
  caption.style.cssText = 'font-size:13px;color:#555;';
  bar.appendChild(caption);
  ORDER.forEach(function (key) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = RIGHT[key].buttonText;
    b.style.cssText = 'border:1px solid #ccc;border-radius:999px;padding:5px 12px;' +
                      'cursor:pointer;font-size:13px;background:#f4f4f4;color:#222;';
    b.addEventListener('click', function () { current = key; render(); });
    buttons[key] = b; bar.appendChild(b);
  });
  canvas.parentNode.insertBefore(bar, canvas);

  function styleButtons() {
    ORDER.forEach(function (key) {
      var active = (current === key);
      var color = RIGHT[key].color;
      buttons[key].style.background = active ? color : '#f4f4f4';
      buttons[key].style.color = active ? '#fff' : '#222';
      buttons[key].style.borderColor = active ? color : '#ccc';
    });
  }

  function line(label, data, color, axis) {
    return {
      label: label, data: data, yAxisID: axis,
      backgroundColor: color, borderColor: color,
      borderWidth: 2, pointStyle: 'rectRounded', pointRadius: 3,
      fill: false, tension: 0.4, spanGaps: true
    };
  }

  function render() {
    styleButtons();
    var cfg = RIGHT[current];

    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: rangeLabels,
        datasets: [
          line('Preu en Euros (€)', seriesEur, C_EUR, 'yFiat'),
          line(cfg.label, cfg.data, cfg.color, 'yRight')
        ]
      },
      options: {
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { ticks: { maxRotation: 90, minRotation: 90 } },
          yFiat: {
            type: 'linear', position: 'left', min: 0, max: 250000,
            ticks: { stepSize: 50000, color: 'rgba(87, 87, 87, 1)' },
            title: { display: false, text: 'Euros (€)', color: C_EUR },
            grid: { drawOnChartArea: true }
          },
          yRight: cfg.axis
        },
        plugins: {
          datalabels: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var label = ctx.dataset.label || '';
                var value = ctx.parsed.y;
                if (value === null || value === undefined || isNaN(value)) return label + ': —';
                if (label === 'Preu en bitcoins (₿)') {
                  value = Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
                } else if (label === 'Preu per unça (Au)') {
                  value = Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 });
                } else {
                  value = Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 });
                }
                return label + ': ' + value;
              }
            }
          }
        }
      }
    });
  }

  render();
}

// Request data from the .csv file using the D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
