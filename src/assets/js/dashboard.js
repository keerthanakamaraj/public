/*** Call function dynamically start ***/
function runFunction(name, arguments)
{
    var fn = window[name];
    if(typeof fn !== 'function')
        return;

    fn.apply(window, arguments);
}
/*** Call function dynamically end ***/

function chart_today(value){
	if(value===undefined){
		var chartid="today";
	}else{
		var chartid=value;
	}
	var labels = [
		"TTC 100",
		"TTC 102",
		"TTC 101",
		"TTC 104",
	];
	var dataRange = [50, 60, 40, 30];
	var BackgroundColorData = ["#FFC800", "#B94A4B", "#0F81CE", "#29CAC0"];
	var BackgroundColorHoverData = ["#b18c06", "#71191a", "#024979", "#108e86"];
	chartCustom(chartid, labels, dataRange, BackgroundColorData, BackgroundColorHoverData, "2.6T", "Total Amount","doughnut");
}

function chart_c2(value){
	if(value===undefined){
		var chartid="c2";
	}else{
		var chartid=value;
	}
	var labels = [
		"TTC 500",
		"TTC 510"
	];
	var dataRange = [200, 100];
	var BackgroundColorData = ["#0F81CE", "#FFC800"];
	var BackgroundColorHoverData = ["#024979", "#b18c06"];
	chartCustom(chartid, labels, dataRange, BackgroundColorData, BackgroundColorHoverData, "1.6T", "Total Amount","doughnut");
}

function chart_c3(value){
	if(value===undefined){
		var chartid="c3";
	}else{
		var chartid=value;
	}
	var labels = [
		"TTC 103",
		"TTC 112",
		"TTC 113",
		"TTC 116"
	];
	var dataRange = [50, 60, 40, 30];
	var BackgroundColorData = ["#FFC800", "#B94A4B", "#0F81CE", "#29CAC0"];
	var BackgroundColorHoverData = ["#b18c06", "#71191a", "#024979", "#108e86"];
	chartCustom(chartid, labels, dataRange, BackgroundColorData, BackgroundColorHoverData, "1.6T", "Total Amount","doughnut");
}

function chart_c4(value){
	if(value===undefined){
		var chartid="c4";
	}else{
		var chartid=value;
	}
	var labels = [
		"TTC 300",
		"TTC 310",
		"TTC 301",
		"TTC 311"
	];
	var dataRange = [50, 60, 40, 30];
	var BackgroundColorData = ["#FFC800", "#B94A4B", "#0F81CE", "#29CAC0"];
	var BackgroundColorHoverData = ["#b18c06", "#71191a", "#024979", "#108e86"];
	chartCustom(chartid, labels, dataRange, BackgroundColorData, BackgroundColorHoverData, "1.6T", "Total Amount","doughnut");
}



function chartCustom(chartid, labelsData, dataRange, BackgroundColorData, BackgroundColorHoverData, maintext, subtext, charttype) {
	var data = {
		labels: labelsData,
		datasets: [{
			data: dataRange,
			backgroundColor: BackgroundColorData,
			hoverBackgroundColor: BackgroundColorHoverData,
		}]
	};
	var options = {
		elements: {
			center: {
				text: maintext, //set as you wish
				subtext:subtext
			},
			arc: {
				borderWidth: 0
			}
		},
		segmentShowStroke: false,
		animateRotate: true,
		animateScale: false,
		percentageInnerCutout: 50,
		tooltipTemplate: "<%= value %>%",
		responsive: true,
maintainAspectRatio: false,

		legend: {
			display: false
		},
	}
	var today = document.getElementById(chartid).getContext("2d");
	var myDoughnutChart = new Chart(today, {
		type: charttype,
		data: data,
		options: options,
		plugins:[{
			beforeDraw: function (chart) {
				var width = chart.chart.width,
					height = chart.chart.height,
					ctx = chart.chart.ctx;
				ctx.restore();
				var fontSize = (height / 114).toFixed(2);
				ctx.font = fontSize + "em sans-serif";
				ctx.textBaseline = "middle";
	
				var text = chart.config.options.elements.center.text,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 2;
				ctx.fillStyle = "#333333";
				ctx.fillText(text, textX, textY - 10);
				var fontSize = (height / 304).toFixed(2);
				ctx.font = fontSize + "em sans-serif";
				ctx.textBaseline = "middle";
	
				text = chart.config.options.elements.center.subtext,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 2;
				ctx.fillStyle = "#626262";
				ctx.fillText(text, textX, textY + 20);
				ctx.save();
			}
		}]
	});

	if(document.getElementById(chartid + '-legend') != null){
		document.getElementById(chartid + '-legend').innerHTML = myDoughnutChart.generateLegend();
	}
	if(document.getElementById('legend') != null){
		document.getElementById('legend').innerHTML = myDoughnutChart.generateLegend();
	}
	var diagramLegend = document.getElementById(chartid).getContext("2d");
	diagramLegend.innerHTML = myDoughnutChart.generateLegend();
	var legendItems = document.querySelectorAll('#' + chartid + '-legend li');
	legendItems.forEach(function (item, itemIndex) {
		item.addEventListener('mouseenter', function () {
			highlightSegment(myDoughnutChart, itemIndex, true);
		});
		item.addEventListener('mouseleave', function () {
			highlightSegment(myDoughnutChart, itemIndex, false);
		});
	});

	function highlightSegment(chart, index, isHighlight) {
		var activeSegment = chart.getDatasetMeta(0).data[index];
		if (isHighlight) chart.updateHoverStyle([activeSegment], null, true);
		else chart.updateHoverStyle([activeSegment], null, false);
		chart.draw();
	}
}


