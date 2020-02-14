import { Component, OnInit,ViewChild, NgZone, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as am4core  from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material  from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ServiceStock } from '../service-stock.service';
// import 'src/assets/js/carousel.js';


declare let $: any;
declare let document: any;
window["$"] = $;
window["jQuery"] = $;

am4core.useTheme(am4themes_material);


@Component({
	selector: 'app-fluid-page',
	templateUrl: './fluid-page.component.html',
	styleUrls: ['./fluid-page.component.css']
})
export class FluidPageComponent implements OnInit ,AfterViewInit {
	private chart: am4charts.XYChart;
	@ViewChild('totLead', {static: true}) TotallendingRef: ElementRef;
	@ViewChild('totVendor', {static: true}) TotalVendorRef: ElementRef;
	@ViewChild('invoiceGen', {static: true}) InvoiceGenRef: ElementRef;
	public NewCustomers="0";
	public TotalSales="0";
	public TotalSalesFormated="0";
	public TotalOrders="0";
	public TotalLoansToday="0";
	public TotalLoans="0";
	public LoanDefaulters="0";
	public UpDatedTime="00:00 am";
	public monthName='December';
	public CurrentMonthTotalOrders="0";
	public CurrentMonthDelivered="0";
	public OrdersPersentage=0
	public month =[];
	public year=2019;
	public RiskPersentage=0;
	public formatedAmout=false;
	public TotalCustomers="0";
	public TotalMerchants="0";
	public TotalOrder="0";
	public TotalLoan="0"
	public OrdersPersentageIn5=0
    public TodayMerchant="0";
    public totalActiveLoanAmount: "1.017.784,00"
	public totalActiveLoans: "20"
	public totalCollectionAmount=0;
	public totalDefaultLoanAmount: "0,00"
	public totalDefaultLoans: "0"
	public totalRepaymentReceived=0
	public totalCollectionAmountFormated="0,00"
	public PaymentsPersentage=0;
	public PaymentsPersentageIn5=0;
	public balenced="0";
	
	constructor(private zone: NgZone ,public services: ServiceStock) {
		this.month[0] = "January";
		this.month[1] = "February";
		this.month[2] = "March";
		this.month[3] = "April";
		this.month[4] = "May";
		this.month[5] = "June";
		this.month[6] = "July";
		this.month[7] = "August";
		this.month[8] = "September";
		this.month[9] = "October";
		this.month[10] = "November";
		this.month[11] = "December";
	 }
  
