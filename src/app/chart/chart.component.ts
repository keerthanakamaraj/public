import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ChartParticularsModel } from '../chartParticulars';
import { Chart } from 'chart.js';

// declare let $: any;
// window["$"] = $;
// window["jQuery"] = $;

import { ChartData } from './chartData';
import { ChartInfo } from './chartInfo';
import { ProvidehttpService } from '../providehttp.service';
import { ChartDataIn } from './chartDataIn';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {

  chartData: ChartData; 
  additionalInfo: any;

  @Input() chartInfo: ChartInfo;
  @Input() chartSource: any;

  @Output() renderComplete: EventEmitter<any> = new EventEmitter<any>();

  formCode: string;
  requestParams: any = {};
  mapData = new Map();

  chartName: String;
  chartParticulars = new ChartParticularsModel();
  chartTypeDropdown: {
    Description: String,
    Identifier: String,
    isActive: boolean,
    isCompatible: boolean
  }[] = [];

  ctx: any;
  myChart: Chart;

  canvasId: string;
  downloadButtonId: string;
  loaderId: string;

  currentFilters: any = {};
  parentFilters: any = {};

  dataStack: {
    chartData: ChartData;
    chartInfo: ChartInfo;
    selectedElement: { datasetName: String, label: any }; //Selected Element on Click
  }[] = [];

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.chartInfo != undefined && this.chartInfo != null) {
      this.initChart();
    }
  }

  initChart() {
    this.initFormElements();
    this.initChartTypeDropDown();
  }

  exportChartSource() {
    var chartSource: any = {};
    chartSource["chartData"] = this.chartData;
    chartSource["chartInfo"] = this.chartInfo;

    return chartSource;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chartSource != undefined && this.chartSource != null) {
      this.chartData = this.chartSource.chartData;
      this.chartInfo = this.chartSource.chartInfo;
      this.initChart();
      this.renderChart();
    }
  }

  initFormElements() {
    this.canvasId = "canvas" + Math.floor(Math.random() * (new Date()).getTime());
    this.downloadButtonId = "downloadButton" + Math.floor(Math.random() * (new Date()).getTime());
    this.loaderId = "loader" + Math.floor(Math.random() * (new Date()).getTime());
    this.cdRef.detectChanges();

    var canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
    this.ctx = canvas.getContext("2d");
  }

  refreshChart() {
    this.getChartDataAndRender();
  }

  downloadChart() {
    var url_base64jp = (<any>document.getElementById(this.canvasId)).toDataURL("image/jpg");
    var downloadButton = <any>document.getElementById(this.downloadButtonId);
    downloadButton.href = url_base64jp;
    downloadButton.click();
  }

  initChartTypeDropDown() {

    this.chartTypeDropdown = [];

    for (var i = 0; i < this.chartParticulars.Types.length; i++) {
      var tempValue: {
        Description: String,
        Identifier: String,
        isActive: boolean,
        isCompatible: boolean
      } = {
        Description: this.chartParticulars.Types[i].Description,
        Identifier: this.chartParticulars.Types[i].Identifier,
        isActive: false,
        isCompatible: false
      };

      this.chartTypeDropdown.push(tempValue);
    }

  }

  updateChartTypeDropDown() {

    for (var i = 0; i < this.chartTypeDropdown.length; i++) {

      if (this.chartParticulars.Types[i].Identifier == this.chartInfo.ChartRep.ChartType) {
        this.chartTypeDropdown[i].isActive = true;
      } else {
        this.chartTypeDropdown[i].isActive = false;
      }

      if (this.chartTypeDropdown[i].isActive) {
        this.chartTypeDropdown[i].isCompatible = true;
      } else if (
        this.chartData.datasets.length > 1
        && this.chartParticulars.Types[i].MultiDatasetSupported == 1
      ) {
        this.chartTypeDropdown[i].isCompatible = true;
      } else if (
        this.chartData.datasets.length == 1
        && this.chartParticulars.Types[i].SingleDatasetSupported == 1
      ) {
        this.chartTypeDropdown[i].isCompatible = true;
      } else {
        this.chartTypeDropdown[i].isCompatible = false;
      }

    }

  }

  changeChartType(newChartType: any) {
    if (newChartType != undefined && newChartType != null) {
      this.chartInfo.ChartRep.ChartType = newChartType;
      this.setColors();
      this.renderChart();
    }
  }

  getSelectedElement() {
    var selectedElement: { datasetName: String, label: any };
    if (this.isLinkedChart()) {
      selectedElement = this.dataStack[this.dataStack.length - 1].selectedElement
    } else {
      selectedElement = null;
    }
    return selectedElement;
  }

  loadRootChart() {
    this.dataStack = this.dataStack.slice(0, 1);
    this.loadPreviousChart("");
  }

  setCurrentFilters(filters: any) {
    this.currentFilters = filters;
  }

  setValue(chartDataIn) {
    this.chartData = this.parseChartData(chartDataIn);
    this.setAddtionalInfo(chartDataIn);
    this.setColors();
    this.renderChart();
  }

  getChartDataAndRender() { //loadChart

    // var chartDataIn;
    // this.services.http.getNgGridData(this.chartInfo.ApiRepository.ApiGatewayCode, this.formCode, this.chartInfo.ApiRepository.ServiceCode, this.mapData, this.requestParams).subscribe(
    //   (cdi) => { chartDataIn = cdi },
    //   (err) => { console.error(err) },
    //   () => {
    //     this.setValue(chartDataIn);
    //   }
    // );
  }

  setAddtionalInfo(chartDataIn) {
    this.additionalInfo = chartDataIn;
    delete this.additionalInfo["datasets"];
  }

  renderChart() {
    Chart.defaults.global.legend.labels.usePointStyle = true;

    if (this.myChart != undefined) {
      this.myChart.destroy();
    }

    var opts = {};
    var plg = [];

    if (this.chartInfo.ChartRep.ChartType == "bar" ||
      this.chartInfo.ChartRep.ChartType == "line"
    ) {
      opts = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    } else if (this.chartInfo.ChartRep.ChartType == "horizontalBar") {
      opts = {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    } else {
      opts = {

        legend: {
          position: 'right',
        },
        elements: {
          center: {
            text: "2.6T",
            subtext: "Total Amount"
          },
          arc: {
            borderWidth: 0
          }
        },
        segmentShowStroke: false,
        percentageInnerCutout: 50,
      }

    }


    this.myChart = new Chart(this.ctx, {
      type: this.chartInfo.ChartRep.ChartType as any,
      data: this.chartData as any,
      options: opts,
      plugins: plg

    });

    // $('#' + this.canvasId).show();
    // $('#' + this.loaderId).hide();

    this.chartName = this.chartInfo.ChartRep.Description;
    this.myChart.update();
    this.myChart.render();

    this.updateChartTypeDropDown();

    var emitResponse = {
      availableChartTypes: this.chartTypeDropdown,
      isLinkedChart: this.isLinkedChart(),
      additionalInfo: this.additionalInfo
    }

    this.renderComplete.emit(emitResponse);
  }

  setColors() {

    var clrIdx = [];
    var maxColorsConfigured = this.chartParticulars.Colors.length;

    function getDistinctRandomInt(min, max) {
      var idx = Math.floor(Math.random() * (max - min + 1)) + min;
      if (clrIdx.indexOf(idx) != -1) {
        return getDistinctRandomInt(min, max);
      } else {
        clrIdx.push(idx);
        return idx;
      }
    }

    if (this.chartInfo.ChartRep.ChartType == "line" ||
      this.chartInfo.ChartRep.ChartType == "radar" ||
      this.chartInfo.ChartRep.ChartType == "bar" ||
      this.chartInfo.ChartRep.ChartType == "horizontalBar") {

      for (var i = 0; i < this.chartData.datasets.length; i++) {
        var datasetColor ='';
        if(clrIdx.length!=maxColorsConfigured){
          var idx = getDistinctRandomInt(0, maxColorsConfigured - 1);
          datasetColor = this.chartParticulars.Colors[idx].ColorHex;
        }else{
          datasetColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        }

        this.chartData.datasets[i].backgroundColor = datasetColor;
        this.chartData.datasets[i].borderColor = datasetColor;
      }

    } else {
      var j = 0;
      for (var i = 0; i < this.chartData.datasets.length; i++) {
        this.chartData.datasets[i].backgroundColor = [];
        this.chartData.datasets[i].borderColor = [];

        while (j < (this.chartData.datasets[0].data.length) * (i + 1)) {
          var datasetColor ='';
          if(clrIdx.length!=maxColorsConfigured){
            var idx = getDistinctRandomInt(0, this.chartParticulars.Colors.length - 1);
            datasetColor = this.chartParticulars.Colors[idx].ColorHex;
          }else{
            datasetColor = '#'+Math.floor(Math.random()*16777215).toString(16);
          }          
          this.chartData.datasets[i].backgroundColor.push(datasetColor);
          this.chartData.datasets[i].borderColor.push(datasetColor);
          j++;
        }
      }

    }

  }

  loadPreviousChart(evt: any) {
    if (this.dataStack.length != 0) {
      var stackElement = this.dataStack.pop();

      this.chartData = stackElement.chartData;
      this.chartInfo = stackElement.chartInfo;

      this.renderChart();
    }

    if (this.dataStack.length == 0) {
      this.parentFilters = {};
      // this.isDrilledDown = false;
    }

  }

  isLinkedChart(): boolean {
    if (this.dataStack.length == 0) {
      return false;
    }
    return true;
  }

  parseChartData(chartDataIn: ChartDataIn): ChartData {
    var chartData: ChartData = {
      labels: [],
      datasets: []
    };

    if (chartDataIn["datasets"] != undefined && chartDataIn.datasets.length >= 0 && chartDataIn.datasets[0].data != undefined) {
      for (var i = 0; i < chartDataIn.datasets[0].data.length; i++) {
        chartData.labels.push(chartDataIn.datasets[0].data[i].label);
      }

      for (var i = 0; i < chartDataIn.datasets.length; i++) {
        var dataset: any = {
          label: "",
          data: [],
          fill: false
        };
        dataset.label = chartDataIn.datasets[i].datasetName;
        for (var j = 0; j < chartDataIn.datasets[i].data.length; j++) {
          dataset.data.push(chartDataIn.datasets[i].data[j].value)
        }
        chartData.datasets.push(dataset);
      }
    }
    return chartData;
  }

  setContext(inputMap) {

    this.formCode = inputMap.get("formCode");
    inputMap.delete("formCode");

    let mapKeys = Array.from(inputMap.keys());
    for (var i = 0; i < mapKeys.length; i++) {
      this.mapData.set(<string>mapKeys[i], inputMap.get(mapKeys[i]));
    }

    this.getChartDataAndRender();

  }

  applyFilters(mapData) {
    this.formCode = mapData.get("formCode");
    mapData.delete("formCode");
    let filterFields: any = {};

    let mapKeys = Array.from(mapData.keys());
    for (var i = 0; i < mapKeys.length; i++) {
      filterFields[<string>mapKeys[i]] = mapData.get(mapKeys[i]);
    }

    var selectedDataset = this.getSelectedElement();
    this.setRequestParams(filterFields, selectedDataset);
    this.setCurrentFilters(filterFields);
    this.getChartDataAndRender();
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  setRequestParams(filters: any, selectedDataset: any) {

    let requestParams: any = {};

    let isParentFiltersAvailable: boolean = this.isLinkedChart() && this.parentFilters != null && this.parentFilters != undefined && this.parentFilters.length != 0;

    let isCurrentFiltersAvailable: boolean = !this.isLinkedChart() && filters != null && filters != undefined && !this.isEmpty(filters);

    if (isParentFiltersAvailable) {
      requestParams["filterOptions"] = {};

      for (let key in this.parentFilters) {
        requestParams.filterOptions[key] = this.parentFilters[key];
      }
    }

    if (isCurrentFiltersAvailable) {
      requestParams["filterOptions"] = {};

      for (let key in filters) {
        requestParams.filterOptions[key] = filters[key];
      }
    }
    if (selectedDataset != null && selectedDataset != undefined) {

      requestParams["selectedElement"] = {};

      requestParams.selectedElement["datasetName"] = selectedDataset.datasetName;
      requestParams.selectedElement["label"] = selectedDataset.label;

    }

    this.requestParams = requestParams;
  }

  // onChartClick(evt: any) {

  //   var firstPoint = this.myChart.getElementAtEvent(evt)[0];

  //   if (firstPoint != null && (this.chartInfo.ChartRep.LinkedChartCode != null && this.chartInfo.ChartRep.LinkedChartCode != undefined && this.chartInfo.ChartRep.LinkedChartCode != "")) {

  //     $('#' + this.canvasId).hide();
  //     $('#' + this.loaderId).show();

  //     var selectedElement: { datasetName: String, label: any } = { datasetName: "", label: "" };
  //     selectedElement.label = this.myChart.data.labels[firstPoint._index];
  //     selectedElement.datasetName = this.myChart.data.datasets[firstPoint._datasetIndex].label;

  //     this.dataStack.push({ chartData: this.chartData, chartInfo: this.chartInfo, selectedElement });

  //     this.parentFilters = this.currentFilters;

  //     this.getAllDataAndRenderChart(<string>this.chartInfo.ChartRep.LinkedChartCode, selectedElement);

  //     this.isDrilledDown = true;
  //   }
  // }

}