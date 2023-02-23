var negativeColor = "rgba(0,204,153,0.9)";
var positiveColor = "rgba(91,155,213,0.9)";
var ctx = document.getElementById("cost").getContext("2d");
window.myBar = new Chart(ctx, {
	plugins: [{
		beforeUpdate: function(chartInstance) {
			chartInstance.data.datasets.forEach(function(dataset) {
				dataset.backgroundColor = dataset.data.map(function(data) {
				return data < 0 ? negativeColor : positiveColor;
				})
			})
		}
	}],
  type: 'bar',
  data: {
		labels: ['1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
	  datasets: [{
	    label: 'Cost of production, in %',
			data: [3.7, 5.9, 3.6,2.3,4.2,4.5,-1.3,1.7,4.1,.5,4.5,4.7,4.0,5.2,8.0,9.2,11.3,3.4,1.0,-0.5,-0.3,3.0,-0.2,2.8,-0.3,2.2,2.8,4.1,2.1,1.2, 5.7,],
	    backgroundColor: "rgba(220,220,220,0.5)",
	  }]
	},
  options: {
		scales: {
		xAxes: [{
			ticks: {
				autoSkip: false,
				maxRotation: 90,
				minRotation: 90,
			},
				barPercentage: 1.2
		}]
},
    elements: {
      rectangle: {
        borderWidth: 0,
        borderSkipped: 'bottom'
      }
    },
    responsive: true,
    legend: {
      position: 'top',
    },
  }
});