/***** Bar chart start  *****/
function chart_c5(value){
	if(value===undefined){
		var chartid="c5";
	}else{
		var chartid=value;
	}
	var barChartData = {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
		datasets: [{
			label: 'Dataset 1',
			backgroundColor: '#0F81CE',
			data: [
					5,
					15,
					20,
					50,
					20,
					30,
					35,
					15,
					20,
					50,
					20,
					30,
					35,
					20,
					30,
					35,
			]
		}, {
			label: 'Dataset 2',
			backgroundColor: "#B94A4B",
			data: [
					25,
					10,
					20,
					50,
					20,
					30,
					35,
					15,
					20,
					50,
					20,
					30,
					35,
					20,
					30,
					35,
			]
		}]
	};
	var ctx1 = document.getElementById(chartid).getContext('2d');
	window.myBar = new Chart(ctx1, {
		type: 'bar',
		data: barChartData,
		options: {
			title: {
				display: true,
				text: ''
			},
			tooltips: {
				mode: 'index',
				intersect: false
			},
			responsive: true,
			scales: {
				xAxes: [{
					stacked: true,
				}],
				yAxes: [{
					stacked: true
				}]
			},
			legend: {
				display: false
			},
		}
	});
}
/***** Bar chart end *****/

/**** Line chart start *****/
function newDate(days) {
	return moment().add(days, 'd').toDate();
}

function newDateString(days) {
	return moment().add(days, 'd').format();
}
function chart_linechart(value){
	if(value===undefined){
		var chartid="linechart";
	}else{
		var chartid=value;
	}
	var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Rekening A',
			backgroundColor: color("#B94A4B").alpha(0.5).rgbString(),
			borderColor: "#B94A4B",
			fill: false,
			data: [{
				x: newDateString(0),
				y: 100000
			}, {
				x: newDateString(2),
				y: 120000
			}, {
				x: newDateString(4),
				y: 130000
			}, {
				x: newDateString(5),
				y: 150000
			}, {
				x: newDateString(6),
				y: 120000
			}, {
				x: newDateString(7),
				y: 130000
			}, {
				x: newDateString(8),
				y: 150000
			}],
		}, {
			label: 'Rekening B',
			backgroundColor: color('#FFC800').alpha(0.5).rgbString(),
			borderColor: '#FFC800',
			fill: false,
			data: [{
				x: newDate(0),
				y: 140000
			}, {
				x: newDate(2),
				y: 150000
			}, {
				x: newDate(4),
				y: 170000
			}, {
				x: newDate(5),
				y: 200000
			}, {
				x: newDate(6),
				y: 150000
			}, {
				x: newDate(7),
				y: 170000
			}, {
				x: newDate(8),
				y: 200000
			}]
		},{
			label: 'Rekening C',
			backgroundColor: color("#a5a5a5").alpha(0.5).rgbString(),
			borderColor: "#a5a5a5",
			fill: false,
			data: [{
				x: newDateString(0),
				y: 240000
			}, {
				x: newDateString(2),
				y: 270000
			}, {
				x: newDateString(4),
				y: 320000
			}, {
				x: newDateString(5),
				y: 330000
			}, {
				x: newDateString(6),
				y: 270000
			}, {
				x: newDateString(7),
				y: 320000
			}, {
				x: newDateString(8),
				y: 330000
			}],
		}, {
			label: 'Rekening D',
			backgroundColor: color('#0F81CE').alpha(0.5).rgbString(),
			borderColor: '#0F81CE',
			fill: false,
			data: [{
				x: newDate(0),
				y: 180000
			}, {
				x: newDate(2),
				y: 220000
			}, {
				x: newDate(4),
				y: 250000
			}, {
				x: newDate(5),
				y: 300000
			}, {
				x: newDate(6),
				y: 220000
			}, {
				x: newDate(7),
				y: 250000
			}, {legend: {
				display: false
			},
				x: newDate(8),
				y: 300000
			}]
		}]
	},
	options: {
		responsive: true,
		onClick: chartClickEvent,
		title: {
			display: false,
			text: 'Chart.js Time Point Data'
		},
		legend: {
			display: false
		},
		scales: {
			xAxes: [{
				type: 'time',
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Date'
				},
				ticks: {
					major: {
						fontStyle: 'bold',
						fontColor: '#FF0000'
					}
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'value'
				}
			}]
		}
	}
};


	var ctx = document.getElementById(chartid).getContext('2d');
	window.myLine = new Chart(ctx, config);
	if(document.getElementById('linechart-legend') != null){
		document.getElementById('linechart-legend').innerHTML = window.myLine.generateLegend();
	}
	if(document.getElementById('legend') != null){
		document.getElementById('legend').innerHTML = window.myLine.generateLegend();
	}
}

/**** Click event for line chart start ****/
function chartClickEvent(event, array){
	var activePoints = myLine.getElementAtEvent(event);

	// make sure click was on an actual point
	if (activePoints.length > 0) {
	  var clickedDatasetIndex = activePoints[0]._datasetIndex;
	  var clickedElementindex = activePoints[0]._index;
	  var label = myLine.data.labels[clickedElementindex];
	  var value = myLine.data.datasets[clickedDatasetIndex].data[clickedElementindex];     
	  //alert("Clicked: " + label + " - " + value);
	  $('#chartmodal').modal('show'); 
	  
	}
}
/**** Click event for line chart end ****/

/***** Line chart End *****/

/***** charts are call start *****/
chart_today();
chart_c2();
chart_c3();
chart_c4();
chart_c5();
chart_linechart();
/***** charts are call end *****/


