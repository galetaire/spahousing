Chart.register(ChartDataLabels);

const BUBBLE_SIZE = 12;

const decades = [
    { label: '1980–1989', color: 'rgba(200, 150, 255, 0.3)', border: 'rgba(120, 40, 200, 1)', from: 1980, to: 1989 },
    { label: '1990–1999', color: 'rgba(255, 185, 100, 0.3)', border: 'rgba(210, 100, 10, 1)', from: 1990, to: 1999 },
    { label: '2000–2009', color: 'rgba(255, 120, 120, 0.3)', border: 'rgba(200, 30, 30, 1)', from: 2000, to: 2009 },
    { label: '2010–2019', color: 'rgba(255, 225, 80, 0.3)',  border: 'rgba(190, 150, 0, 1)',  from: 2010, to: 2019 },
    { label: '2020–2026', color: 'rgba(80, 220, 200, 0.3)', border: 'rgba(20, 150, 130, 1)', from: 2020, to: 2026 },
];

const annotationLinePlugin = {
    id: 'annotationLines',
    afterDraw(chart) {
        const { ctx, scales: { x, y } } = chart;
        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.7)';
        ctx.lineWidth = 1.5;

        const yPixel = y.getPixelForValue(60);
        ctx.beginPath();
        ctx.moveTo(x.left, yPixel);
        ctx.lineTo(x.right, yPixel);
        ctx.stroke();

        const xPixel = x.getPixelForValue(3.50);
        ctx.beginPath();
        ctx.moveTo(xPixel, y.top);
        ctx.lineTo(xPixel, y.bottom);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = 'rgba(80, 80, 80, 0.9)';
        ctx.textAlign = 'left';
        ctx.fillText('', x.right + 4, yPixel + 4);
        ctx.textAlign = 'center';
        ctx.fillText('', xPixel, y.bottom + 20);
        ctx.restore();
    }
};

function makeChart(marketgdp) {
    var rangeStart = 66; // index for year 1980 (adjust if needed)
    var rangeEnd = new Date().getFullYear() - 1899;

    var allData = marketgdp.slice(rangeStart, rangeEnd).map(function(d) {
        return {
            x: parseFloat(d.Market_cap/d.GDP_spain),
            y: parseFloat(d.Average_risk),
            r: BUBBLE_SIZE,
            year: parseInt(d.Year)
        };
    });

    const datasets = decades.map(d => ({
        label: d.label,
        data: allData.filter(p => p.year >= d.from && p.year <= d.to),
        backgroundColor: d.color,
        borderColor: d.border,
        borderWidth: 1
    }));

    const ctx = document.getElementById('bubbleChart').getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: { datasets },
        plugins: [annotationLinePlugin],
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const d = context.raw;
                            return `${d.year} — PIB: ${d.x.toFixed(2)}, Presión: ${d.y.toFixed(2)}`;
                        }
                    }
                },
                datalabels: {
                    formatter: (value) => value.year,
                    font: { size: 9 },
                    color: '#333',
                    anchor: 'center',
                    align: 'center',
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Ratio bienes inmuebles/PIB' },
                    ticks: { callback: (value) => value.toFixed(2) }
                },
                y: {
                    title: { display: true, text: 'Presión en la vivienda (barómetro)' },
                    ticks: { callback: (value) => value.toFixed(1) }
                }
            }
        }
    });
}

d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
    .then(makeChart)
    .catch(err => console.error('Failed to load CSV:', err));
