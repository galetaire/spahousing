var ctx = document.getElementById('multivariate').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
        datasets: [
          /*{
            label: 'Interest rate',
            type: 'line',
            data: [-1.38, 2.85, -2.76, 3.34, 0.30, -2.36, 0.23, -2.40, -1.84, 0.92, -2.64, -2.16, -1.19, -0.85, 1.62, -0.70, -0.58, -1.19, -0.02, 0.06, 1.15, 0.99, 0.36, -3.32, -0.17, 0.69, -1.00, -0.51, -0.06, -0.31, -0.20, -0.11, -0.02, -0.05, -0.08, -0.18, 1.58],
            backgroundColor: 'rgba(250, 0, 0, 0.4)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 0.5,
            showLine: true,
            pointStyle: false,
            fill: true
          },*/
          {
            label: 'Inflation',
            type: 'line',
            data: [8.80,5.26,4.83,6.79,6.72,5.94,5.93,4.57,4.72,4.67,3.56,1.97,1.83,2.31,3.43,3.59,3.07,3.04,3.04,3.37,3.52,2.79,4.08,-0.29,1.80,3.20,2.45,1.41,-0.15,-0.50,-0.20,1.96,1.67,0.70,-0.32,3.09,8.65],
            backgroundColor: 'rgba(250, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 0.5,
            showLine: false,
            pointStyle: 'circle',
            pointRadius: 4,
            fill: false
          },
          {
            label: 'Unemployment',
            type: 'line',
            data: [21.0, 20.2, 19.2, 17.2, 16.2, 16.3, 18.4, 22.6, 24.1, 22.9, 22.1, 20.6, 18.6, 15.6, 13.9, 10.6, 11.5, 11.5, 11.0, 9.2, 8.5, 8.2, 11.3, 17.9, 19.9, 21.4, 24.8, 26.1, 24.4, 22.1, 19.6, 17.2, 15.3, 14.1, 15.5, 14.8, 12.93],
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            borderDash: [1,3],
            pointStyle: 'crossRot',
            pointRadius: 8,
            fill: false
          },
          {
            label: 'Home sales',
            type: 'line',
            data: [,,,,,,,,,,,,,,,,,,11.95,13.54,6.72,-7.70,-28.79,-25.12,6.34,-18.15,-11.48,-1.87,2.00,11.52,14.01,15.36,10.76,-2.79,-17.44,36.03,16.92],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            borderDash: [3,3],
            pointStyle: 'rect',
            pointRadius: 8,
            fill: false
          },
          {
            label: 'Mortgages',
            type: 'line',
            data: [,,,,,,,,,,2.33,16.04,10.50,10.62,4.62,0.47,12.10,14.45,11.95,13.54,6.72,-7.70,-32.49,-22.18,-6.66,-32.77,-32.95,-27.08,2.30,20.79,14.56,10.66,11.34,3.72,-7.63,25.10,13.31],
            backgroundColor: 'rgba(255, 20, 147, 0.2)',
            borderColor: 'rgba(255, 20, 147, 1)',
            borderWidth: 1,
            borderDash: [3,3],
            pointStyle: 'circle',
            pointRadius: 8,
            fill: false
          },
          {
            label: 'Nominal price',
            backgroundColor: 'rgb(89, 89, 89, 0.9)',
            borderColor: 'rgba(89, 89, 89, 1)',
            borderWidth: 1,
            data: [19.61,26.23,31.09,24.46,13.93,1.69,-0.97,-0.54,3.05,3.81,1.73,2.95,4.43,8.66,11.40,9.89,13.03,15.64,16.18,13.12,10.84,5.35,-1.36,-4.19,-1.77,-7.46,-11.31,-8.36,0.24,2.00,2.50,4.73,2.55,2.20,-0.97,6.32,7.53],
            xAxisID: "axis1",
        },
        {
            label: 'Real price',
            backgroundColor: 'rgb(255, 95, 21, 0.4)',
            borderColor: 'rgba(255, 95, 21, 1)',
            borderWidth: 1,
            data: [10.81, 20.97, 26.26, 17.67, 7.21, -4.25, -6.90, -5.11, -1.67, -0.86, -1.83, 0.98, 2.60, 6.35, 7.97, 6.30, 9.96, 12.60, 13.14, 9.75, 7.32, 2.56, -5.44, -3.90, -3.57, -10.66, -13.76, -9.77, 0.39, 2.50, 2.70, 2.77, 0.88, 1.50, -0.65, 3.23, -1.12],
            xAxisID: "axis2",
        }]
    },
    options: {
        scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90,
                padding: -180
              },
                stacked: true,
                id: "axis1",
                barThickness: 8,
              }, {
                display: false,
                stacked: true,
                id: "axis2",
                barThickness: 15,
                // these are needed because the bar controller defaults set only the first x axis properties
                type: 'category',
                categoryPercentage: 0.8,
                barPercentage: 0.9,
                gridLines: {
                  offsetGridLines: true
                },
                offset: true
              }],
            yAxes: [{
                stacked: false,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
