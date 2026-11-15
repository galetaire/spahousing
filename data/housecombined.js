// makeChart: Euros (€) are ALWAYS on the left axis, alone.
// A Dollar / Gold / Bitcoin toggle chooses what the RIGHT axis compares:
//   - Dollar  -> US dollars, linear right axis (same scale family as €)
//   - Gold    -> ounces of gold, linear right axis
//   - Bitcoin -> bitcoin from 2010, logarithmic right axis
// The toggle buttons are created automatically just above the <canvas>,
// so the page still only needs <canvas id="housecombined"></canvas>.
function makeChart(rows) {
  const rangeStart = 85;                               // index 85 == year 1985
  const rangeEnd = new Date().getFullYear() - 1899;    // up to and including the current year
  const btcFromYear = 2010;                            // bitcoin shown from here (log right axis)
  const DEFAULT_RIGHT = 'gold';                     // 'dollar' | 'gold' | 'bitcoin' on first load

  // Colours (each right series matches its axis)
  const C_EUR  = 'rgba(68, 114, 196, 1)';
  const C_USD  = 'rgba(102, 158, 64, 1)';
  const C_GOLD = 'rgba(232, 181, 10, 1)';
  const C_BTC  = 'rgba(255, 153, 0, 1)';

  function num(v) { const n = parseFloat(v); return isFinite(n) ? n : null; }
  function priceEur(d) { const p = num(d.Price_eum2); return p === null ? null : p * 100; }
  function priceIn(d, rateKey) {
    const eur = priceEur(d), rate = num(d[rateKey]);
    return (eur === null || rate === null || rate === 0) ? null : eur / rate;
  }
  function priceBtc(d) {
    const y = num(d.Year);
    return (y === null || y < btcFromYear) ? null : priceIn(d, 'BTCEUR_year_ave');
  }

  const rangeLabels = rows.map(function(d) { return d.Year; }).slice(rangeStart, rangeEnd);
  const seriesEur   = rows.map(function(d) { return priceEur(d); }).slice(rangeStart, rangeEnd);
  const seriesUsd   = rows.map(function(d) { return priceIn(d, 'EURUSD_year_ave'); }).slice(rangeStart, rangeEnd);
  const seriesGold  = rows.map(function(d) { return priceIn(d, 'AUEUR_year_ave');  }).slice(rangeStart, rangeEnd);
  const seriesBtc   = rows.map(function(d) { return priceBtc(d); }).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;

  // Configuration for each right-axis option
  const RIGHT = {
    dollar: {
      buttonText: 'Dollar ($)', color: C_USD,
      label: 'Price in USD ($)', data: seriesUsd,
      axis: { type: 'linear', position: 'right', min: 0, max: 250000,
              ticks: { stepSize: 50000, color: 'rgba(87, 87, 87, 1)' },
              title: { display: false, text: 'US dollars ($)', color: C_USD },
              grid: { drawOnChartArea: false }, border: { color: C_USD } }
    },
    gold: {
      buttonText: 'Gold (Au)', color: C_GOLD,
      label: 'Price in ounces of gold (Au)', data: seriesGold,
      axis: { type: 'linear', position: 'right', min: 0, max: 450,
              ticks: { stepSize: 90, color: 'rgba(87, 87, 87, 1)' },
              title: { display: false, text: 'Ounces of gold (Au)', color: C_GOLD },
              grid: { drawOnChartArea: false }, border: { color: C_GOLD } }
    },
    bitcoin: {
      buttonText: 'Bitcoin (₿)', color: C_BTC,
      label: 'Price in bitcoin (₿)', data: seriesBtc,
      axis: { type: 'logarithmic', position: 'right', min: 1, max: 10000000,
              ticks: { color: 'rgba(87, 87, 87, 1)', callback: function (v) {
                return [1,10,100,1000,10000,100000,1000000,10000000].includes(v) ? v.toLocaleString() : '';
              } },
              title: { display: false, text: 'Bitcoin (₿) — log scale', color: C_BTC },
              grid: { drawOnChartArea: false }, border: { color: C_BTC } }
    }
  };
  const ORDER = ['dollar', 'gold', 'bitcoin'];

  // ---- build the toggle UI above the canvas ----
  const canvas = document.getElementById('housecombined');
  let current = DEFAULT_RIGHT;
  let chart = null;
  const buttons = {};

  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:8px;align-items:center;margin:0 0 10px;font-family:inherit;';
  const caption = document.createElement('span');
  caption.textContent = 'Compare € with:';
  caption.style.cssText = 'font-size:13px;color:#555;';
  bar.appendChild(caption);
  ORDER.forEach(function (key) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = RIGHT[key].buttonText;
    b.style.cssText = 'border:1px solid #ccc;border-radius:999px;padding:5px 12px;' +
                      'cursor:pointer;font-size:13px;background:#f4f4f4;color:#222;';
    b.addEventListener('click', function () { current = key; render(); });
    buttons[key] = b; bar.appendChild(b);
  });
  canvas.parentNode.insertBefore(bar, canvas);

  function styleButtons() {
    ORDER.forEach(function (key) {
      const active = (current === key);
      const color = RIGHT[key].color;
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
    const cfg = RIGHT[current];

    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: rangeLabels,
        datasets: [
          line('Price in Euros (€)', seriesEur, C_EUR, 'yFiat'),
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
                const label = ctx.dataset.label || '';
                let value = ctx.parsed.y;
                if (value === null || value === undefined || isNaN(value)) return label + ': —';
                if (label === 'Price in bitcoin (₿)') {
                  value = Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
                } else if (label === 'Price in ounces of gold (Au)') {
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
loadCsv(SPAIN_STATS_CSV)
  .then(makeChart);
