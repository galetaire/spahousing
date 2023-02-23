//getGradient
let width, height, gradient;
function getGradient(ctx, chartArea, scales){
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight){
    const pointzero = scales.y.getPixelForValue(0);
    const pointzeroheight = pointzero - chartArea.top;
    const pointzeroPercentage = pointzeroheight / chartHeight;
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartHeight + chartArea.top);
    gradient.addColorStop(pointzeroPercentage, 'rgba(91, 155, 213, 0.8)');
    gradient.addColorStop(pointzeroPercentage, 'rgba(255, 153, 0, 0.8)');
  }
  return gradient;
};

var ctx = document.getElementById('credit').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
      datasets: [{
              label: 'Interest rate',
              data: [-1.38, 2.85, -2.76, 3.34, 0.30, -2.36, 0.23, -2.40, -1.84, 0.92, -2.64, -2.16, -1.19, -0.85, 1.62, -0.70, -0.58, -1.19, -0.02, 0.06, 1.15, 0.99, 0.36, -3.32, -0.17, 0.69, -1.00, -0.51, -0.06, -0.31, -0.20, -0.11, -0.02, -0.05, -0.08, -0.18, 1.58],
              backgroundColor: function(context){
                const chart = context.chart;
                const {ctx, chartArea, scales} = chart;
                  if(!chartArea) {
                  return null;
                }
                return getGradient(ctx, chartArea, scales);
                },
              borderColor: 'rgba(1, 1, 1, 0.4)',
              borderWidth: 1,
              pointRadius: 1,
              tension: 0.4,
              fill: true
          }],
        },
    options: {
      scales: {
        y: {
          beginAtZero: true
          }
        }
      }
});
