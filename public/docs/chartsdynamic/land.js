var ctx = document.getElementById('land').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [
          '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
        datasets: [
            {
                label: 'Numer of permits',
                yAxisID: 'y-axis-1',
                data: [81900, 81380, 74158, 85789, 87673, 89323, 104790, 120765, 141338, 143902, 140616, 136544, 152785, 166437, 179257, 181702, 151730, 108332, 89108, 89788, 76339, 60670, 56436, 56606, 64156, 66417, 70982, 74081, 78325, 71099, 82647, 76449],
                backgroundColor: 'rgba(47, 85, 151, 0.2)',
                borderColor: 'rgba(47, 85, 151, 1)',
                fill: false,
                borderWidth: 1
            },
            {
                label: 'Price of land',
                yAxisID: 'y-axis-2',
                data: [,,,,,,,,,,,,,227, 261, 269, 279, 255, 239, 208, 195, 182, 154, 147, 153, 161, 162, 160, 161, 146, 151, 159],
                backgroundColor: 'rgba(255, 113, 113, 0.2)',
                borderColor: 'rgba(255, 113, 113, 1)',
                borderWidth: 1,
                fill: false
            }
        ]},
    options: {
        scales: {
            xAxes: [{
                  ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                  }
                  }],
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: true
                    }
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
});
