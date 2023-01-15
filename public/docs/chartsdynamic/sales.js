var ctx = document.getElementById('sales').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'],
      datasets: [
        {
          label: 'Upper limit',
          type: 'line',
          data: [653233,671867,690523,707753,723363,740236,747259,746270,742481,736539,725536,710977,698900,687346,677935,670198,665284,662617,655549,646215,634715,625032,615976,606853,597801,588902,581639,575503,571243,568591,567644,568758,570368],
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [0,1],
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false
        },
        {
          label: 'Optimal',
          type: 'line',
          data: [489925,503900,517892,530815,542522,555177,560444,559703,556861,552404,544152,533233,524175,515509,508451,502648,498963,496963,491662,484661,476037,468774,461982,455140,448351,441676,436229,431627,428432,426443,425733,426568,427776],
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [3,2],
          pointStyle: 'dash',
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Lower limit',
          type: 'line',
          data: [326616,335933,345262,353877,361681,370118,373629,373135,371240,368270,362768,355489,349450,343673,338968,335099,332642,331308,327774,323108,317358,312516,307988,303427,298900,294451,290819,287751,285621,284295,283822,284379,285184],
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [0,1],
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false
        },
        {
            label: 'Inheritances',
            data: [116139,119731,123434,127251,131187,130481,122546,132407,134536,136922,132980,137594,151206,159988,169851,179385,176046,151533,198939,197008],
            backgroundColor: 'rgba(178, 10, 104, 0.8)',
            borderColor: 'rgba(178, 10, 104, 1)',
            borderWidth: 1
        },
          {
              label: 'Home sales',
              data: [619193,693178,787017,839933,775300,552080,413393,439591,359824,318534,312593,318830,355556,405385,467644,517984,503546,415748,565523,661190],
              backgroundColor: 'rgba(91, 155, 213, 0.8)',
              borderColor: 'rgba(31, 78, 121, 1)',
              borderWidth: 1,
              barThickness: 3
          }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90,
                  beginAtZero: true
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
