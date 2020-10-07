import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MyTrayFormModel } from './MyTrayForm.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { ButtonComponent } from '../button/button.component';
import { AmountComponent } from '../amount/amount.component';
import { FormComponent } from '../form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MyTrayGridComponent } from '../MyTrayGrid/MyTrayGrid.component';
import { Router } from "@angular/router";
import { IModalData } from '../popup-alert/popup-interface';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ChartType, ChartOptions, PluginServiceRegistrationOptions } from 'chart.js';
import * as Chart from 'chart.js';
import { ISelectedDateRange } from '../Interface/masterInterface';
import { start } from 'repl';
import { async } from 'rxjs/internal/scheduler/async';

const customCss: string = '';

@Component({
  selector: 'app-MyTrayForm',
  templateUrl: './MyTrayForm.component.html'
})
export class MyTrayFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('MT_SLIDER', { static: false }) MT_SLIDER: CheckBoxComponent;
  @ViewChild('MT_GRID', { static: false }) MT_GRID: MyTrayGridComponent;
  @ViewChild('MT_Proposal', { static: false }) MT_Proposal: ButtonComponent;
  @ViewChild('doughnutChart', { static: false }) doughnutChart: ElementRef;
  @ViewChild('chartPendingTxt', { static: false }) chartPendingTxt: ElementRef;
  @ViewChild('chartCountTxt', { static: false }) chartCountTxt: ElementRef;

  public doughnutChartContext: CanvasRenderingContext2D;
  public chartPendingContext: CanvasRenderingContext2D;
  public chartCountContext: CanvasRenderingContext2D;
  public chartPluginService: PluginServiceRegistrationOptions;

  menuList = [];
  promotionLists = [
    {
      title: "New to Bank Promotion",
      txt: `Enjoy promotional interest rates on personal loans (unsecured) from as low as 7% p.a. with
      no processing fee for new to bank customers. Offer valid till 3rd September 2020.`,
      bgColor: "#9013fe"
    },
    {
      title: "Fixed Rate Promotion",
      txt: `Enjoy stability by fixing the interest rate on housing loans for the initial 3 years of the loan
      (minimum tenure of 10 years required). Offer valid till 31st December 2020.`,
      bgColor: "#17afbd"
    },
    {
      title: "August Special",
      txt: `Enjoy a reduction of 1% p.a. on all personal loans (secured) for the month of August. Offer
      valid till 31st August 2020.`,
      bgColor: "#fd83e3"
    }
  ];

  broadcastLists = [
    {
      msg: "New changes added in our current plan(PLAN_04_456136). Kindly all your sub-products accordingly.",
      dateTime: "27 Mon, 11:00 AM"
    },
    {
      msg: "All the newly joined staff need to update their policies by the end of September.Submit the required documents to the Admin in .PDF format.",
      dateTime: "29 Wed, 03:36 PM"
    },
    {
      msg: "New offers for the month of August will be rolled out soon. Those who are intersted can contact Aishwarya or Jai. For any queries contact HR.",
      dateTime: "29 Wed, 6:05 PM"
    }
  ];

  // Doughnut
  public doughnutChartLabels: Label[] = ['Quick Data Entry', 'Detailed Data Entry', 'CPV', 'Credit Underwriting'];
  public doughnutChartData: SingleDataSet = [
    5, 10, 10, 2
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // public chartOptions: ChartOptions = {
  //   cutoutPercentage: 80,
  //   spanGaps: false,
  //   legend: {
  //     position: "bottom",
  //     labels: {
  //       fontSize: 10,
  //       usePointStyle: true
  //     }
  //   },
  //   elements: {
  //     arc: {
  //       borderWidth: 0
  //     }
  //   }
  // }

  public donutColors = [
    {
      backgroundColor: [
        '#012438',
        '#037cb1',
        '#54a8d4',
        '#560d28'
      ]
    }
  ];

  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('MT_SLIDER'),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }

  chart: any;
  chartOptions: Chart.ChartConfiguration;

  graphFilterList: any = [
    { name: 'All', isSelected: false },
    { name: '1Y', isSelected: false },
    { name: '6M', isSelected: false },
    { name: '3M', isSelected: false },
    { name: '1M', isSelected: false },
    { name: '1W', isSelected: false },
  ];

  dateFormat = 'DD-MMM-YY';

  proposalCount: number = 0;

  constructor(services: ServiceStock, private router: Router, private cdRef: ChangeDetectorRef) {
    super(services);
    this.value = new MyTrayFormModel();
    this.componentCode = 'MyTrayForm';
    this.displayBorder = false;
    // this.menuList = [{ Menu: 'MODIFICATION', MenuList: [{ id: 'Initiation', text: 'Initiate' }]}];
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.MT_SLIDER.setValue(true);
    let inputMap = new Map();
    //this.MT_SLIDER.setValue('true');
    await this.MT_GRID.gridDataLoad({
      'sliderVal': this.MT_SLIDER.getFieldValue(),
    });

    // await this.MT_GRID.gridDataLoad({
    // });
    // this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'My Tray';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    return this.additionalInfo;
  }
  getFieldValue() {
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new MyTrayFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'MyTrayForm'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'MyTrayForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('MyTrayForm_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });

    this.getFilter("1W");
    this.cdRef.detectChanges();
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new MyTrayFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async MT_SLIDER_change(event) {
    let inputMap = new Map();
    if (event) {
      await this.MT_GRID.gridDataLoad({
        'sliderVal': this.MT_SLIDER.getFieldValue()
      });
    }
  }
  fieldDependencies = {
  }
  MT_Proposal_click() {
    let inputMap = new Map();
    this.redirect();
  }
  navigateToHome() {
    this.router.navigate(['/home/LANDING']);
  }
  redirect() {
    var id = "Initiation";
    if (id && id != "") {
      this.router.navigate(['/home/' + id]);
    } else {
      this.navigateToHome();
    }
  }

  cc() {
    this.router.navigate(['/home/customization-console']);
  }

  getFilter(name: "All" | "1Y" | "6M" | "3M" | "1M" | "1W") {
    console.log(name);
    let startDate;
    const moment = require('moment');
    this.clearNonCalendarFilter();
    let selectedOption = this.graphFilterList.find(el => el.name == name);
    selectedOption.isSelected = true;

    switch (name) {
      case 'All':
        startDate = moment().subtract(1, 'year').format(this.dateFormat);
        break;

      case '1Y':
        startDate = moment().subtract(1, 'year').format(this.dateFormat);
        break;

      case '6M':
        startDate = moment().subtract(6, 'months').format(this.dateFormat);
        break;

      case '3M':
        startDate = moment().subtract(3, 'months').format(this.dateFormat);
        break;

      case '1M':
        startDate = moment().subtract(1, 'months').format(this.dateFormat);
        break;

      case '1W':
        startDate = moment().subtract(7, 'day').format(this.dateFormat);
        break;

      default:
        break;
    }

    console.warn(startDate, moment().format(this.dateFormat));
    this.getGraphData(startDate, moment().format(this.dateFormat)).then((response: any) => {
      console.log(response);
      this.plotDoughnutChart(response);
    })
  }

  //@output
  selectedDateRange(date: ISelectedDateRange) {
    this.clearNonCalendarFilter();
    console.log("DEEP | selected date range", date);

    const moment = require('moment');
    let startDate = moment(date.startDate).format(this.dateFormat);
    let endDate = moment(date.endDate).format(this.dateFormat);

    console.warn(startDate, endDate);
    this.getGraphData(startDate, endDate).then((response: any) => {
      console.log(response);
      this.plotDoughnutChart(response);
    });
  }

  clearNonCalendarFilter() {
    this.graphFilterList.forEach(element => {
      element.isSelected = false;
    });
  }

  async getGraphData(startDate, endDate) {
    //http://10.11.12.19:18180/olive/publisher/DashboardChart?fromDate=01-APR-20&toDate=06-AUG-20&userId=vishal.kardode@intellectdesign.com&processId=RLO_Process

    let data = [];
    let userId = sessionStorage.getItem('userId');
    let url = "/DashboardChart?fromDate=" + startDate + "&toDate=" + endDate + "&userId=" + userId + "&processId=RLO_Process";
    //let url="/DashboardChart?fromDate=01-APR-20&toDate=01-JUN-20&userId=vishal.kardode@intellectdesign.com&processId=RLO_Process";

    let promise = new Promise<any>((resolve, reject) => {
      this.services.http.fetchApi(url, 'GET', null, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          const res = httpResponse.body;
          if (res != null) {
            data = res;
          }
          resolve(data);
          console.log(res);
        },
        async (httpError) => {
          resolve(data);
        });
    });
    return promise;
  }

  plotDoughnutChart(response) {

   // response = [{ "FORMNAME": "DDE", "COUNT": "3" }, { "FORMNAME": "Operation", "COUNT": "5" }, { "FORMNAME": "QDE", "COUNT": "3" }, { "FORMNAME": "Reject", "COUNT": "1" }, { "FORMNAME": "Underwriter", "COUNT": "1" },{ "FORMNAME": "Underwriter", "COUNT": "1" },{ "FORMNAME": "Underwriter", "COUNT": "1" }]

    let colorListObj = [
      { stage: "QDE", color: "#002438" },
      { stage: "DDE", color: "#026297" },
      { stage: "CPV", color: "#018ac3" },
      { stage: "Underwriter", color: "#4b7d92" },
      { stage: "Operation", color: "#b2d8e7" },
      { stage: "Approve", color: "#92d050" },
      { stage: "Reject", color: "#c0504d" },
      { stage: "withdraw", color: "#7f7f7f" }
    ];

    let colorArray = [];

    console.log("DEEP | plotting", response);
    let dataList = response;

    let dataPoints = [];
    let dataLabels = [];
    let pendingProposals = 0;

    if (dataList.length) {
      dataList.forEach(element => {
        dataPoints.push(element.COUNT);
        dataLabels.push(element.FORMNAME);
        let obj = colorListObj.find(el => el.stage == element.FORMNAME);
        colorArray.push(obj.color);
        pendingProposals += Number(element.COUNT);
      });
    }
    this.proposalCount = pendingProposals;

    if (this.chart != undefined) {
      this.chart.destroy();
    }

    let dataSets = {
      labels: dataLabels,
      datasets: [
        {
          data: dataPoints,
          backgroundColor: colorArray
        }]
    };

    this.doughnutChartContext = this.doughnutChart.nativeElement;

    this.chartOptions = {
      type: 'doughnut',
      data: dataSets,
      options: {
        cutoutPercentage: 80,
        legend: {
          position: "bottom",
          labels: {
            fontSize: 10,
            usePointStyle: true
          }
          ,
          //onClick: updateCount(e, legendItem)
          onClick: ((e, legendItem) => {
            console.log(e, legendItem);
            pendingProposals = 0;
            var index = legendItem.index;
            var ci = this.chart;
            //var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

            console.log(ci.data, ci.id);

            let obj = ci.data.datasets[0]._meta[ci.id].data;

            for (let i = 0; i < obj.length; i++) {
              const element = obj[i];
              console.log(ci.data.datasets[0].data[i]);
              if (i == index) {
                element.hidden = element.hidden ? false : true;
              }

              if (!element.hidden)
                pendingProposals += Number(ci.data.datasets[0].data[i]);
            }
            this.updateCount(pendingProposals);
            ci.update();
          })
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
      // ,
      // plugins: [{
      //   beforeDraw: function (chart, options) {
      //     var width = chart.width,
      //       height = chart.height,
      //       ctx = chart.ctx,
      //       type = chart.config.type;

      //     if (type == 'doughnut') {
      //       ctx.textBaseline = "middle";
      //       var fontSize = (height / 11).toFixed(2);
      //       ctx.font = fontSize + "px sans-serif";
      //       ctx.fillText("Total Pending", 140, 73);

      //       var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2) - 10;
      //       var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) + 20;
      //       ctx.textBaseline = "middle";
      //       ctx.font = fontSize + "sans-serif";
      //       ctx.fillText(this.proposalCount, centerX, centerY);
      //       ctx.save();
      //     }
      //   }
      // }]

    }

    this.chart = new Chart(this.doughnutChartContext, this.chartOptions);

    //this.chart.chartOptions = this.chartOptions;
  }

  updateCount(count: any): any {
    console.error("DEEP | count", count);
    this.proposalCount = count;
    // console.log(e, legendItem);
    // var index = legendItem.index;
    // var ci = this.chart;
    // //var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

    // console.log(ci.data, ci);

    // let obj = ci.data.datasets[0]._meta[0].data;

    // for (let i = 0; i < obj.length; i++) {
    //   const element = obj[i];
    //   console.log(element);
    //   console.log(ci.data.datasets[0].data);
    //   if (i == index) {
    //     element.hidden = element.hidden ? false : true;
    //   }
    //   this.proposalCount = 0;

    // }

    // ci.update();
  }
}