	ngOnInit() {
	  var ctx = (<HTMLCanvasElement>document.getElementById('update-chart-1')).getContext("2d"); 
	  var myChart = new Chart(ctx, { type: 'bar', data: valincome('#fff', [30, 20, 15, 20], '#fff'), options: valincomebuildoption(), });
	   var ctx = (<HTMLCanvasElement>document.getElementById('update-chart-2')).getContext("2d"); 
	   var myChart = new Chart(ctx, { type: 'bar', data: valincome('#fff', [10, 30, 20, 15], '#fff'), options: valincomebuildoption(), }); 
	  var ctx = (<HTMLCanvasElement>document.getElementById('update-chart-3')).getContext("2d"); 
	  var myChart = new Chart(ctx, { type: 'bar', data: valincome('#fff', [25, 10, 20, 15], '#fff'), options: valincomebuildoption(), }); 
	  var ctx = (<HTMLCanvasElement>document.getElementById('update-chart-4')).getContext("2d");
	  var myChart = new Chart(ctx, { type: 'bar', data: valincome('#fff', [25, 30, 20, 15], '#fff'), options: valincomebuildoption(), });
	  var ctx = (<HTMLCanvasElement>document.getElementById('update-chart-5')).getContext("2d");
	  var myChart = new Chart(ctx, { type: 'bar', data: valincome('#fff', [10, 30, 20, 15], '#fff'), options: valincomebuildoption(), });
	  var ctx = (<HTMLCanvasElement>document.getElementById('update-chart-6')).getContext("2d");
	  var myChart = new Chart(ctx, { type: 'bar', data: valincome('#fff', [30, 10, 20, 25], '#fff'), options: valincomebuildoption(), });
	
	  function valincome(a, b, f) {
		  if (f == null) { f = "rgba(0,0,0,0)"; }
		  return { labels: ["1", "2", "3", "4", "5"], datasets: [{ label: "", borderColor: a, borderWidth: 0, hitRadius: 30, pointRadius: 0, pointHoverRadius: 4, pointBorderWidth: 2, pointHoverBorderWidth: 12, pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(), pointBorderColor: a, pointHoverBackgroundColor: a, pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(), fill: true, backgroundColor: Chart.helpers.color(f).alpha(1).rgbString(), data: b, }] };
		}
		function valincomebuildoption(){ 
		  return { maintainAspectRatio: false, title: { display: false, }, tooltips: { enabled: false, }, legend: { display: false }, hover: { mode: 'index' }, scales: { xAxes: [{ display: false, gridLines: false, scaleLabel: { display: true, labelString: 'Month' } }], yAxes: [{ display: false, gridLines: false, scaleLabel: { display: true, labelString: 'Value' }, ticks: { min: 1, } }] }, elements: { point: { radius: 4, borderWidth: 12 } }, layout: { padding: { left: 10, right: 0, top: 15, bottom: 0 } } }; 
		 }
	 // this.createMixedChart();
	  this.createTotalLendings();
	  this.createTotalVendor();
	  this.createInvoiceGen();
  
	  this.zone.runOutsideAngular(() => {
		this.createBarChart();
		this.createLineChart();
	   });
	this.GetAllCardData();
	
	}
	
async GetAllCardData(){
		let inputMap = new Map();
		inputMap.clear();
		this.services.http.showSpinner();
		await this.services.http.fetchApi('/dashboard ', 'GET', inputMap).toPromise()
		.then(
		async (res)=>{
		this.services.http.hideSpinner();
		this.NewCustomers=res['NoOfCustomersToday'];
		this.TotalSales=res['SumOfInvoiceAmount'];
		this.TotalSalesFormated=res['SumOfInvoiceAmountFormatted'];
		this.TotalOrders=res['NoOfInvoicesToday'];
		this.TotalLoansToday=res['NoOfLoansToday'];
		this.TotalLoans=res['TotalLoans'];
		this.CurrentMonthTotalOrders=res['CurrentMonthTotalOrders'];
		this.CurrentMonthDelivered=res['CurrentMonthDelivered'];
        this.TodayMerchant=res['TodayMerchants'];
		this.TotalCustomers=res['TotalCustomers'];
		this.TotalMerchants=res['TotalMerchants'];
		this.TotalOrder=res['TotalInvoices'];
		this.TotalLoan=res['TotalLoans'];
		this.totalActiveLoanAmount=res['totalActiveLoanAmount'];
		this.totalActiveLoans=res['totalActiveLoans'];
		this.totalDefaultLoanAmount=res['totalDefaultLoanAmount'];
		this.totalDefaultLoans=res['totalDefaultLoans'];
		this.totalCollectionAmountFormated=res['totalCollectionAmount'];
		this.totalRepaymentReceived= +res['totalRepaymentReceived'].split('.').join('').split(',').join('');
		this.totalCollectionAmount= +res['totalCollectionAmount'].split('.').join('').split(',').join('');
		},
		async (httpError)=>{
			this.services.http.hideSpinner();
		});	
		this.services.http.showSpinner();
		let inputMap1= new Map();
		await this.services.http.fetchApi('/loggedinUserInfo', 'GET', inputMap1).toPromise()
		.then(
		async (res)=>{
			var respData = res as any;
			for (var key in respData) {
			 sessionStorage.setItem(key, respData[key]);
			 }
		},
		async (httpError)=>{
			this.services.http.hideSpinner();
		});
		this.services.http.hideSpinner();
		this.UpDatedTime=this.formatAMPM( new Date());
		this.monthName=this.month[( new Date()).getMonth()];
		this.year=( new Date()).getFullYear();
		setTimeout(() => {
			this.ShowCardsInAnimation();	
		}, 100);
	}


	formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	  }

	ShowCardsInAnimation(){
		$('.count').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 2000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
		if(+this.LoanDefaulters > +this.TotalLoans){
         this.balenced="1";
		}else if(+this.LoanDefaulters < +this.TotalLoans){
			this.balenced="-1";
		}
		this.RiskPersentage = ((+this.TotalLoans - +this.LoanDefaulters) / (+this.TotalLoans + +this.LoanDefaulters)) * 100;
	    this.OrdersPersentage=Math.floor((( +this.CurrentMonthDelivered) / (+this.CurrentMonthTotalOrders + +this.CurrentMonthDelivered)) * 100);
		let temp=Math.floor(this.OrdersPersentage/5);
		this.OrdersPersentageIn5=Math.floor(temp*5);
		this.PaymentsPersentage=Math.floor((( +this.totalCollectionAmount) / (+this.totalRepaymentReceived + +this.totalCollectionAmount)) * 100);
		let temp1=Math.floor(this.PaymentsPersentage/5);
		this.PaymentsPersentageIn5=Math.floor(temp1*5);

		setTimeout(() => {
		 	this.formatedAmout=true;
		 }, 2100);
	}  
  
	
	ngOnDestroy() {
	  this.zone.runOutsideAngular(() => {
		if (this.chart) {
		  this.chart.dispose();
		}
	  });
	}

	ngAfterViewInit(): void {
		var aTags = document.getElementsByTagName("title");
		var searchText = "Chart created using amCharts library";
		var found;
		for (var i = 0; i < aTags.length; i++) {
		  if (aTags[i].textContent == searchText) {
			found = aTags[i];
			found.parentNode.style.display="none"
		  }
		}
	   }
	
  
 async createLineChart(){
	let chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.paddingRight = 20;
	chart.numberFormatter.numberFormat = "###";
	let data = [];
	let visits = 10;

	    let inputMap = new Map();
		inputMap.clear();
		this.services.http.showSpinner();
		await this.services.http.fetchApi('/salesanalysis ', 'GET', inputMap).toPromise()
		.then(
		async (res)=>{
		this.services.http.hideSpinner();
		if(res['SalesAnalysis']){
			for(let i=0;i< res['SalesAnalysis'].length;i++){
				data.push({ date: res['SalesAnalysis'][i]['year']+"-"+res['SalesAnalysis'][i]['month']+"-"+res['SalesAnalysis'][i]['day'], value: res['SalesAnalysis'][i]['sumOfAmount'] , AmountFormated: res['SalesAnalysis'][i]['sumOfAmountFormatted']  });
			}
			chart.data = data;
			let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
			dateAxis.renderer.grid.template.location = 0;
			dateAxis.renderer.grid.template.disabled = true;

			let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.title.text = "Sales (EUR)";
			valueAxis.renderer.grid.template.disabled = true;
			valueAxis.tooltip.disabled = true;
			valueAxis.renderer.minWidth = 35;
			let series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.dateX = "date";
			series.dataFields.valueY = "value";
			series.tooltipText = " € {AmountFormated} ";
			series.tensionX = 0.77;
		
			chart.cursor = new am4charts.XYCursor();
			let scrollbarX = new am4charts.XYChartScrollbar();
			chart.scrollbarX = scrollbarX;
			series.tooltip.background.cornerRadius = 20;
			series.tooltip.background.strokeOpacity = 0;
			series.tooltip.pointerOrientation = "vertical";
			series.tooltip.label.minWidth = 40;
			series.tooltip.label.minHeight = 40;
			series.tooltip.label.textAlign = "middle";
			series.tooltip.label.textValign = "middle"; 
			series.propertyFields.fill = "#ff0000";
			series.propertyFields.stroke ="#00ff00";
			scrollbarX.series.push(series);
			let bullet = series.bullets.push(new am4charts.CircleBullet());
			bullet.circle.strokeWidth = 2;
			bullet.circle.radius = 3;
			bullet.circle.fill = am4core.color("#f04c41");
			let bullethover = bullet.states.create("hover");
			bullethover.properties.scale = 1.3;
			chart.cursor = new am4charts.XYCursor();
			chart.cursor.behavior = "panXY";
			chart.cursor.xAxis = dateAxis;
			chart.cursor.snapToSeries = series;
			this.chart = chart;
		}},
		async (httpError)=>{
		this.services.http.hideSpinner();
		});
	}

 async createBarChart(){
	am4core.useTheme(am4themes_animated);
	am4core.options.autoSetClassName = true;

	// Create chart instance
	let chart = am4core.create("monthly-graph", am4charts.XYChart);

	chart.colors.step = 2;
	chart.maskBullets = false;
	chart.numberFormatter.numberFormat = "###";
	// Add data
	chart.data=[];
	let inputMap = new Map();
	inputMap.clear();
	this.services.http.showSpinner();
	await this.services.http.fetchApi('/loancustomergraph', 'GET', inputMap).toPromise()
	.then(
	async (res)=>{
	  this.services.http.hideSpinner();
	  for(let i=0;i<res['LoanCustomerGraphResponse'].length;i++){
		let temp={
			"date": res['LoanCustomerGraphResponse'][i]['Year']+'-'+res['LoanCustomerGraphResponse'][i]['Month']+'-'+res['LoanCustomerGraphResponse'][i]['Day'],
	        "SalesValue": +res['LoanCustomerGraphResponse'][i]['SumOfAmount'],
	        "CustomerValue":+res['LoanCustomerGraphResponse'][i]['CustomerCount'],
			"LoansValue": +res['LoanCustomerGraphResponse'][i]['LoanAmount'],
			"SalesValueFormatted": res['LoanCustomerGraphResponse'][i]['SumOfAmountFormatted'],
	        "LoansValueFormatted": res['LoanCustomerGraphResponse'][i]['LoanAmountFormatted']
		}
		chart.data.push(temp);
	  }
	 // console.log(chart.data);
	// Create axes
	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.grid.template.location = 0;
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.grid.template.disabled = true;
	dateAxis.renderer.fullWidthTooltip = true;

	let distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
	distanceAxis.title.text = "Sales (EUR)";
	distanceAxis.renderer.grid.template.disabled = true;
	

	let durationAxis = chart.yAxes.push(new am4charts.ValueAxis());
	durationAxis.title.text = "New Customers";
	durationAxis.renderer.grid.template.disabled = true;
	durationAxis.renderer.opposite = true;
	//durationAxis.durationFormatter.durationFormat = "hh'h'";


	// Create series
	let distanceSeries = chart.series.push(new am4charts.ColumnSeries());
	distanceSeries.id = "g1";
	distanceSeries.dataFields.valueY = "SalesValue";
	distanceSeries.dataFields.dateX = "date";
	distanceSeries.yAxis = distanceAxis;
	distanceSeries.tooltipText = "Sales : {SalesValueFormatted}";
	distanceSeries.name = "Sales";
	distanceSeries.columns.template.fillOpacity = 0.7;
	distanceSeries.fill = am4core.color("rgb(1, 169, 172)");
	distanceSeries.stroke = am4core.color("rgb(1, 169, 172)");


	let disatnceState = distanceSeries.columns.template.states.create("hover");
	disatnceState.properties.fillOpacity = 0.9;

	let durationSeries = chart.series.push(new am4charts.LineSeries());
	durationSeries.id = "g3";
	durationSeries.dataFields.valueY = "LoansValue";
	durationSeries.dataFields.dateX = "date";
	durationSeries.yAxis = distanceAxis;
	durationSeries.name = "Loans";
	durationSeries.strokeWidth = 2;
	durationSeries.tooltipText = "Loans : {LoansValueFormatted}";
	durationSeries.tensionX = 0.77;
	durationSeries.stroke = am4core.color("#fe5d70");
	durationSeries.tooltip.getFillFromObject = false;
	durationSeries.tooltip.background.fill = am4core.color("#fe5d70");

	let durationBullet = durationSeries.bullets.push(new am4charts.CircleBullet());
	durationBullet.circle.strokeWidth = 2;
	durationBullet.circle.radius = 3;
	durationBullet.circle.fill = am4core.color("#fe5d70");
	let durationhover = durationBullet.states.create("hover");
	durationhover.properties.scale = 1.3;

	let durationState = durationBullet.states.create("hover");
	durationState.properties.scale = 1.2;

	let latitudeSeries = chart.series.push(new am4charts.LineSeries());
	latitudeSeries.id = "g2";
	latitudeSeries.dataFields.valueY = "CustomerValue";
	latitudeSeries.dataFields.dateX = "date";
	latitudeSeries.yAxis = durationAxis;
	latitudeSeries.name = "Customers";
	latitudeSeries.strokeWidth = 2;
	latitudeSeries.tooltipText = " {valueY} Customers";
	latitudeSeries.stroke = am4core.color("#44495b");
	latitudeSeries.tooltip.getFillFromObject = false;
	latitudeSeries.tooltip.background.fill = am4core.color("#0ac282");

	let latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
	latitudeBullet.circle.fill = am4core.color("#0ac282");
	latitudeBullet.circle.stroke= am4core.color("#01a9ac");
	latitudeBullet.circle.strokeWidth = 2;
	latitudeBullet.circle.propertyFields.radius = "townSize";
	let latitudeState = latitudeBullet.states.create("hover");
	latitudeState.properties.scale = 1.2;

	let latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
	latitudeLabel.label.horizontalCenter = "left";
	latitudeLabel.label.dx = 14;

	// Add legend
	chart.legend = new am4charts.Legend();

	// Add cursor
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.fullWidthLineX = true;
	chart.cursor.xAxis = dateAxis;
	chart.cursor.lineX.strokeOpacity = 0;
	chart.cursor.lineX.fill = am4core.color("#000");
	chart.cursor.lineX.fillOpacity = 0.1;
	},
	async (httpError)=>{
		this.services.http.hideSpinner();
	});
	}
  
	Totallending;
	createTotalLendings(){
	  this.Totallending = new Chart(this.TotallendingRef.nativeElement, {
		type: 'line',
		data: {
		  labels: ["4 December","5 December","6 December","7 December","8 December" , "9 December" , "10 December" , "11 December", "12 December", "13 December"], // your labels array
		  datasets: [
			{
			  data: [123,453,110,209,555 , 200 , 400 , 325, 400 , 220], // your data array
			  borderColor: '#01a9ac',
			  backgroundColor : '#4dc3c5',
			  fill: true,
			  label: "Customers",
			  lineTension: 0
			}
		  ]
		},
		options: {
		  fill:true,
		  legend: {
			display: false
		  },
		  scales: {
			xAxes: [{
			  display: false,
			  gridLines: !1,
			}],
			yAxes: [{
			  display: false,
			  ticks:{
				beginAtZero: true
			  }
			}], 
		  },
		  title: {
			display: false,
			text: ' Server\'s Load'
		  },
		}
	  });
  
	}
	TotalVendor;
	createTotalVendor(){
	  this.TotalVendor = new Chart(this.TotalVendorRef.nativeElement, {
		type: 'line',
		data: {
			labels: ["4 December","5 December","6 December","7 December","8 December" , "9 December" , "10 December" , "11 December", "12 December", "13 December"], // your labels array
			datasets: [
			{
			  data: [400,253,110,309,155 , 300 , 400 , 276 ,515 , 312], // your data array
			  borderColor: '#fe9365',
			  backgroundColor : '#feb393',
			  fill: true,
			  label: "Sales",
			  lineTension: 0
			}
		  ]
		},
		options: {
		  fill:true,
		  legend: {
			display: false
		  },
		  scales: {
			xAxes: [{
			  display: false,
			  gridLines: !1,
			}],
			yAxes: [{
			  display: false,
			  ticks:{
				beginAtZero: true
			  }
			}], 
		  },
		  title: {
			display: false,
			text: ' Server\'s Load'
		  },
		}
	  });
  
	}
	InvoiceGen;
	createInvoiceGen(){
	  this.InvoiceGen = new Chart(this.InvoiceGenRef.nativeElement, {
		type: 'line',
		data: {
			labels: ["4 December","5 December","6 December","7 December","8 December" , "9 December" , "10 December" , "11 December", "12 December", "13 December"], // your labels array
			datasets: [
			{
			  data: [42,15,31,20,35 , 22 , 12 ,10 , 30, 35], // your data array
			  borderColor: '#0ac282',
			  backgroundColor : '#53d4a7',
			  fill: true,
			  label: "Merchants",
			  lineTension: 0
			}
		  ]
		},
		options: {
		  fill:true,
		  legend: {
			display: false
		  },
		  scales: {
			xAxes: [{
			  display: false,
			  gridLines: !1,
			}],
			yAxes: [{
			  display: false,
			  ticks:{
				beginAtZero: true
			  }
			}], 
		  },
		  title: {
			display: false,
			text: ' Server\'s Load'
		  },
		}
	  });
  
	}

ScrollLeft(){
	$('#body-scroll').animate({ scrollLeft: "-="+document.getElementById('RefWidth').offsetWidth }, "slow");
}
ScrollRight(){
	$('#body-scroll').animate({ scrollLeft: "+="+document.getElementById('RefWidth').offsetWidth }, "slow");
}
}
