import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
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
import { ChartType, ChartOptions } from 'chart.js';

const customCss: string = '';

@Component({
  selector: 'app-MyTrayForm',
  templateUrl: './MyTrayForm.component.html'
})
export class MyTrayFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('MT_SLIDER', { static: false }) MT_SLIDER: CheckBoxComponent;
  @ViewChild('MT_GRID', { static: false }) MT_GRID: MyTrayGridComponent;
  @ViewChild('MT_Proposal', { static: false }) MT_Proposal: ButtonComponent;

  menuList = [];
  promotionLists = [
    {
      title: "August Special",
      txt: `Enjoy promotional interest rates on personal loans (unsecured) from as low as 7% p.a. with
      no processing fee for new to bank customers. Offer valid till 3rd September 2020.`,
      bgColor: "#9013fe"
    },
    {
      title: "Diwali Dhamaka",
      txt: `Enjoy stability by fixing the interest rate on housing loans for the initial 3 years of the loan
      (minimum tenure of 10 years required). Offer valid till 31st December 2020.`,
      bgColor: "#17afbd"
    },
    {
      title: "Mega Sale",
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

  public chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        console.log(args);
        return args.value;
      }
    },
    cutoutPercentage: 80,
    spanGaps: false,
    legend: {
      position: "bottom",
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
  }

  private donutColors = [
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
  constructor(services: ServiceStock, private router: Router) {
    super(services);
    this.value = new MyTrayFormModel();
    this.componentCode = 'MyTrayForm';
    this.displayBorder = false;
    // this.menuList = [{ Menu: 'MODIFICATION', MenuList: [{ id: 'Initiation', text: 'Initiate' }]}]
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

  underWriter() {
    let inputMap = new Map();
    inputMap.set('appId', 1675);

    this.services.dataStore.setRouteParams(this.services.routing.currModal, inputMap);
    this.router.navigate(['/home/Underwriter']);
  }

  testModal() {

    Promise.all([this.services.rloui.getAlertMessage('', 'test'), this.services.rloui.getAlertMessage('', 'OK')]).then(values => {
      console.log(values);
      let modalObj: IModalData = {
        title: "Alert",
        mainMessage: values[0],
        modalSize: "modal-width-lg",
        buttons: [],
        componentName: 'NotepadDetailsFormComponent'
      }
      this.services.rloui.confirmationModal(modalObj).then((response) => {
        console.log(response);
        if (response != null) {
          if (response.id === 1) {
            this.services.rloui.closeAllConfirmationModal();
          }
        }
      });
    });
  }
}
