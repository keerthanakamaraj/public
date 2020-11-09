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
  //@ViewChild('chartPendingTxt', { static: false }) chartPendingTxt: ElementRef;
  //@ViewChild('chartCountTxt', { static: false }) chartCountTxt: ElementRef;

  public doughnutChartContext: CanvasRenderingContext2D;
  //public chartPendingContext: CanvasRenderingContext2D;
  //public chartCountContext: CanvasRenderingContext2D;
  //public chartPluginService: PluginServiceRegistrationOptions;
  
  dashboardStatusHide = false;
  menuList = [];
  promotionLists = [
    {
      title: "COVID-19 Relief Plan",
      txt: `Deferral of Mortgage Payments is now being offered to customers affected by COVID-19. In order to avail this, the customer will have to show his/her COVID-19 test to the Relationship Manager.`,
      bgColor: "#9013fe"
    },
    {
      title: "Fixed Rate Promotion",
      txt: `Enjoy stability by fixing the interest rate on mortgage loans. Offer valid till 31st December 2020.`,
      bgColor: "#17afbd"
    },
    {
      title: "Options available for Customers facing Hardship such as loss of job",
      // txt: `\n\u2022 Refinance your mortgage to pay out other debt (subject to qualification)
      // \n\u2022 Restore your original amortization (which lowers your payment amount)
      // \n\u2022 Hold a payment (during a temporary suspension of income)
      // \n\u2022 Offer you a reduced payment for a specific time
      // `,
      txt: `\n\u2022 Refinance your mortgage to pay out other debt (subject to qualification)
      \n\u2022 Restore your original amortization (which lowers your payment amount)
      \n\u2022 Hold a payment (during a temporary suspension of income)
      \n\u2022 Offer you a reduced payment for a specific time
      `,
      bgColor: "#fd83e3"
    }
  ];

  NotificationList = [
    {
      type: "New",
      msg: "Customer ID: S04312244561234 has been blacklisted. Kindly ensure all applications with this ID No.",
      dateTime: "21 Oct Wed, 10:03 AM"
    },
    {
      type: "Recent",
      msg: "From 1st Sep 2020, branch trading hours will be back to normal (9:00 - 16:00).Safety measures will be followed and respected throughout.",
      dateTime: "21 Oct Fri, 01:20 PM"
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
          },
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
    }

    this.chart = new Chart(this.doughnutChartContext, this.chartOptions);
  }

  updateCount(count: any): any {
    console.error("DEEP | count", count);
    this.proposalCount = count;
  }
}
